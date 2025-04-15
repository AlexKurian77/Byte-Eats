# **Byte Eats**

## Overview

**Byte Eats** is a **fitness tracking app** that helps users manage their diet and fitness goals by leveraging artificial intelligence (AI) and real-time data. The app includes features such as a **custom diet plan generator**, **macro and calorie tracking**, and **AI-powered recipe recommendations** based on available ingredients. Whether you're looking to **bulk**, **cut**, or **maintain**, Byte Eats will assist you in staying on track to meet your fitness goals.

## Features

1. **Custom Diet Plan Generator**  
   Generate a personalized diet plan based on your fitness goals (bulk, cut, maintain). The plan adapts based on progress and preferences.

2. **Macro & Calorie Tracking**  
   Track your daily intake of macronutrients (proteins, carbs, fats) and calories. The app calculates your daily nutritional requirements and updates in real-time.

3. **AI-Powered Recipe Recommender**  
   Get recipe recommendations based on the ingredients you have. AI matches available items in your kitchen with healthy and tasty recipes.

4. **Real-Time Ingredient Pricing**  
   Fetch live pricing for ingredients and provide product links to help you stick to your budget.

5. **Search Functionality**  
   Find dishes by name, ingredients, or cuisine. You can explore a wide variety of recipes for all tastes and dietary needs.

6. **Smart Chatbot Assistant**  
   A chatbot assistant offers **diet tips**, answers **recipe queries**, and provides **fitness-related advice**.

7. **Dietary Preferences Support**  
   Filter recipes and plans based on dietary preferences (e.g., vegetarian, vegan, non-veg, gluten-free, allergy filters).

8. **Daily Meal Chart Visualizer**  
   See an easy-to-read meal timeline that shows your daily meal portions and timings, helping you stay organized.

9. **User Profile & Goal Tracking**  
   Track your progress with visual stats and graphs showing how close you are to achieving your fitness goals.

---

## Tech Stack

- **Frontend**: React Native
- **Backend**: Firebase
- **Database**: Firebase Realtime Database
- **APIs**:  
  - **Nutritionix API**
  - **Gemini AI API**
  
---

## Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.x or higher)
- **React Native CLI** (v0.64 or higher)
  
### Steps to Install

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/byte-eats.git
   cd byte-eats
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Firebase**:
   - Create a Firebase project and get your **Firebase configuration**.
   - Update the `firebaseConfig.js` file with your Firebase credentials.

4. **Install Android/iOS dependencies**:
   - For Android: Make sure you have Android Studio installed and set up the Android emulator.
   - For iOS: Run `pod install` in the `ios` folder (iOS-only setup).

5. **Run the app**:
     ```bash
     npx expo start
     ```
---

## Contributing

We welcome contributions! If you'd like to contribute to **Byte Eats**, feel free to fork the repository and submit pull requests.

Here are some ways you can contribute:
- Report issues or bugs.
- Suggest new features or improvements.
- Help with documentation and code refactoring.

---

## Acknowledgments

- **Nutritionix API** for providing nutritional data.
- **Firebase** for real-time database integration.

---
