import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      Alert.alert("Success", "Account created successfully!");
      router.replace("/(screens)/PreferenceSlideshow");
    } catch (error) {
      Alert.alert("Sign Up Failed", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#1a1a1a" />
      <Image
        source={require("../../assets/images/BYTE-Eats-logo.png")}
        style={{
          width: 200,
          height: 160,
          alignSelf: "center",
          marginBottom: 20,
        }}
      />
      <Text style={styles.welcomeText}>
        Let's Customize ByteEats for Yourself !
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="white"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="white"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm your password"
        placeholderTextColor="white"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.continueButton} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.orContainer}>
        <View style={styles.orLine} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.orLine} />
      </View>

      <TouchableOpacity style={styles.googleButton}>
        <MaterialCommunityIcons name="google" size={24} color="white" />
        <Text style={styles.googleButtonText}>Continue with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/(tabs)/HomeScreen")}
        style={styles.loginContainer}
      >
        <Text style={styles.loginText}>Already have an account? </Text>
        <Text style={styles.loginLink}>Log in</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    marginLeft: 20,
    fontWeight: "600",
  },
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    paddingTop: 20,
    justifyContent: "center",
  },
  welcomeText: {
    fontSize: 23,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 40,
  },
  input: {
    width: "90%",
    alignSelf: "center",
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "#2a2a2a",
    color: "white",
  },
  continueButton: {
    width: "90%",
    alignSelf: "center",
    padding: 15,
    backgroundColor: "#4caf50",
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#4caf50",
  },
  orText: {
    color: "white",
    marginHorizontal: 10,
    fontSize: 16,
  },
  googleButton: {
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#2a2a2a",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  googleButtonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  loginText: {
    color: "#888",
    fontSize: 14,
  },
  loginLink: {
    color: "#4caf50",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default SignUpScreen;
