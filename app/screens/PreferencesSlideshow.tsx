import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getAuth } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebaseConfig';
import { useNavigation } from '@react-navigation/native';

const PreferenceForm = () => {
  const navigation = useNavigation();

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    targetweight: '',
    dietarypreferences: '',
    likesanddislikes: ['', '', ''],
    banned: ['', '', ''],
    activityLevel: '',
    goal: '',
    budget: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: 'likesanddislikes' | 'banned', index: number, value: string) => {
    const updatedArray = [...formData[field]];
    updatedArray[index] = value;
    setFormData(prev => ({ ...prev, [field]: updatedArray }));
  };

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(prev => prev + 1);
    } else {
      saveToFirestore();
    }
  };

  const saveToFirestore = async () => {
    try {
      const user = getAuth().currentUser;
      if (!user) {
        Alert.alert('Please sign in to save your preferences.');
        return;
      }

      await setDoc(doc(FIRESTORE_DB, 'users', user.uid), formData);
      Alert.alert('Preferences saved successfully!');
      navigation.navigate("Main" as never);
    } catch (err) {
      console.error('Error saving to Firestore:', err);
      Alert.alert('Error saving. Check your internet or Firestore rules.');
    }
  };

  const steps = [
    <View key="step1">
      <Text style={styles.label}>Name:</Text>
      <TextInput style={styles.input} value={formData.name} onChangeText={text => handleChange('name', text)} />

      <Text style={styles.label}>Age:</Text>
      <TextInput style={styles.input} value={formData.age} onChangeText={text => handleChange('age', text)} keyboardType="numeric" />
    </View>,

    <View key="step2">
      <Text style={styles.label}>Gender:</Text>
      <Picker selectedValue={formData.gender} onValueChange={val => handleChange('gender', val)}>
        <Picker.Item label="Select" value="" />
        <Picker.Item label="Male" value="Male" />
        <Picker.Item label="Female" value="Female" />
        <Picker.Item label="Other" value="Other" />
      </Picker>

      <Text style={styles.label}>Height (in cm):</Text>
      <TextInput style={styles.input} value={formData.height} onChangeText={text => handleChange('height', text)} keyboardType="numeric" />

      <Text style={styles.label}>Weight (in kg):</Text>
      <TextInput style={styles.input} value={formData.weight} onChangeText={text => handleChange('weight', text)} keyboardType="numeric" />

      <Text style={styles.label}>Target Weight (in kg):</Text>
      <TextInput style={styles.input} value={formData.targetweight} onChangeText={text => handleChange('targetweight', text)} keyboardType="numeric" />
    </View>,

    <View key="step3">
      <Text style={styles.label}>Dietary Preference:</Text>
      <Picker selectedValue={formData.dietarypreferences} onValueChange={val => handleChange('dietarypreferences', val)}>
        <Picker.Item label="Select" value="" />
        <Picker.Item label="Veg" value="Veg" />
        <Picker.Item label="Non-Veg" value="Non-Veg" />
        <Picker.Item label="Vegan" value="Vegan" />
      </Picker>
    </View>,

    <View key="step4">
      <Text style={styles.label}>Likes & Dislikes (3):</Text>
      {[0, 1, 2].map(i => (
        <TextInput
          key={i}
          placeholder={`Item ${i + 1}`}
          style={styles.input}
          value={formData.likesanddislikes[i]}
          onChangeText={text => handleArrayChange('likesanddislikes', i, text)}
        />
      ))}
    </View>,

    <View key="step5">
      <Text style={styles.label}>Banned Items (3):</Text>
      {[0, 1, 2].map(i => (
        <TextInput
          key={i}
          placeholder={`Banned ${i + 1}`}
          style={styles.input}
          value={formData.banned[i]}
          onChangeText={text => handleArrayChange('banned', i, text)}
        />
      ))}
    </View>,

    <View key="step6">
      <Text style={styles.label}>Activity Level:</Text>
      <Picker selectedValue={formData.activityLevel} onValueChange={val => handleChange('activityLevel', val)}>
        <Picker.Item label="Select" value="" />
        <Picker.Item label="Sedentary" value="Sedentary" />
        <Picker.Item label="Lightly Active" value="Lightly Active" />
        <Picker.Item label="Active" value="Active" />
        <Picker.Item label="Very Active" value="Very Active" />
      </Picker>
    </View>,

    <View key="step7">
      <Text style={styles.label}>Goal:</Text>
      <Picker selectedValue={formData.goal} onValueChange={val => handleChange('goal', val)}>
        <Picker.Item label="Select" value="" />
        <Picker.Item label="Cutting" value="Cutting" />
        <Picker.Item label="Bulking" value="Bulking" />
        <Picker.Item label="Maintain" value="Maintain" />
      </Picker>

      <Text style={styles.label}>Budget:</Text>
      <TextInput style={styles.input} value={formData.budget} onChangeText={text => handleChange('budget', text)} keyboardType="numeric" />
    </View>,
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {steps[step]}
      <Button title={step === steps.length - 1 ? 'Submit' : 'Next'} onPress={handleNext} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 1)', // Dark background
  },
  label: {
    fontSize: 16,
    marginTop: 12,
    fontWeight: 'bold',
    color: '#fff', // White text for contrast
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)', // Subtle white border
    padding: 10,
    borderRadius: 8, // Rounded corners for a modern look
    marginBottom: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Light translucent background
    color: '#fff', // White text for readability
  },
  button: {
    backgroundColor: '#4caf50', // Green button for action
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff', // White text for contrast
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default PreferenceForm;
