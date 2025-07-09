import {initializeApp} from "firebase/app"
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAJXi0S1Ugy9JEOh8cd9XRulL1oeY67g7Q",
  authDomain: "kanban-app-e3a2e.firebaseapp.com",
  projectId: "kanban-app-e3a2e",
  storageBucket: "kanban-app-e3a2e.firebasestorage.app",
  messagingSenderId: "214616892194",
  appId: "1:214616892194:web:23574826ce732b23717b7b",
  measurementId: "G-2GLS6J2FDE"
};
export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)