import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
    return (
        <Stack>
            <Stack.Screen name="DayInfo" options={{ headerShown: false }} />
            <Stack.Screen name="AddDayInfo" options={{ headerShown: false }} />
            <Stack.Screen name="MacroTrackerScreen" options={{ headerShown: false }} />
            <Stack.Screen name="NutritionAnalyzer" options={{ headerShown: false }} />
            <Stack.Screen name="PersonalizedDietPlanning" options={{ headerShown: false }} />
            <Stack.Screen name="PreferencesSlideshow" options={{ headerShown: false }} />
            <Stack.Screen name="PricingScreen" options={{ headerShown: false }} />
            <Stack.Screen name="RecipeRecommenderScreen" options={{ headerShown: false }} />
            <Stack.Screen name="SearchScreen" options={{ headerShown: false }} />
        </Stack>
    )
}

export default _layout