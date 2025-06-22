import { Stack } from "expo-router";
import { DayProvider } from "./context/DayContext";
import "../globals.css";

export default function RootLayout() {
  return (
    <DayProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(screens)" options={{ headerShown: false }} />
        <Stack.Screen name="(profile)" options={{ headerShown: false }} />
      </Stack>
    </DayProvider>
  );
}
