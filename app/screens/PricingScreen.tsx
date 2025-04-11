import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';
import Markdown from 'react-native-markdown-display';

const GEMINI_API_KEY = Constants.expoConfig?.extra?.geminiApiKey || 'YOUR_API_KEY';

const PricingScreen = () => {
  const [input, setInput] = useState('');
  const [prices, setPrices] = useState<{ name: string; price: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPrices = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setPrices([]);

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

      const prompt = `Give me estimated prices in INR for these ingredients: ${input}. Format like this:
      1. Item1 - ₹price/kg
      2. Item2 - ₹price/kg
      3. Item3 - ₹price/kg`;

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
        .map((line: string) => line.trim())
        .filter((line: string) => /^\d+\./.test(line))
        .map((line: string) => {
          const parts = line.split('-');
          return {
            name: parts[0].replace(/^\d+\.\s*/, '').trim(),
            price: parts[1]?.trim() || '₹--',
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
      <TextInput
        style={styles.input}
        placeholder="Enter ingredients (e.g. rice, milk)"
        value={input}
        onChangeText={setInput}
      />
      <Button title={loading ? 'Checking...' : 'Get Prices'} onPress={fetchPrices} />

      {loading && <ActivityIndicator size="large" color="#007BFF" style={{ marginTop: 20 }} />}

      <ScrollView style={styles.scroll}>
        {prices.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.item}>{item.name}</Text>
            <Text style={styles.price}>{item.price}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default PricingScreen;

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
  scroll: {
    marginTop: 20,
  },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    fontSize: 16,
    fontWeight: '600',
  },
  price: {
    fontSize: 16,
    color: '#007BFF',
  },
});
