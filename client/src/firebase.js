// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiNi19z8IBrBMzCblwTOGdimuKSln8G2s",
  authDomain: "e-state-egnecy.firebaseapp.com",
  projectId: "e-state-egnecy",
  storageBucket: "e-state-egnecy.firebasestorage.app",
  messagingSenderId: "645056121057",
  appId: "1:645056121057:web:89b2002e8ab663423ecfa0",
  measurementId: "G-NZE3Q93FYE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, analytics };