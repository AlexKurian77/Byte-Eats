import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Import your screens
import HomeScreen from '../screens/HomeScreen';
import ChatbotScreen from '../screens/ChatBotScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DietPlanScreen from '../screens/DietPlanScreen';
import MacroTrackerScreen from '../screens/MacroTrackerScreen';
import RecipeRecommenderScreen from '../screens/RecipeRecommenderScreen';
import PricingScreen from '../screens/PricingScreen';
import SearchScreen from '../screens/SearchScreen';
import PreferencesScreen from '../screens/PreferencesScreen';
import MealChartScreen from '../screens/MealChartScreen';
import GroceryListScreen from '../screens/GroceryListScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = 'ellipse';
        if (route.name === 'Home') iconName = 'home-outline';
        else if (route.name === 'Profile') iconName = 'person-outline';
        else if (route.name === 'Chatbot') iconName = 'chatbubble-ellipses-outline';

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#4caf50',
      tabBarInactiveTintColor: 'gray',
      headerShown: true,
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Chatbot" component={ChatbotScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={TabNavigator}/>
        <Stack.Screen name="DietPlan" component={DietPlanScreen} options={{headerShown : true}}/>
        <Stack.Screen name="MacroTracker" component={MacroTrackerScreen} options={{headerShown : true}}/>
        <Stack.Screen name="RecipeRecommender" component={RecipeRecommenderScreen} options={{headerShown : true}}/>
        <Stack.Screen name="Pricing" component={PricingScreen} options={{headerShown : true}}/>
        <Stack.Screen name="Search" component={SearchScreen} options={{headerShown : true}}/>
        <Stack.Screen name="Preferences" component={PreferencesScreen} options={{headerShown : true}}/>
        <Stack.Screen name="MealChart" component={MealChartScreen} options={{headerShown : true}}/>
        <Stack.Screen name="GroceryList" component={GroceryListScreen} options={{headerShown : true}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
