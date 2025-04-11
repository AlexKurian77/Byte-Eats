import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PreferencesScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Preferences Screen ⚙️</Text>
    </View>
  );
};

export default PreferencesScreen;

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
