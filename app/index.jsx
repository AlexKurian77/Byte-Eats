// index.tsx or App.tsx (root file)
import React from 'react';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import AuthNavigator from './navigation/AuthNavigator';
import MainNavigator from './navigation/MainNavigator';
import NutritionAnalyzer from './screens/NutritionAnalyzer';

export default function App() {
  return (
    <NavigationIndependentTree>
      <AuthNavigator />
    </NavigationIndependentTree>
  );
}
