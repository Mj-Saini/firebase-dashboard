import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAGHYJWdBG7boXPV0Q0jxckAM1z-Ph5Bfw",
  authDomain: "stsm-ef3b9.firebaseapp.com",
  projectId: "stsm-ef3b9",
  storageBucket: "stsm-ef3b9.appspot.com",
  messagingSenderId: "306014478593",
  appId: "1:306014478593:web:4782148b7307bfb2a73b00",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
