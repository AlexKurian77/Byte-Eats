import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.avatar}
      />
      <Text style={styles.name}>Alexander Kurian</Text>
      <Text style={styles.goal}>Goal: Cutting</Text>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>80kg</Text>
          <Text style={styles.statLabel}>Current Weight</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>75kg</Text>
          <Text style={styles.statLabel}>Target Weight</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.editBtn}>
        <Text style={styles.editText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 40, backgroundColor: '#fff' },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 5 },
  goal: { fontSize: 16, color: 'gray', marginBottom: 20 },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginBottom: 30,
  },
  statBox: {
    alignItems: 'center',
    backgroundColor: '#e8f5e9',
    padding: 15,
    borderRadius: 10,
    width: '45%',
  },
  statNum: { fontSize: 22, fontWeight: 'bold', color: '#388e3c' },
  statLabel: { fontSize: 14, color: '#666', marginTop: 5 },
  editBtn: {
    backgroundColor: '#4caf50',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
  },
  editText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default ProfileScreen;
