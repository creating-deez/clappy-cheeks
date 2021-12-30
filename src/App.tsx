import { useEffect, useState } from "react";
import { ArrowSmRightIcon } from "@heroicons/react/solid";
import { ClappyCheeks } from "./components/ClappyCheeks";
import { Leaderboard } from "./components/Leaderboard";
function isEmpty(text: string) {
  return text.trim().length === 0;
}
function App() {
  useEffect(() => { }, []);

  const [name, setName] = useState<string | null>(null);
  const [nameInput, setNameInput] = useState("");

  const registerName = () => {
    if (!isEmpty(nameInput)) {
      setName(nameInput);
      setNameInput("");
    }
  };

  return (
    <div className="h-screen">
      {name ? (
        <div className="h-full w-full flex justify-center items-center">
          <Leaderboard nameOfClapper={name} />
          <div className="w-10"></div>
          <ClappyCheeks nameOfClapper={name} />
        </div>
      ) : (
        <div className="h-full w-full flex flex-col justify-center items-center">
          <div className="flex gap-2">
            <input
              placeholder="Plz enter ur name"
              className="px-2 py-1 border border-black"
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  registerName();
                }
              }}
            />
            <button
              className="bg-black text-white px-2 hover:bg-gray-800"
              onClick={registerName}
            >
              <ArrowSmRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>

  );
}

export default App;
