import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import Markdown from 'react-native-markdown-display';

const GEMINI_API_KEY = Constants.expoConfig?.extra?.geminiApiKey || 'YOUR_FALLBACK_API_KEY';

const RecipeRecommenderScreen = () => {
  const [input, setInput] = useState('');
  const [recipes, setRecipes] = useState<string>(''); // Changed from array to string
  const [loading, setLoading] = useState(false);

  const fetchRecipes = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setRecipes('');

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

      const prompt = `Give me 3 healthy and tasty recipes using these ingredients: ${input}. Format as: 1. Recipe Name - Steps`;

      const body = {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      };

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

      setRecipes(text); // Just store the raw Markdown text
    } catch (error) {
      console.error('Gemini API Error:', error);
      setRecipes('😢 Something went wrong while fetching recipes.');
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🍳 Recipe Recommender</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter ingredients (e.g. tomato, cheese)"
        value={input}
        onChangeText={setInput}
      />
      <Button title={loading ? 'Cooking up...' : 'Get Recipes'} onPress={fetchRecipes} />

      {loading && <ActivityIndicator size="large" color="#f57c00" style={{ marginTop: 20 }} />}

      <ScrollView style={styles.resultBox}>
        <Markdown>{recipes}</Markdown>
      </ScrollView>
    </View>
  );
};

export default RecipeRecommenderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  resultBox: {
    marginTop: 20,
  },
});
