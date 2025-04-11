// index.tsx or App.tsx (root file)
import React from 'react';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import AuthNavigator from './navigation/AuthNavigator';
import MainNavigator from './navigation/MainNavigator';

export default function App() {
  return (
    <NavigationIndependentTree>
      <MainNavigator />
    </NavigationIndependentTree>
  );
}
