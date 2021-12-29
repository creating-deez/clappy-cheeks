import React, { useCallback, useEffect, useMemo, useState } from "react";
import throttle from "lodash/throttle";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const song = require("../assets/music.mp3");
var audio = new Audio(song);

const IMAGES = [
  require("../assets/santa-1.png"),
  require("../assets/santa-2.png"),
];
interface ClappyCheeksProps {
  nameOfClapper: string;
}

let isSpaceDown = false;

export function ClappyCheeks(props: ClappyCheeksProps) {
  const { nameOfClapper } = props;

  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const initCounter = async () => {
      const docRef = doc(db, "leaderboards", nameOfClapper);
      const nameDoc = await getDoc(docRef);
      const data = nameDoc?.data();

      if (data) {
        setCounter(data.score);
      } else {
        setCounter(0);
      }
      setLoading(false);
    };
    initCounter();
  }, [nameOfClapper]);

  const updateScore = useCallback(
    (score) => {
      console.log("updating score..");
      setDoc(doc(db, "leaderboards", nameOfClapper), {
        score,
      });
    },
    [nameOfClapper]
  );

  const updateScoreDebounced = useMemo(
    () => throttle(updateScore, 300),
    [updateScore]
  );

  useEffect(() => {
    audio.play();
  }, []);

  useEffect(() => {
    if (loading) return;
    updateScoreDebounced(counter);
  }, [counter, updateScoreDebounced, loading]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === "Space") {
        if (loading || isSpaceDown) return;
        isSpaceDown = true;
        setCounter((prev) => prev + 1);
      }
    },
    [loading]
  );

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    if (e.code === "Space") {
      isSpaceDown = false;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keypress", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keypress", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col items-center">
      <div className="text-3xl">{counter}</div>
      
      <img
        onClick={() => {
          setCounter((prev) => prev + 1);
        }}
        src={IMAGES[counter % IMAGES.length]}
        alt="Clappy Cheeks"
        className="cursor-pointer"
        style={{ maxHeight: "70vh", width: "100%" }}
      />
      <div>Press space or some shit</div>
    </div>
  );
}
