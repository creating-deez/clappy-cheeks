import React, { useCallback, useEffect, useState } from "react";
const IMAGES = [
  "https://cdn.pixabay.com/photo/2019/12/05/19/28/clip-art-4675943_960_720.png",
  "https://png.pngtree.com/png-vector/20190927/ourmid/pngtree-lovely-bat-clipart-vector-png-element-png-image_1749074.jpg",
];
interface ClappyCheeksProps {
  nameOfClapper: string;
}

export function ClappyCheeks(props: ClappyCheeksProps) {
  const [counter, setCounter] = useState(0);

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
        className="h-32 w-32 cursor-pointer"
      />
      <div>Press space or some shit</div>
    </div>
  );
}
