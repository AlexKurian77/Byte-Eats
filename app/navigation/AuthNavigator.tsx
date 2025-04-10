// AuthNavigator.tsx or AppNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen'; // Import your Login Screen
import SignUpScreen from '../screens/SignupScreen'; // Import your SignUp Screen

const Stack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}  // This removes the header for the login screen
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: false }}  // This removes the header for the sign-up screen
      />
    </Stack.Navigator>
  );
}
