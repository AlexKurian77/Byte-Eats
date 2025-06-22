import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import Markdown from 'react-native-markdown-display';

const GEMINI_API_KEY = Constants.expoConfig?.extra?.geminiApiKey || 'YOUR_API_KEY';

const PricingScreen = () => {
  const [input, setInput] = useState('');
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [calculatedPrice, setCalculatedPrice] = useState('');

  const commonIngredients = [
    { name: 'Rice', price: '60', unit: 'kg' },
    { name: 'Wheat Flour', price: '45', unit: 'kg' },
    { name: 'Milk', price: '65', unit: 'L' },
    { name: 'Tomatoes', price: '40', unit: 'kg' },
    { name: 'Onions', price: '35', unit: 'kg' },
    { name: 'Potatoes', price: '30', unit: 'kg' }
  ];

  const calculatePrice = (item, qty) => {
    const ingredient = commonIngredients.find(ing => ing.name === item) || 
                      prices.find(ing => ing.name === item);
    if (!ingredient || !qty) return;
    
    const basePrice = parseFloat(ingredient.price);
    const amount = parseFloat(qty);
    
    if (isNaN(amount) || isNaN(basePrice)) return;
    
    let multiplier = 1;
    switch(ingredient.unit) {
      case 'kg':
        multiplier = amount / 1000; // Convert grams to kg
        break;
      case 'l':
        multiplier = amount / 1000; // Convert ml to L
        break;
      case 'piece':
        multiplier = amount; // Direct multiplication for pieces
        break;
      case 'dozen':
        multiplier = amount / 12; // Convert to dozens
        break;
      default:
        multiplier = amount;
    }
    
    const total = basePrice * multiplier;
    setCalculatedPrice(`₹${total.toFixed(2)}`);
  };

  const fetchPrices = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setPrices([]);

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

      const prompt = `Give me estimated prices in INR for these ingredients: ${input}. Format like this:
      1. Item1 - ₹price/unit (specify kg or L)
      2. Item2 - ₹price/unit (specify kg or L)
      3. Item3 - ₹price/unit (specify kg or L)`;

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
        .map((line) => line.trim())
        .filter((line) => /^\d+\./.test(line))
        .map((line) => {
          const parts = line.split('-');
          const name = parts[0].replace(/^\d+\.\s*/, '').trim();
          
          // Enhanced price pattern matching with better unit handling
          const priceMatch = parts[1]?.match(/₹\s*(\d+(?:\.\d+)?)\s*(?:\/|per)?\s*(kg|g|kgs|grams|l|ml|liter|litre|piece|pc|pcs|pieces|dozen|dz|dzn)?/i) || [];
          const price = priceMatch[1] || '';
          let unit = (priceMatch[2] || 'kg').toLowerCase();
          
          // Standardize units with expanded variations
          if (['g', 'grams', 'gram'].includes(unit)) unit = 'kg';
          if (['ml', 'liter', 'litre'].includes(unit)) unit = 'l';
          if (['pc', 'pcs', 'piece', 'pieces'].includes(unit)) unit = 'piece';
          if (['dz', 'dzn', 'dozen'].includes(unit)) unit = 'dozen';
          if (['kgs'].includes(unit)) unit = 'kg';
          
          return {
            name,
            price: price || '--',
            unit
          };
      });

      setPrices(parsed);
    } catch (err) {
      console.error('Gemini Error BKL:', err);
      setPrices([{ name: 'Error', price: '😢 Unable to fetch prices' }]);
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>💰 Ingredient Pricing</Text>
      
      <Text style={styles.subheading}>Common Ingredients</Text>
      <ScrollView horizontal style={styles.commonIngredientsContainer}>
        {commonIngredients.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.commonCard, selectedItem === item.name && styles.selectedCard]}
            onPress={() => {
              setSelectedItem(item.name);
              setQuantity('');
              setCalculatedPrice('');
            }}
          >
            <Text style={styles.commonItem}>{item.name}</Text>
            <Text style={styles.commonPrice}>₹{item.price}/{item.unit}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {selectedItem && (
        <View style={styles.quantityContainer}>
          <TextInput
            style={styles.quantityInput}
            placeholder={`Enter quantity in ${selectedItem === 'Milk' ? 'ml' : 'g'}`}
            placeholderTextColor="#666"
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
          />
          <TouchableOpacity 
            style={styles.calculateButton}
            onPress={() => calculatePrice(selectedItem, quantity)}
          >
            <Text style={styles.calculateButtonText}>Calculate Price</Text>
          </TouchableOpacity>
          {calculatedPrice && (
            <Text style={styles.calculatedPrice}>Calculated Price: {calculatedPrice}</Text>
          )}
        </View>
      )}

      <TextInput
        style={styles.input}
        placeholder="Enter ingredients (e.g. rice, milk)"
        placeholderTextColor="#666"
        value={input}
        onChangeText={setInput}
      />
      <View style={{ backgroundColor: '#4CAF50', borderRadius: 15, overflow: 'hidden', marginVertical: 8 }}>
        <Button
          color="#4CAF50"
          title={loading ? 'Checking...' : 'Get Prices'}
          onPress={fetchPrices}
        />
      </View>

      {loading && <ActivityIndicator size="large" color="#4CAF50" style={{ marginTop: 20 }} />}

      <ScrollView style={styles.scroll}>
        {prices.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, selectedItem === item.name && styles.selectedCard]}
            onPress={() => {
              setSelectedItem(item.name);
              setQuantity('');
              setCalculatedPrice('');
            }}
          >
            <Text style={styles.item}>{item.name}</Text>
            <Text style={styles.price}>₹{item.price}/{item.unit}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default PricingScreen;

const styles = StyleSheet.create({
  selectedCard: {
    borderColor: '#fff',
    borderWidth: 2,
    backgroundColor: '#3a3a3a',
  },
  calculateButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 10,
    marginTop: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  calculateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  quantityContainer: {
    marginVertical: 16,
    padding: 12,
    backgroundColor: '#2a2a2a',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: '#4CAF50',
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 10,
    color: '#fff',
    marginBottom: 8,
  },
  calculatedPrice: {
    color: '#4CAF50',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 8,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1a1a1a',
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#4CAF50',
    backgroundColor: '#2a2a2a',
    padding: 16,
    borderRadius: 15,
    marginBottom: 16,
    color: '#fff',
    fontSize: 16,
  },
  scroll: {
    marginTop: 24,
  },
  card: {
    backgroundColor: '#2a2a2a',
    padding: 20,
    borderRadius: 15,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  item: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  price: {
    fontSize: 18,
    color: '#4CAF50',
    fontWeight: '700',
  },
  subheading: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    color: '#fff',
  },
  commonIngredientsContainer: {
    marginBottom: 20,
  },
  commonCard: {
    backgroundColor: '#2a2a2a',
    padding: 12,
    borderRadius: 10,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#4CAF50',
    minWidth: 120,
  },
  commonItem: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 4,
  },
  commonPrice: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '600',
  },
});