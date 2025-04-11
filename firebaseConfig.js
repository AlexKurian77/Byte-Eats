// firebaseConfig.ts

// Import only what you need 🔥
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase config (looks good, don’t touch unless you regen the keys 🛑)
const firebaseConfig = {
  apiKey: 'AIzaSyDEZlJP8WbI9WhBYgejyta5oDyDWjUu_hw',
  authDomain: 'byteeats-1.firebaseapp.com',
  projectId: 'byteeats-1',
  storageBucket: 'byteeats-1.appspot.com', // fixed typo here 😏
  messagingSenderId: '673457471838',
  appId: '1:673457471838:web:04ba91052b765025084fcf',
  measurementId: 'G-P03NZQ38SC', // fine to leave here, not used in RN
};

// Initialize Firebase app 🏗
const app = initializeApp(firebaseConfig);

// Auth & Firestore exports 🔐📦
export const FIREBASE_AUTH = getAuth(app);
export const FIRESTORE_DB = getFirestore(app);

// That's it. No analytics here bro, we native 😤
