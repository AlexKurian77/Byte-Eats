import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types';

// 👇 import all your screens here
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import DietPlan from '../screens/DietPlanScreen';
// import MacroTracker from '../screens/MacroTracker';
// import RecipeRecommender from '../screens/RecipeRecommender';
// import Pricing from '../screens/Pricing';
// import Search from '../screens/Search';
import Chatbot from '../screens/ChatBotScreen';
// import Preferences from '../screens/Preferences';
// import MealChart from '../screens/MealChart';
// import GroceryList from '../screens/GroceryList';
import Profile from '../screens/ProfileScreen';
import MainNavigator from './MainNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignupScreen} />
      <Stack.Screen name="Home" component={HomeScreen}/>
      <Stack.Screen name="DietPlan" component={DietPlan} options={{headerShown : true}}/>
      {/* <Stack.Screen name="MacroTracker" component={MacroTracker} />
      <Stack.Screen name="RecipeRecommender" component={RecipeRecommender} />
      <Stack.Screen name="Pricing" component={Pricing} />
      <Stack.Screen name="Search" component={Search} /> */}
      <Stack.Screen name="Chatbot" component={Chatbot} />
      {/* <Stack.Screen name="Preferences" component={Preferences} />
      <Stack.Screen name="MealChart" component={MealChart} />
      <Stack.Screen name="GroceryList" component={GroceryList} /> */}
      <Stack.Screen name="Profile" component={Profile}/>
      <Stack.Screen name="Main" component={MainNavigator} options={{headerShown : false}}/>

    </Stack.Navigator>
  );
};

export default AuthNavigator;
