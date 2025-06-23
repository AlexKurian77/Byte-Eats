import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { FIRESTORE_DB, FIREBASE_AUTH } from "../../firebaseConfig";
import {
  doc,
  updateDoc,
  setDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";

function AddDayInfo() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [calories, setCalories] = useState("");
  const [meals, setMeals] = useState([]);
  const { title, selectedDate, fireTitle } = useLocalSearchParams();

  const fetchMeals = async () => {
    const user = FIREBASE_AUTH.currentUser;
    if (!user) return;

    const mealRef = doc(FIRESTORE_DB, `users/${user.uid}/meals/${selectedDate}`);
    const docSnap = await getDoc(mealRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data[fireTitle]) {
        setMeals(data[fireTitle]); // 🍛 Set existing meals
      }
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  const sendInfo = async () => {
    const user = FIREBASE_AUTH.currentUser;
    if (!user) {
      alert("You must be logged in.");
      return;
    }
    if (!name || !quantity || !calories) {
      alert("Please fill all fields.");
      return;
    }

    const mealData = {
      name,
      quantity,
      calories,
    };

    const mealRef = doc(FIRESTORE_DB, `users/${user.uid}/meals/${selectedDate}`);

    try {
      const docSnap = await getDoc(mealRef);
      if (docSnap.exists()) {
        await updateDoc(mealRef, {
          [fireTitle]: arrayUnion(mealData),
        });
      } else {
        await setDoc(mealRef, {
          [fireTitle]: [mealData],
        });
      }

      alert("Meal added!");
      setName("");
      setQuantity("");
      setCalories("");
      fetchMeals(); // 👈 Refresh meals list
    } catch (err) {
      alert("Error adding meal: " + err.message);
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.header}>
          <MaterialCommunityIcons
            name="plus-circle-outline"
            size={28}
            color="#4caf50"
          />
          <Text style={styles.heading}>Add {title}</Text>
        </View>

        {/* Show existing meals if any */}
        {meals.length > 0 && (
          <View style={styles.logContainer}>
            <Text style={styles.subHeading}>Your Meals for {title}:</Text>
            {meals.map((meal, index) => (
              <View key={index} style={styles.mealItem}>
                <Text style={styles.mealText}>{meal.name}</Text>
                <Text style={styles.mealSub}>
                  {meal.quantity} • {meal.calories} cal
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Form to Add More */}
        <View style={styles.card}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Oatmeal"
              placeholderTextColor="#aaa"
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Quantity</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 1 cup"
              placeholderTextColor="#aaa"
              value={quantity}
              onChangeText={setQuantity}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Calories</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 250"
              placeholderTextColor="#aaa"
              value={calories}
              onChangeText={setCalories}
              keyboardType="numeric"
            />
          </View>
          <TouchableOpacity style={styles.addButton} onPress={sendInfo}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 24,
    paddingBottom: 10,
    marginBottom: 10,
  },
  heading: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 12,
  },
  card: {
    backgroundColor: "rgba(76,175,80,0.1)",
    margin: 20,
    borderRadius: 15,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(76,175,80,0.3)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#222",
    color: "#fff",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#333",
  },
  addButton: {
    backgroundColor: "#4caf50",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
  logContainer: {
    marginHorizontal: 20,
    marginBottom: 10,
  },
  subHeading: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  mealItem: {
    backgroundColor: "rgba(76,175,80,0.1)",
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    borderColor: "rgba(76,175,80,0.3)",
    borderWidth: 1,
  },
  mealText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  mealSub: {
    color: "#aaa",
    fontSize: 14,
  },
});

export default AddDayInfo;
