import React, { useEffect, useState, useCallback } from 'react';
import {
    View, Text, StyleSheet, ScrollView, ActivityIndicator,
    TouchableOpacity, Image, Linking, Alert
} from 'react-native';
import axios from 'axios';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import Constants from 'expo-constants';
import Markdown from 'react-native-markdown-display';
import { Ionicons } from '@expo/vector-icons';

// --- Configuration ---
const GEMINI_API_KEY = Constants.expoConfig?.extra?.geminiApiKey;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

// Nutritionix API Configuration
const NUTRITIONIX_APP_ID = 'a1fe1cbf';
const NUTRITIONIX_API_KEY = '5c8bc56ba765a6991bdfde11b6168e5e';
const NUTRITIONIX_SEARCH_URL = 'https://trackapi.nutritionix.com/v2/search/instant';
const NUTRITIONIX_NUTRIENTS_URL = 'https://trackapi.nutritionix.com/v2/natural/nutrients';

const getSafeProfileValue = (value, defaultValue) =>
    value?.toString() || defaultValue;

const DietPlanScreen = () => {
    const [profile, setProfile] = useState(null);
    const [output, setOutput] = useState('');
    const [isFetchingProfile, setIsFetchingProfile] = useState(true);
    const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
    const [mealRecipes, setMealRecipes] = useState([]);
    const [error, setError] = useState(null);

    const db = getFirestore();
    const auth = getAuth();

    // --- Fetch User Profile ---
    useEffect(() => {
        const fetchProfile = async () => {
            setIsFetchingProfile(true);
            setError(null);
            const user = auth.currentUser;
            if (!user) {
                console.warn('No user logged in.');
                setError('You need to be logged in to view your profile');
                setIsFetchingProfile(false);
                return;
            }

            try {
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    if (data) {
                        setProfile(data);
                    } else {
                        setError('Profile data is incomplete');
                    }
                } else {
                    console.log('No profile data found in Firestore.');
                    setError('Complete your profile to generate a diet plan.');
                }
            } catch (err) {
                console.error('Error fetching profile from Firestore:', err);
                setError('Could not load your profile. Please try again later.');
            } finally {
                setIsFetchingProfile(false);
            }
        };

        fetchProfile();
    }, [auth, db]);

    // --- Fetch Recipe from Nutritionix ---
    const getRecipeFromNutritionix = useCallback(async (mealName) => {
        try {
            const searchResponse = await axios.get(NUTRITIONIX_SEARCH_URL, {
                params: {
                    query: mealName,
                    detailed: true,
                },
                headers: {
                    'x-app-id': NUTRITIONIX_APP_ID,
                    'x-app-key': NUTRITIONIX_API_KEY,
                }
            });

            if (!searchResponse.data.common?.[0]) {
                console.warn(`No Nutritionix results found for: ${mealName}`);
                return null;
            }

            const nutrientsResponse = await axios.post(
                NUTRITIONIX_NUTRIENTS_URL,
                {
                    query: mealName,
                },
                {
                    headers: {
                        'x-app-id': NUTRITIONIX_APP_ID,
                        'x-app-key': NUTRITIONIX_API_KEY,
                        'Content-Type': 'application/json',
                    }
                }
            );

            const foodData = nutrientsResponse.data.foods[0];

            const recipe = {
                id: `${foodData.food_name}-${Date.now()}`,
                title: foodData.food_name,
                image: foodData.photo.highres || foodData.photo.thumb,
                calories: Math.round(foodData.nf_calories),
                ingredients: [
                    `Serving Size: ${foodData.serving_qty} ${foodData.serving_unit}`,
                    `Protein: ${Math.round(foodData.nf_protein)}g`,
                    `Carbs: ${Math.round(foodData.nf_total_carbohydrate)}g`,
                    `Fat: ${Math.round(foodData.nf_total_fat)}g`
                ],
                url: `https://www.nutritionix.com/food/${foodData.food_name}`,
                nutrients: {
                    protein: foodData.nf_protein,
                    carbs: foodData.nf_total_carbohydrate,
                    fat: foodData.nf_total_fat
                }
            };

            return recipe;
        } catch (err) {
            console.error(`Nutritionix API error for "${mealName}":`, err.response?.data || err.message);
            return null;
        }
    }, []);

    // --- Extract Meal Names ---
    const extractMealNames = (text) => {
        const regex = /\*\*(.*?)\*\*/g;
        const meals = new Set();
        let match;
        while ((match = regex.exec(text)) !== null) {
            const cleanedName = match[1].trim();
            if (cleanedName) {
                meals.add(cleanedName);
            }
        }
        return Array.from(meals);
    };

    // --- Generate Diet Plan ---
    const handleGenerate = async () => {
        if (!profile || !profile.goal || !profile.activityLevel) {
            Alert.alert("Profile Incomplete", "Please complete your profile (Goal, Activity Level) before generating a plan.");
            return;
        }
        if (!GEMINI_API_KEY) {
            Alert.alert("Configuration Error", "Unable to generate plan. API key is missing.");
            return;
        }

        setIsGeneratingPlan(true);
        setMealRecipes([]);
        setOutput('');
        setError(null);

        const prompt = `
          You are a professional dietician designing personalized meal plans.
          Generate a detailed 7-day diet plan for a person with the following details:
          - Goal: ${profile.goal}
          - Activity Level: ${profile.activityLevel}
          - Current Weight: ${getSafeProfileValue(profile.weight)} kg
          - Target Weight: ${getSafeProfileValue(profile.targetweight)} kg
          - Height: ${getSafeProfileValue(profile.height)} cm
          - Budget Preference: ${getSafeProfileValue(profile.budget, 'moderate')}
          - Likes: ${getSafeProfileValue(profile.likes,'not specified')}
          - Dislikes: ${getSafeProfileValue(profile.banned?.join(","), 'none')}

          Instructions:
          1. Create a plan covering 1 day
          2. For each day, include meals for Breakfast, Lunch, Dinner, and at least one Snack.
          3. Ensure meals are varied, balanced (protein, carbs, healthy fats), and align with the user's goal and budget.
          4. Be specific with meal names and provide estimated portion sizes where possible (e.g., "1 cup", "100g").
          5. Format each meal name clearly using Markdown bold: **Meal Name**. Example: **Grilled Chicken Salad**.
          6. Don't give any explanation paragraphs just information 
          7. Keep the response very short and concise
          8. Keep it Indian
        `;

        try {
            console.log("Sending prompt to Gemini:", prompt);
            const response = await axios.post(GEMINI_API_URL, {
                contents: [{ parts: [{ text: prompt }] }],
            }, { timeout: 60000 });

            const result = response.data.candidates?.[0]?.content?.parts?.[0]?.text;

            if (!result) {
                console.error("Gemini response missing text:", response.data);
                throw new Error("The AI couldn't generate a plan this time. Please try again.");
            }
            setOutput(result);

            const mealNames = extractMealNames(result);
            if (mealNames.length > 0) {
                console.log(`Fetching ${mealNames.length} recipes from Nutritionix...`);
                const recipePromises = mealNames.map(name => getRecipeFromNutritionix(name));
                const fetchedRecipes = await Promise.all(recipePromises);
                const validRecipes = fetchedRecipes.filter(recipe => recipe !== null);
                console.log(`Successfully fetched ${validRecipes.length} recipes.`);
                setMealRecipes(validRecipes);
            }

        } catch (err) {
            console.error('Error generating diet plan or fetching recipes:', err);
            const errorMessage = err.response?.data?.error?.message ||
                err.message ||
                'Something went wrong. Please try again.';
            setOutput('');
            setError(errorMessage);
            Alert.alert("Generation Failed", errorMessage);
        } finally {
            setIsGeneratingPlan(false);
        }
    };

    // --- Render UI ---
    const renderProfileInfo = () => (
        <View style={styles.profileInfoContainer}>
            <Text style={styles.infoText}>Goal: <Text style={styles.infoValue}>{getSafeProfileValue(profile?.goal)}</Text></Text>
            <Text style={styles.infoText}>Activity: <Text style={styles.infoValue}>{getSafeProfileValue(profile?.activityLevel)}</Text></Text>
            <Text style={styles.infoText}>Budget: <Text style={styles.infoValue}>{getSafeProfileValue(profile?.budget, 'Moderate')}</Text></Text>
        </View>
    );

    const renderRecipeCard = (meal, index) => (
        <View key={meal.id || index} style={styles.recipeCard}>
            <Text style={styles.recipeTitle}>{meal.title}</Text>
            {meal.image && <Image source={{ uri: meal.image }} style={styles.recipeImage} resizeMode="cover" />}
            <Text style={styles.recipeDetail}>Calories: {meal.calories} kcal</Text>
            <Text style={styles.recipeLabel}>Nutrition Facts:</Text>
            {meal.ingredients.map((ingredient, i) => (
                <Text key={i} style={styles.ingredientItem}>• {ingredient}</Text>
            ))}
            <TouchableOpacity
                style={styles.viewMoreButton}
                onPress={() => Linking.openURL(meal.url)}
            >
                <Text style={styles.viewMoreButtonText}>View More Details</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContentContainer}>
            <Text style={styles.mainHeading}>Personalized Diet Plan</Text>

            {isFetchingProfile ? (
                <ActivityIndicator size="large" color={styles.accentColor.color} style={styles.loader} />
            ) : profile ? (
                <>
                    {renderProfileInfo()}
                    <TouchableOpacity
                        style={[styles.generateButton, isGeneratingPlan && styles.buttonDisabled]}
                        onPress={handleGenerate}
                        disabled={isGeneratingPlan}
                    >
                        <Text style={styles.buttonText}>
                            {isGeneratingPlan ? "Generating Plan..." : "Generate My Diet Plan"}
                        </Text>
                        {isGeneratingPlan && <ActivityIndicator size="small" color="#fff" style={{ marginLeft: 10 }} />}
                    </TouchableOpacity>
                </>
            ) : (
                !isFetchingProfile && error && <Text style={styles.errorText}>{error}</Text>
            )}

            {error && !isGeneratingPlan && !isFetchingProfile && (
                <View style={styles.errorContainer}>
                    <Ionicons name="alert-circle-outline" size={20} color={styles.errorText.color} />
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            )}

            {output && !isGeneratingPlan && (
                <View style={styles.outputContainer}>
                    <Text style={styles.sectionHeading}>Your 1-Day Plan</Text>
                    <Markdown style={markdownStyles}>{output}</Markdown>
                </View>
            )}

            {mealRecipes.length > 0 && !isGeneratingPlan && (
                <View style={styles.recipeSection}>
                    <Text style={styles.sectionHeading}>Recipe Ideas 🍲</Text>
                    {mealRecipes.map(renderRecipeCard)}
                </View>
            )}
        </ScrollView>
    );
};

// --- Styling ---
const accentColor = '#4CAF50';
const primaryTextColor = '#FFFFFF';
const secondaryTextColor = '#AEAEB2';
const backgroundColor = '#000000';
const cardBackgroundColor = '#1C1C1E';
const errorColor = '#FF453A';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: backgroundColor,
    },
    scrollContentContainer: {
        padding: 20,
        paddingBottom: 40,
    },
    mainHeading: {
        fontSize: 26,
        fontWeight: 'bold',
        color: primaryTextColor,
        marginBottom: 20,
        textAlign: 'center',
    },
    profileInfoContainer: {
        backgroundColor: cardBackgroundColor,
        borderRadius: 12,
        padding: 15,
        marginBottom: 20,
    },
    infoText: {
        fontSize: 16,
        color: secondaryTextColor,
        marginBottom: 8,
        lineHeight: 22,
    },
    infoValue: {
        color: primaryTextColor,
        fontWeight: '600',
    },
    generateButton: {
        backgroundColor: accentColor,
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 4,
    },
    buttonText: {
        color: primaryTextColor,
        fontSize: 17,
        fontWeight: '600',
    },
    buttonDisabled: {
        backgroundColor: '#555',
        opacity: 0.7,
    },
    loader: {
        marginVertical: 30,
    },
    outputContainer: {
        marginTop: 10,
        padding: 15,
        backgroundColor: cardBackgroundColor,
        borderRadius: 12,
        marginBottom: 20,
    },
    sectionHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        color: primaryTextColor,
        marginBottom: 15,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(76, 175, 80, 0.3)',
    },
    recipeSection: {
        marginTop: 10,
    },
    recipeCard: {
        backgroundColor: cardBackgroundColor,
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    recipeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: primaryTextColor,
        marginBottom: 10,
    },
    recipeImage: {
        width: '100%',
        height: 180,
        borderRadius: 8,
        marginBottom: 10,
        backgroundColor: '#333',
    },
    recipeDetail: {
        fontSize: 14,
        color: secondaryTextColor,
        marginBottom: 5,
    },
    recipeLabel: {
        fontSize: 15,
        fontWeight: '600',
        color: primaryTextColor,
        marginTop: 8,
        marginBottom: 4,
    },
    ingredientItem: {
        fontSize: 14,
        color: secondaryTextColor,
        marginLeft: 5,
        lineHeight: 20,
    },
    viewMoreButton: {
        backgroundColor: accentColor,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    viewMoreButtonText: {
        color: primaryTextColor,
        fontSize: 15,
        fontWeight: '600',
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 69, 58, 0.15)',
        borderRadius: 8,
        padding: 12,
        marginBottom: 20,
    },
    errorText: {
        fontSize: 15,
        color: errorColor,
        marginLeft: 8,
        flex: 1,
    },
    accentColor: {
        color: accentColor,
    }
});

const markdownStyles = StyleSheet.create({
    body: {
        color: primaryTextColor,
        fontSize: 15,
        lineHeight: 23,
    },
    heading1: {
        color: primaryTextColor,
        fontSize: 19,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 8,
        paddingBottom: 4,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.2)',
    },
    heading2: {
        color: primaryTextColor,
        fontSize: 17,
        fontWeight: '600',
        marginTop: 10,
        marginBottom: 5,
    },
    heading3: {
        color: primaryTextColor,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 3,
    },
    strong: {
        color: accentColor,
        fontWeight: 'bold',
        fontSize: 16,
    },
    list_item: {
        color: secondaryTextColor,
        fontSize: 15,
        marginBottom: 5,
        marginLeft: 5,
    },
    bullet_list: {
        marginTop: 5,
    },
    link: {
        color: accentColor,
        textDecorationLine: 'underline',
    },
    paragraph: {
        marginTop: 0,
        marginBottom: 10,
    },
});

export default DietPlanScreen;