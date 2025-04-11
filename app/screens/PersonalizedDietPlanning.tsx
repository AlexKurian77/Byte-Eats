import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Button } from 'react-native';
import axios from 'axios';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import Constants from 'expo-constants';
import Markdown from 'react-native-markdown-display';

const DietPlanScreen = () => {
  const [profile, setProfile] = useState(null);
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  const GEMINI_API_KEY = Constants.expoConfig?.extra?.geminiApiKey;
  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

  const db = getFirestore();
  const user = getAuth().currentUser;

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        } else {
          console.log('No profile found for this legend 😩');
        }
      } catch (err) {
        console.error('Firebase be trippin:', err);
      }
    };

    fetchProfile();
  }, []);

  const handleGenerate = async () => {
    if (!profile || !profile.goal || !profile.activityLevel) {
      alert("Bruh we need your profile complete first.");
      return;
    }

    setGenerating(true);
    const prompt = `
      You are a professional dietician. Generate a detailed 7-day diet plan for a person with the following info:
      Goal: ${profile.goal}
      Activity Level: ${profile.activityLevel}
      Current Weight: ${profile.weight || '--'}kg
      Target Weight: ${profile.targetweight || '--'}kg
      Height: ${profile.height || '--'}cm
      
      Include breakfast, lunch, dinner, and snacks for each day.
      Meals should be varied and include protein, carbs, and healthy fats.
      Make it tasty but balanced and include portion sizes if possible.
    `;

    try {
      const response = await axios.post(GEMINI_API_URL, {
        contents: [{ parts: [{ text: prompt }] }],
      });

      const result = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!result) throw new Error("Gemini didn't cook today 🧑‍🍳😔");
      setOutput(result);
    } catch (err) {
      console.error('Gemini API exploded:', err);
      setOutput('Something went wrong while generating the plan.');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Personalized Diet Plan</Text>

      {!profile ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <>
          <Text style={styles.label}>Goal: {profile.goal}</Text>
          <Text style={styles.label}>Activity Level: {profile.activityLevel}</Text>

          <Button title={generating ? "Whipping up magic..." : "Generate Diet Plan"} onPress={handleGenerate} disabled={generating} />
        </>
      )}

      {output && (
        <ScrollView style={styles.outputContainer}>
          <Markdown style={styles.outputText}>{output}</Markdown>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
    paddingTop: 60,
    justifyContent: 'flex-start',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    color: '#fff',
    marginBottom: 10,
    fontSize: 16,
  },
  outputContainer: {
    marginTop: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 15,
    borderRadius: 10,
  },
  outputText: {
    fontSize: 16,
    lineHeight: 22,
    color: '#fff',
  },
});

export default DietPlanScreen;
