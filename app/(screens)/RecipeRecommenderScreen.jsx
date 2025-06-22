import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  ActivityIndicator, 
  StyleSheet,
  FlatList
} from 'react-native';
import Constants from 'expo-constants';
import Markdown from 'react-native-markdown-display';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const GEMINI_API_KEY = Constants.expoConfig?.extra?.geminiApiKey || 'YOUR_FALLBACK_API_KEY';

const suggestedIngredients = [
  'chicken, rice, vegetables',
  'salmon, quinoa, asparagus',
  'tofu, noodles, broccoli',
  'eggs, spinach, mushrooms',
  'beans, corn, tomatoes'
];

const dietaryPreferences = [
  { label: 'Vegetarian', icon: 'leaf' },
  { label: 'Vegan', icon: 'sprout' },
  { label: 'Gluten-Free', icon: 'grain' },
  { label: 'Low-Carb', icon: 'bread-slice-outline' },
  { label: 'High-Protein', icon: 'food-steak' }
];

const RecipeRecommenderScreen = () => {
  const [input, setInput] = useState('');
  const [recipes, setRecipes] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedPreferences, setSelectedPreferences] = useState([]);

  const fetchRecipes = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setRecipes('');

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

      const dietaryRestrictions = selectedPreferences.length > 0 
        ? `Make sure recipes are ${selectedPreferences.join(' and ')}.` 
        : '';

      const prompt = `Generate 3 healthy and delicious recipes using these ingredients: ${input}. 
        ${dietaryRestrictions}
        Format each recipe as follows:
        
        # Recipe Name
        ## Ingredients
        - List ingredients with quantities
        
        ## Instructions
        1. Numbered steps
        
        ## Nutrition Info
        - Calories
        - Protein
        - Carbs
        - Fat`;

      const body = {
        contents: [{ parts: [{ text: prompt }] }],
      };

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      setRecipes(text);
    } catch (error) {
      console.error('API Error:', error);
      setRecipes('😢 Failed to generate recipes. Please try again.');
    }
    setLoading(false);
  };

  const togglePreference = (preference) => {
    setSelectedPreferences(prev => 
      prev.includes(preference)
        ? prev.filter(p => p !== preference)
        : [...prev, preference]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="chef-hat" size={24} color="#4caf50" />
        <Text style={styles.heading}>Recipe Recommender</Text>
      </View>

      <View style={styles.preferencesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {dietaryPreferences.map((pref) => (
            <TouchableOpacity
              key={pref.label}
              style={[
                styles.preferenceChip,
                selectedPreferences.includes(pref.label) && styles.preferenceChipSelected
              ]}
              onPress={() => togglePreference(pref.label)}
            >
              <MaterialCommunityIcons 
                name={pref.icon} 
                size={18} 
                color={selectedPreferences.includes(pref.label) ? '#fff' : '#4caf50'} 
              />
              <Text style={[
                styles.preferenceText,
                selectedPreferences.includes(pref.label) && styles.preferenceTextSelected
              ]}>
                {pref.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter ingredients..."
          placeholderTextColor="rgba(255,255,255,0.5)"
          value={input}
          onChangeText={setInput}
          multiline
        />
        <TouchableOpacity 
          style={styles.searchButton} 
          onPress={fetchRecipes}
          disabled={loading}
        >
          <MaterialCommunityIcons 
            name="magnify" 
            size={24} 
            color="#fff" 
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.suggestedTitle}>Suggested Combinations:</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.suggestedContainer}>
        {suggestedIngredients.map((suggestion, index) => (
          <TouchableOpacity
            key={index}
            style={styles.suggestionChip}
            onPress={() => setInput(suggestion)}
          >
            <Text style={styles.suggestionText}>{suggestion}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4caf50" />
          <Text style={styles.loadingText}>Cooking up some recipes...</Text>
        </View>
      )}

      <ScrollView style={styles.resultBox}>
        <Markdown 
          style={markdownStyles}
        >
          {recipes}
        </Markdown>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,1)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginLeft: 10,
  },
  preferencesContainer: {
    marginBottom: 20,
  },
  preferenceChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(76,175,80,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(76,175,80,0.3)',
  },
  preferenceChipSelected: {
    backgroundColor: '#4caf50',
  },
  preferenceText: {
    color: '#4caf50',
    marginLeft: 6,
  },
  preferenceTextSelected: {
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    padding: 12,
    color: '#fff',
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#4caf50',
    width: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  suggestedTitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  suggestedContainer: {
    marginBottom: 20,
  },
  suggestionChip: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  suggestionText: {
    color: '#fff',
  },
  loadingContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  loadingText: {
    color: '#4caf50',
    marginTop: 10,
  },
  resultBox: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    padding: 15,
  },
});

const markdownStyles = {
  body: {
    color: '#fff',
    fontSize: 16,
  },
  heading1: {
    color: '#4caf50',
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  heading2: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  bullet_list: {
    color: '#fff',
  },
  ordered_list: {
    color: '#fff',
  },
  list_item: {
    marginVertical: 5,
  },
  hr: {
    backgroundColor: 'rgba(76,175,80,0.3)',
    marginVertical: 10,
  },
};

export default RecipeRecommenderScreen;