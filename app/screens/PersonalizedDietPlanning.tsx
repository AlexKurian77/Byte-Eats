import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Button, Image, Linking } from 'react-native';
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
  const [mealRecipes, setMealRecipes] = useState([]);

  const GEMINI_API_KEY = Constants.expoConfig?.extra?.geminiApiKey;
  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
  const EDAMAM_APP_ID = Constants.expoConfig?.extra?.edamamappid;
  const EDAMAM_APP_KEY = Constants.expoConfig?.extra?.edamamappkey;

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

  const getRecipeFromEdamam = async (mealName) => {
    const url = `https://api.edamam.com/search?q=${mealName}&app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}&to=1`;

    try {
      const response = await axios.get(url);
      const firstHit = response.data.hits?.[0]?.recipe;
      if (!firstHit) return null;

      return {
        title: firstHit.label,
        image: firstHit.image,
        calories: Math.round(firstHit.calories),
        ingredients: firstHit.ingredientLines,
        url: firstHit.url,
      };
    } catch (err) {
      console.error(`Couldn't fetch Edamam recipe for ${mealName}`, err);
      return null;
    }
  };

  const extractMealNames = (text) => {
    const regex = /\*\*(.*?)\*\*/g;
    const meals = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      meals.push(match[1]);
    }
    return meals;
  };

  const handleGenerate = async () => {
    if (!profile || !profile.goal || !profile.activityLevel) {
      alert("Bruh we need your profile complete first.");
      return;
    }

    setGenerating(true);
    setMealRecipes([]);
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
      Use **Meal Name** format for each meal.
    `;

    try {
      const response = await axios.post(GEMINI_API_URL, {
        contents: [{ parts: [{ text: prompt }] }],
      });

      const result = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!result) throw new Error("Gemini didn't cook today 🧑‍🍳😔");
      setOutput(result);

      const meals = extractMealNames(result);
      const enrichedMeals = await Promise.all(meals.map(getRecipeFromEdamam));
      setMealRecipes(enrichedMeals.filter(Boolean));
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
          <Text style={styles.label}>Weight: {profile.weight || '--'} kg</Text>
          <Text style={styles.label}>Target Weight: {profile.targetweight || '--'} kg</Text>
          <Text style={styles.label}>Height: {profile.height || '--'} cm</Text>

          <Button
            title={generating ? "Whipping up magic..." : "Generate Diet Plan"}
            onPress={handleGenerate}
            disabled={generating}
          />
        </>
      )}

      {output && (
        <ScrollView style={styles.outputContainer}>
          <Markdown style={styles.outputText}>{output}</Markdown>
        </ScrollView>
      )}

      {mealRecipes.length > 0 && (
        <ScrollView style={styles.recipeContainer}>
          <Text style={styles.heading}>Meal Details 🍲</Text>
          {mealRecipes.map((meal, idx) => (
            <View key={idx} style={styles.recipeCard}>
              <Text style={styles.recipeTitle}>{meal.title}</Text>
              <Image source={{ uri: meal.image }} style={styles.recipeImage} />
              <Text style={styles.recipeCalories}>Calories: {meal.calories}</Text>
              <Text style={styles.recipeLabel}>Ingredients:</Text>
              {meal.ingredients.map((ingredient, i) => (
                <Text key={i} style={styles.ingredientItem}>• {ingredient}</Text>
              ))}
              <Text style={styles.recipeLink}>
                Recipe: <Text style={{ color: 'blue' }} onPress={() => Linking.openURL(meal.url)}>{meal.url}</Text>
              </Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 5,
  },
  outputContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    maxHeight: 300,
  },
  outputText: {
    body: {
      color: '#fff',
      fontSize: 16,
      lineHeight: 22,
    },
  },
  recipeContainer: {
    marginTop: 20,
  },
  recipeCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  recipeImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  recipeCalories: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 5,
  },
  recipeLink: {
    fontSize: 14,
    color: '#1e90ff',
    textDecorationLine: 'underline',
  },
});

export default DietPlanScreen;
