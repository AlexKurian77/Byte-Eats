// firebaseConfig.ts

// Import only what you need 🔥
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDEZlJP8WbI9WhBYgejyta5oDyDWjUu_hw",
  authDomain: "byteeats-1.firebaseapp.com",
  projectId: "byteeats-1",
  storageBucket: "byteeats-1.appspot.com",
  messagingSenderId: "673457471838",
  appId: "1:673457471838:web:04ba91052b765025084fcf",
  measurementId: "G-P03NZQ38SC",
};

// Initialize Firebase app 🏗
const app = initializeApp(firebaseConfig);

// Auth & Firestore exports 🔐📦
export const FIREBASE_AUTH = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const FIRESTORE_DB = getFirestore(app);

// That's it. No analytics here bro, we native 😤
