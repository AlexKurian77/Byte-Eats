import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const features = [
  { 
    title: 'Personalized Diet Planning', 
    screen: 'DietPlan',
    icon: 'notebook-outline',
    description: 'Custom meal plans based on your preferences'
  },
  { 
    title: 'Smart Recipe Search', 
    screen: 'RecipeRecommender',
    icon: 'robot-outline',
    description: 'AI-powered recipe recommendations'
  },
  { 
    title: 'Smart Grocery Planner', 
    screen: 'Pricing',
    icon: 'cart-outline',
    description: 'Generate lists with price comparisons'
  },
  { 
    title: 'Smart Chatbot Assistant', 
    screen: 'Chatbot',
    icon: 'message-text-outline',
    description: 'Get instant help with your diet'
  },
  { 
    title: 'User Profile & Goals', 
    screen: 'Profile',
    icon: 'account-outline',
    description: 'Manage your progress'
  },
];

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.profileIcon}>
            <MaterialCommunityIcons name="account" size={24} color="#4caf50" />
          </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={styles.heading}>ByteEats</Text>
            </View>
          <TouchableOpacity style={styles.notificationIcon}>
            <MaterialCommunityIcons name="bell-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Meal & Nutrition Tracking Card */}
        <TouchableOpacity 
          style={styles.caloriesCard}
          onPress={() => navigation.navigate('MacroTracker')}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.caloriesTitle}>Meal & Nutrition Tracking</Text>
            <MaterialCommunityIcons name="chart-line" size={24} color="#4caf50" />
          </View>
          <Text style={styles.caloriesSubtitle}>Remaining = Goal - Food + Exercise</Text>
          
          <View style={styles.caloriesCircle}>
            <Text style={styles.caloriesNumber}>2,220</Text>
            <Text style={styles.remainingText}>Remaining</Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Feather name="flag" size={20} color="#4caf50" />
              <Text style={styles.statValue}>2,220</Text>
              <Text style={styles.statLabel}>Goal</Text>
            </View>
            <View style={styles.statItem}>
              <MaterialCommunityIcons name="food-apple" size={20} color="#4caf50" />
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Food</Text>
            </View>
            <View style={styles.statItem}>
              <MaterialCommunityIcons name="fire" size={20} color="#4caf50" />
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Exercise</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Features */}
        <View style={styles.featuresContainer}>
          {features.map((feat, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.featureCard}
              onPress={() => navigation.navigate(feat.screen as keyof RootStackParamList)}
            >
              <MaterialCommunityIcons 
                name={feat.icon as any} 
                size={24} 
                color="#4caf50" 
              />
              <Text style={styles.featureTitle}>{feat.title}</Text>
              <Text style={styles.featureDescription}>{feat.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,1)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(76,175,80,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationIcon: {
    marginLeft: 'auto',
  },
  heading: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 15,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  caloriesCard: {
    backgroundColor: 'rgba(76,175,80,0.1)',
    margin: 20,
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(76,175,80,0.3)',
  },
  caloriesTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  caloriesSubtitle: {
    color: '#888',
    fontSize: 14,
  },
  caloriesCircle: {
    alignItems: 'center',
    marginVertical: 20,
  },
  caloriesNumber: {
    color: '#4caf50',
    fontSize: 42,
    fontWeight: 'bold',
  },
  remainingText: {
    color: '#888',
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    color: '#888',
    fontSize: 14,
    marginTop: 4,
  },
  statValue: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
  featuresContainer: {
    padding: 20,
  },
  featureCard: {
    backgroundColor: 'rgba(76,175,80,0.1)',
    padding: 20,
    marginBottom: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(76,175,80,0.3)',
  },
  featureTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
    marginBottom: 5,
  },
  featureDescription: {
    color: '#888',
    fontSize: 14,
  },
});

export default HomeScreen;