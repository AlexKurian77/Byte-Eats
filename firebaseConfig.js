// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEZlJP8WbI9WhBYgejyta5oDyDWjUu_hw",
  authDomain: "byteeats-1.firebaseapp.com",
  projectId: "byteeats-1",
  storageBucket: "byteeats-1.firebasestorage.app",
  messagingSenderId: "673457471838",
  appId: "1:673457471838:web:04ba91052b765025084fcf",
  measurementId: "G-P03NZQ38SC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const FIREBASE_AUTH = getAuth(app);