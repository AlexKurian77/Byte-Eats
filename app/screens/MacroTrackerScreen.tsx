import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MacroTrackerScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Macro Tracker Screen 🧮</Text>
    </View>
  );
};

export default MacroTrackerScreen;

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
