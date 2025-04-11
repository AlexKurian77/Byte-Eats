import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MealChartScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Meal Chart Screen 🍽️</Text>
    </View>
  );
};

export default MealChartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 22,
    fontWeight: '600',
  },
});
