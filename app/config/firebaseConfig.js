// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase config from Firebase Console
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
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
