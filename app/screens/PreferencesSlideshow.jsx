import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert, TouchableHighlight, TouchableOpacity } from 'react-native';
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
    likes: ['', '', ''],
    banned: ['', '', ''],
    activityLevel: '',
    goal: '',
    budget: '',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field, index, value) => {
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
      navigation.navigate("Main");
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
      <Picker 
        selectedValue={formData.gender} 
        onValueChange={val => handleChange('gender', val)}
        style={styles.picker}
        dropdownIconColor="white"
      >
        <Picker.Item label="Select" value="" color="black" />
        <Picker.Item label="Male" value="Male" color="black" />
        <Picker.Item label="Female" value="Female" color="black" />
        <Picker.Item label="Other" value="Other" color="black" />
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
      <Picker 
        selectedValue={formData.dietarypreferences} 
        onValueChange={val => handleChange('dietarypreferences', val)}
        style={styles.picker}
        dropdownIconColor="white"
      >
        <Picker.Item label="Select" value="" color="black" />
        <Picker.Item label="Veg" value="Veg" color="black" />
        <Picker.Item label="Non-Veg" value="Non-Veg" color="black" />
        <Picker.Item label="Vegan" value="Vegan" color="black" />
      </Picker>
    </View>,

    <View key="step4">
      <Text style={styles.label}>Likes (3):</Text>
      {[0, 1, 2].map(i => (
        <TextInput
          key={i}
          placeholder={`Item ${i + 1}`}
          placeholderTextColor="white"
          style={styles.input}
          value={formData.likes[i]}
          onChangeText={text => handleArrayChange('likes', i, text)}
        />
      ))}
    </View>,

    <View key="step5">
      <Text style={styles.label}>Dislikes (3):</Text>
      {[0, 1, 2].map(i => (
        <TextInput
          key={i}
          placeholder={`Item ${i + 1}`}
          placeholderTextColor="white"
          style={styles.input}
          value={formData.banned[i]}
          onChangeText={text => handleArrayChange('banned', i, text)}
        />
      ))}
    </View>,

    <View key="step6">
      <Text style={styles.label}>Activity Level:</Text>
      <Picker 
        selectedValue={formData.activityLevel} 
        onValueChange={val => handleChange('activityLevel', val)}
        style={styles.picker}
        dropdownIconColor="white"
      >
        <Picker.Item label="Select" value="" color="black" />
        <Picker.Item label="Sedentary" value="Sedentary" color="black" />
        <Picker.Item label="Lightly Active" value="Lightly Active" color="black" />
        <Picker.Item label="Active" value="Active" color="black" />
        <Picker.Item label="Very Active" value="Very Active" color="black" />
      </Picker>
    </View>,

    <View key="step7">
      <Text style={styles.label}>Goal:</Text>
      <Picker 
        selectedValue={formData.goal} 
        onValueChange={val => handleChange('goal', val)}
        style={styles.picker}
        dropdownIconColor="white"
      >
        <Picker.Item label="Select" value="" color="black" />
        <Picker.Item label="Cutting" value="Cutting" color="black" />
        <Picker.Item label="Bulking" value="Bulking" color="black" />
        <Picker.Item label="Maintain" value="Maintain" color="black" />
      </Picker>

      <Text style={styles.label}>Budget:</Text>
      <TextInput style={styles.input} value={formData.budget} onChangeText={text => handleChange('budget', text)} keyboardType="numeric" />
    </View>,
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.progressContainer}>
        {steps.map((_, index) => (
          <View
            key={index}
            style={[
              styles.progressBar,
              {
                backgroundColor: index <= step ? '#4caf50' : '#2a2a2a',
                opacity: index <= step ? 1 : 0.5,
                marginRight: index < steps.length - 1 ? 4 : 0
              }
            ]}
          />
        ))}
      </View>
      {steps[step]}
      <TouchableOpacity
          style={styles.nextOrSubmit}
          onPress={handleNext}
        >
          <Text style={styles.buttonText}>
            {step === steps.length - 1 ? 'Submit' : 'Next'}
          </Text>
        </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#1a1a1a', // Dark background
  },
  label: {
    fontSize: 16,
    marginTop: 15,
    fontWeight: 'bold',
    color: '#fff', // White text for contrast
  },
  input: {
    padding: 10,
    borderRadius: 8, // Rounded corners for a modern look
    marginBottom: 15,
    backgroundColor: '#2a2a2a', // Darker background
    color: '#fff', // White text for readability
  },
  picker: {
    backgroundColor: '#2a2a2a',
    color: 'white',
    borderWidth: 1,
    borderColor: '#4caf50',
    borderRadius: 8,
    marginBottom: 12,
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
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  progressBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  nextOrSubmit:{
    backgroundColor: '#4caf50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  }
});

export default PreferenceForm;