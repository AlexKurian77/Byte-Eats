import React from 'react';
import { View, StyleSheet } from 'react-native';


export const Card = ({ children }) => {
  return <View style={styles.card}>{children}</View>;
};

export const CardContent = ({ children }) => {
  return <View style={styles.content}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1f2937', // gray-900
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#4b5563', // gray-700
    padding: 16,
    marginBottom: 12,
  },
  content: {
    flexDirection: 'column',
  },
});
