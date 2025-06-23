import { useEffect, useState } from "react";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { router } from "expo-router";
import { DayProvider } from "./context/DayContext";
export default function App() {
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = FIREBASE_AUTH.onAuthStateChanged((user) => {
      if (user) {
        router.replace("/(auth)/LoginScreen");
        // router.replace("/(tabs)/HomeScreen");
      } else {
        router.replace("/(auth)/LoginScreen");
      }
      setChecking(false);
    });
    return unsubscribe;
  }, []);

  if (checking) return null;

  return null;
}