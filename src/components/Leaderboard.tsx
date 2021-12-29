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

const q = query(
  collection(db, "leaderboards"),
  orderBy("score", "desc"),
  limit(10)
);

interface LeaderboardEntry {
  name: string;
  score: number;
}
export function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setEntries((prevEntries) => {
        snapshot.docChanges().forEach((change) => {
          const name = change.doc.id;
          const score = change.doc.data().score;
          console.log(name, score);
          if (change.type === "added") {
            prevEntries.push({
              name,
              score,
            });
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
        console.log(prevEntries);
        return prevEntries;
      });
    });
    return () => {
      unsubscribe();
    };
  }, [q]);
  return (
    <div>
      <h1>Leaderboard</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => {
            return (
              <tr>
                <td>{entry.name}</td>
                <td>{entry.score}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
