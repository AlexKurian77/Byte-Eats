// LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Logging in...');
    // Add your login logic here (e.g., check credentials)
  };

  return (
    <View className="flex-1 bg-blue-500 justify-center px-6">
      {/* Logo */}
      <View className="mb-8 items-center">
      </View>

      {/* Heading */}
      <Text className="text-white text-3xl font-semibold text-center mb-6">Welcome Back!</Text>

      {/* Email Input */}
      <TextInput
        className="bg-white p-4 rounded-lg mb-4 text-black"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* Password Input */}
      <TextInput
        className="bg-white p-4 rounded-lg mb-6 text-black"
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Login Button */}
      <TouchableOpacity
        onPress={handleLogin}
        className="bg-yellow-400 p-4 rounded-lg mb-4">
        <Text className="text-center text-white font-semibold">Login</Text>
      </TouchableOpacity>

      {/* Go to Sign Up Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('SignUp')}
        className="flex-row justify-center mt-4">
        <Text className="text-white">Don't have an account? </Text>
        <Text className="text-yellow-400 font-semibold">Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
});
