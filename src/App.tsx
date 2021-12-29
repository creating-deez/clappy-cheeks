import { addDoc, collection } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "./firebase";

function App() {
  useEffect(() => {}, []);

  return <div className="bg-red-50">Hello World</div>;
}

export default App;
