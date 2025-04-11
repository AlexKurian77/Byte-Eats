import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PricingScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pricing Screen 💸</Text>
    </View>
  );
};

export default PricingScreen;

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
