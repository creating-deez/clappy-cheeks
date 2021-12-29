import React, { useCallback, useEffect, useMemo, useState } from "react";
import throttle from "lodash/throttle";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
const IMAGES = [
  require('../assets/santa-1.png'),
  require('../assets/santa-2.png'),
 ];
interface ClappyCheeksProps {
  nameOfClapper: string;
}

export function ClappyCheeks(props: ClappyCheeksProps) {
  const { nameOfClapper } = props;

  const [counter, setCounter] = useState(0);

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
    updateScoreDebounced(counter);
  }, [counter, updateScoreDebounced]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.code === "Space") {
      setCounter((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

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
        style={{ height: '80vh', width: '100%'}}
      />
      <div>Press space or some shit</div>
    </div>
  );
}
