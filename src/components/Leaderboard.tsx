import classNames from "classnames";
import {
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";

import { db } from "../firebase";

function Tr(props: { children: React.ReactNode }) {
  return <tr className="">{props.children}</tr>;
}

function Th(props: { children: React.ReactNode }) {
  return <th className="">{props.children}</th>;
}

function Td(props: { children: React.ReactNode; bold?: boolean }) {
  const tdClass = classNames({
    "px-2": true,
    "font-bold": props.bold,
  });
  return <td className={tdClass}>{props.children}</td>;
}

const q = query(
  collection(db, "leaderboards"),
  orderBy("score", "desc"),
  limit(10)
);

interface LeaderboardEntry {
  name: string;
  score: number;
}

interface LeaderboardProps {
  nameOfClapper: string;
}
export function Leaderboard(props: LeaderboardProps) {
  const { nameOfClapper } = props;
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setEntries((prevEntries) => {
        snapshot.docChanges().forEach((change) => {
          const name = change.doc.id;
          const score = change.doc.data().score;
          if (change.type === "added") {
            console.log("added", name, score);
            prevEntries = [...prevEntries, { name, score }];
          }
          if (change.type === "modified") {
            prevEntries = prevEntries.map((entry) => {
              if (entry.name === name) {
                return {
                  name,
                  score,
                };
              }
              return entry;
            });
          }
          if (change.type === "removed") {
            prevEntries = prevEntries.filter((entry) => entry.name !== name);
          }
        });
        return prevEntries.sort((a, b) => b.score - a.score);
      });
    });
    return () => {
      unsubscribe();
    };
  }, []);

  console.log(entries);
  return (
    <div>
      <h1 className="text-xl">Leaderboard</h1>
      <div className="h-2"></div>
      <table className="">
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Score</Th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => {
            return (
              <Tr key={entry.name}>
                <Td bold={entry.name === nameOfClapper}>{entry.name}</Td>
                <Td bold={entry.name === nameOfClapper}>{entry.score}</Td>
              </Tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
