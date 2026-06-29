import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "rifa-nh-fitness.firebaseapp.com",
  projectId: "rifa-nh-fitness",
  storageBucket: "rifa-nh-fitness.firebasestorage.app",
  messagingSenderId: "717237826062",
  appId: "1:717237826062:web:3fcb5cb76fc2c0a861425f"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);