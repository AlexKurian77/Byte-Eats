import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../firebaseConfig';

const SignUpScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      Alert.alert('Success', 'Account created successfully!');
      navigation.navigate('PreferenceSlidehow');
    } catch (error: any) {
      Alert.alert('Sign Up Failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm your password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('Login')} className='flex-row mt-4'>
        <Text>Already have an account?</Text><Text style={styles.link}>Log in</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#4caf50',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    color: '#4caf50',
    marginLeft:5,
  },
});

export default SignUpScreen;
