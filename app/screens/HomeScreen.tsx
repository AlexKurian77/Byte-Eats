import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
const features = [
  { title: 'Custom Diet Plan Generator', screen: 'DietPlan' },
  { title: 'Macro & Calorie Tracking', screen: 'MacroTracker' },
  { title: 'AI Recipe Recommender', screen: 'RecipeRecommender' },
  { title: 'Ingredient Pricing', screen: 'Pricing' },
  { title: 'Search Dishes', screen: 'Search' },
  { title: 'Smart Chatbot Assistant', screen: 'Chatbot' },
  { title: 'Dietary Preferences', screen: 'Preferences' },
  { title: 'Meal Chart Visualizer', screen: 'MealChart' },
  { title: 'Grocery List Generator', screen: 'GroceryList' },
  { title: 'User Profile & Goals', screen: 'Profile' },
];

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to Byte Eats! 🍽️</Text>

      <View style={styles.grid}>
        {features.map((feat, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.featureBtn}
            onPress={() => navigation.navigate(feat.screen as keyof RootStackParamList)}
          >
            <Text style={styles.btnText}>{feat.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
    justifyContent:"center",
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureBtn: {
    backgroundColor: '#4caf50',
    padding: 15,
    width: '48%',
    marginBottom: 15,
    borderRadius: 10,
    elevation: 3,
    justifyContent: "center",
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default HomeScreen;
