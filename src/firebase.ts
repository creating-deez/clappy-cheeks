import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBSzfXGo_eiCs7od69uCBIfTRyHapLJQd4",
  authDomain: "clappy-cheeks.firebaseapp.com",
  projectId: "clappy-cheeks",
  storageBucket: "clappy-cheeks.appspot.com",
  messagingSenderId: "797895330343",
  appId: "1:797895330343:web:e40ff1a647b8564b015c02",
};

const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);
