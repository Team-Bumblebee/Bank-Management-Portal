import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBjXHMZxUoYX9mcwu9t0ZVfN5lA6Tf9_mA",
  authDomain: "bank-management-portal.firebaseapp.com",
  projectId: "bank-management-portal",
  storageBucket: "bank-management-portal.appspot.com",
  messagingSenderId: "262528981233",
  appId: "1:262528981233:web:cffa18c51c5f578153f150",
};

initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
