import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import Constants from "expo-constants";
import { SafeAreaView } from "react-native-safe-area-context";

const FDC_KEY = Constants.expoConfig?.extra?.fdcKey || "YOUR_API_KEY";

const NutritionAnalyzer = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [nutrients, setNutrients] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchFood = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setNutrients(null);
    setError(null);
    setSearchResults([]);

    try {
      const res = await fetch(
        `https://api.nal.usda.gov/fdc/v1/foods/search?query=${query}&api_key=MYGkjAgODAwfhLjkOcYeaBBYzLeZGGXUAxFVV1VZ`
      );
      const data = await res.json();
      if (data?.foods?.length > 0) {
        setSearchResults(data.foods);
      } else {
        setError("No food found.");
      }
    } catch (e) {
      setError("Search failed. Please try again.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const getFoodDetails = async (fdcId) => {
    setLoading(true);
    setNutrients(null);
    setError(null);

    try {
      const res = await fetch(
        `https://api.nal.usda.gov/fdc/v1/food/${fdcId}?api_key=MYGkjAgODAwfhLjkOcYeaBBYzLeZGGXUAxFVV1VZ`
      );
      const data = await res.json();
      setNutrients(data);
    } catch (e) {
      setError("Failed to load food details.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Nutrition Analyzer</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter a food item..."
          placeholderTextColor="#aaa"
          value={query}
          onChangeText={setQuery}
        />

        <TouchableOpacity style={styles.button} onPress={searchFood}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>

        {loading && <ActivityIndicator size="large" color="#10b981" />}

        {error && <Text style={styles.error}>{error}</Text>}

        {/* Search Results */}
        {searchResults.length > 0 && !nutrients && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Select a food item:</Text>
            {searchResults.slice(0, 5).map((item, index) => (
              <TouchableOpacity
                key={item.fdcId}
                onPress={() => getFoodDetails(item.fdcId)}
              >
                <Text style={styles.resultItem}>
                  {item.description}{" "}
                  {item.brandName ? `(${item.brandName})` : ""}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Nutrient Details */}
        {nutrients && Array.isArray(nutrients.foodNutrients) && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{nutrients.description}</Text>

            {nutrients.foodNutrients
              .filter((n) =>
                [
                  "Energy",
                  "Protein",
                  "Total lipid (fat)",
                  "Carbohydrate, by difference",
                  "Sugars, total including NLEA",
                  "Fiber, total dietary",
                  "Sodium, Na",
                ].includes(n.nutrientName)
              )
              .map((n) => (
                <Text key={n.nutrientId} style={styles.nutrient}>
                  {n.nutrientName}: {n.value} {n.unitName}
                </Text>
              ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#000",
    flexGrow: 1,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#1e1e1e",
    color: "#fff",
    borderColor: "#444",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#10b981",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  card: {
    backgroundColor: "#111827",
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    borderColor: "#374151",
    borderWidth: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 12,
  },
  resultItem: {
    color: "#9ca3af",
    fontSize: 15,
    marginBottom: 8,
    textDecorationLine: "underline",
  },
  nutrient: {
    color: "#d1d5db",
    fontSize: 14,
    marginBottom: 4,
  },
  error: {
    color: "#f87171",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default NutritionAnalyzer;
