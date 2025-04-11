import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Import your screens
import HomeScreen from '../screens/HomeScreen';
import ChatbotScreen from '../screens/ChatBotScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DietPlanScreen from '../screens/PersonalizedDietPlanning';
import MacroTrackerScreen from '../screens/MacroTrackerScreen';
import RecipeRecommenderScreen from '../screens/RecipeRecommenderScreen';
import PricingScreen from '../screens/PricingScreen';
import SearchScreen from '../screens/SearchScreen';
import MealChartScreen from '../screens/MealChartScreen';
import GroceryListScreen from '../screens/GroceryListScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        switch (route.name) {
          case 'Home':
            iconName = 'home';
            break;
          case 'Diary':
            iconName = 'journal';
            break;
          case 'Chatbot':
            iconName = 'chatbubble-ellipses';
            break;
          case 'Profile':
            iconName = 'person';
            break;
          default:
            iconName = 'ellipse';
        }
        return <Ionicons name={`${iconName}-outline`} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#4caf50',
      tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.5)',
      headerShown: false,
      tabBarStyle: styles.tabBar,
      tabBarLabelStyle: styles.tabBarLabel,
      tabBarItemStyle: styles.tabBarItem,
      tabBarShowLabel: true,
    })}
  >
    <Tab.Screen 
      name="Home" 
      component={HomeScreen}
      options={{
        tabBarLabel: 'Home',
      }}
    />
    <Tab.Screen 
      name="Diary" 
      component={MacroTrackerScreen}
      options={{
        tabBarLabel: 'Diary',
      }}
    />
    <Tab.Screen 
      name="Chatbot" 
      component={ChatbotScreen}
      options={{
        tabBarLabel: 'Assistant',
      }}
    />
    <Tab.Screen 
      name="Profile" 
      component={ProfileScreen}
      options={{
        tabBarLabel: 'Profile',
      }}
    />
  </Tab.Navigator>
);

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ 
          headerShown: false,
          headerStyle: styles.header,
          headerTintColor: '#fff',
          headerTitleStyle: styles.headerTitle,
        }}
      >
        <Stack.Screen name="MainTabs" component={TabNavigator}/>
        <Stack.Screen 
          name="DietPlan" 
          component={DietPlanScreen} 
          options={{
            headerShown: true,
            title: 'Diet Plan'
          }}
        />
        <Stack.Screen 
          name="MacroTracker" 
          component={MacroTrackerScreen} 
          options={{
            headerShown: true,
            title: 'Macro Tracker'
          }}
        />
        <Stack.Screen 
          name="RecipeRecommender" 
          component={RecipeRecommenderScreen} 
          options={{
            headerShown: true,
            title: 'Recipe Recommendations'
          }}
        />
        <Stack.Screen 
          name="Pricing" 
          component={PricingScreen} 
          options={{
            headerShown: true,
            title: 'Pricing'
          }}
        />
        <Stack.Screen 
          name="Search" 
          component={SearchScreen} 
          options={{
            headerShown: true,
            title: 'Search'
          }}
        />
        <Stack.Screen 
          name="MealChart" 
          component={MealChartScreen} 
          options={{
            headerShown: true,
            title: 'Meal Chart'
          }}
        />
        <Stack.Screen 
          name="GroceryList" 
          component={GroceryListScreen} 
          options={{
            headerShown: true,
            title: 'Grocery List'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.3)',
    paddingBottom: 8,
    paddingTop: 8,
    height: 80,
    elevation: 0,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  tabBarItem: {
    padding: 4,
  },
  header: {
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.3)',
    elevation: 0,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default MainNavigator;