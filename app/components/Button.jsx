import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';


export const Button = ({ onPress, children, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#10b981', // emerald-500
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
