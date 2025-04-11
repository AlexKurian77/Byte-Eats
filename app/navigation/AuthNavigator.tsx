import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types';

// import all your screens here
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import DietPlan from '../screens/DietPlanScreen';
import MacroTrackerScreen from '../screens/MacroTrackerScreen';
import MainNavigator from './MainNavigator';
import RecipeRecommenderScreen from '../screens/RecipeRecommenderScreen';
import PricingScreen from '../screens/PricingScreen';
import SearchScreen from '../screens/SearchScreen';
import ChatbotScreen from '../screens/ChatBotScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PreferencesScreen from '../screens/PreferencesScreen';
import MealChartScreen from '../screens/MealChartScreen';
import GroceryListScreen from '../screens/GroceryListScreen';
import PreferenceSlideshow from '../screens/PreferencesSlideshow';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignupScreen} />
      <Stack.Screen name="Home" component={HomeScreen}/>
      <Stack.Screen name="DietPlan" component={DietPlan} options={{headerShown : true}}/>
      <Stack.Screen name="MacroTracker" component={MacroTrackerScreen} />
      <Stack.Screen name="RecipeRecommender" component={RecipeRecommenderScreen} />
      <Stack.Screen name="Pricing" component={PricingScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Chatbot" component={ChatbotScreen} />
      <Stack.Screen name="Preferences" component={PreferencesScreen} />
      <Stack.Screen name="MealChart" component={MealChartScreen} />
      <Stack.Screen name="GroceryList" component={GroceryListScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen}/>
      <Stack.Screen name="PreferenceSlidehow" component={PreferenceSlideshow}/>
      <Stack.Screen name="Main" component={MainNavigator} options={{headerShown : false}}/>

    </Stack.Navigator>
  );
};

export default AuthNavigator;
