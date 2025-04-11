import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';

const GEMINI_API_KEY = Constants.expoConfig?.extra?.geminiApiKey || 'YOUR_API_KEY';

const MealChartScreen = () => {
  const [goal, setGoal] = useState('');
  const [mealPlan, setMealPlan] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMealPlan = async () => {
    if (!goal.trim()) return;

    setLoading(true);
    setMealPlan([]);

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

      const prompt = `Generate a one-day meal chart for someone whose goal is: ${goal}. 
      Include: 
      1. Breakfast 
      2. Lunch 
      3. Snack 
      4. Dinner 
      Format like:
      Breakfast - Oatmeal with banana and almonds`;

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

      const parsed = text
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);

      setMealPlan(parsed);
    } catch (err) {
      console.error('Gemini API Error BKL:', err);
      setMealPlan(['😢 Could not load your meal plan. Try again!']);
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🍽️ Daily Meal Chart</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter goal (e.g. weight loss)"
        value={goal}
        onChangeText={setGoal}
      />
      <Button title={loading ? 'Planning meals...' : 'Generate Meal Plan'} onPress={fetchMealPlan} />

      {loading && <ActivityIndicator size="large" color="#f57c00" style={{ marginTop: 20 }} />}

      <ScrollView style={styles.scroll}>
        {mealPlan.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.text}>{item}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default MealChartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  scroll: {
    marginTop: 20,
  },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
  },
});
