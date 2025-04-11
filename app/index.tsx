// index.tsx or App.tsx (root file)
import React from 'react';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import AuthNavigator from './navigation/AuthNavigator';

export default function App() {
  return (
    <NavigationIndependentTree>
      <AuthNavigator />
    </NavigationIndependentTree>
  );
}
