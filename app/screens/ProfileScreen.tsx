import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const ProfileScreen = () => {
  const [profile, setProfile] = useState(null);
  const db = getFirestore();
  const user = getAuth().currentUser;

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.log('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return (
      <View style={styles.container}>
        <Text>Loading your legendary profile bro...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.avatar}
      />
      <Text style={styles.name}>{profile.name || 'No Name Found 😅'}</Text>
      <Text style={styles.goal}>Goal: {profile.goal || 'No Goal'}</Text>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>{profile.weight || '--'}kg</Text>
          <Text style={styles.statLabel}>Current Weight</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>{profile.targetWeight || '--'}kg</Text>
          <Text style={styles.statLabel}>Target Weight</Text>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>{profile.height || '--'}cm</Text>
          <Text style={styles.statLabel}>Current Height</Text>
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
