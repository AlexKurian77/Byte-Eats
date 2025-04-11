import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GroceryListScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Grocery List Screen 🛒</Text>
    </View>
  );
};

export default GroceryListScreen;

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
