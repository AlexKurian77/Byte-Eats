import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const DietPlanScreen = () => {
  const [goal, setGoal] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const GEMINI_API_KEY = 'AIzaSyCxSLBu31WGMVcpgw-KUHpVUOd1dQhdF_g';
  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

  const handleGenerate = async () => {
    if (!goal || !activityLevel) {
      alert("Fill in both fields");
      return;
    }

    setLoading(true);
    try {
      const prompt = `
        You are a professional dietician. Generate a detailed 7-day diet plan for a person who wants to "${goal}" and has an activity level of "${activityLevel}".
        Include breakfast, lunch, dinner, and snacks for each day.
        Make sure meals are varied and include protein, carbs, and fats in good balance.
        Make it tasty but healthy. Also mention portion sizes if possible.
      `;

      const response = await axios.post(
        GEMINI_API_URL,
        {
          contents: [{ parts: [{ text: prompt }] }]
        }
      );

      const result = response.data.candidates[0].content.parts[0].text;
      setOutput(result);
    } catch (err) {
      console.error('Something went wrong', err);
      setOutput('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Diet Plan Generator</Text>

      <TextInput
        style={styles.input}
        placeholder="Your goal (e.g. bulk, cut)"
        value={goal}
        onChangeText={setGoal}
      />
      <TextInput
        style={styles.input}
        placeholder="Activity level (e.g. active, sedentary)"
        value={activityLevel}
        onChangeText={setActivityLevel}
      />

      <Button title={loading ? "Cooking up..." : "Get My Diet Plan"} onPress={handleGenerate} disabled={loading} />

      {output && (
        <ScrollView style={styles.outputContainer}>
          <Text style={styles.outputText}>{output}</Text>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    flex: 1,
    justifyContent:"center"
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign:"center",
  },
  input: {
    borderColor: '#aaa',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
  outputContainer: {
    marginTop: 20,
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
  },
  outputText: {
    fontSize: 16,
    lineHeight: 22,
  },
});

export default DietPlanScreen;
