// DayInfo.tsx

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';


const DayInfo = ({ dayData, selectedDate, onDeleteIntake, onDeleteActivity }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>Selected Date: {selectedDate.toDateString()}</Text>

      {/* Display intake data */}
      <View style={styles.section}>
        <Text style={styles.header}>Intake Items</Text>
        {dayData?.intakes?.map((item) => (
          <View key={item.id} style={styles.item}>
            <Text>{item.name} - {item.quantity}</Text>
            <Button
              title="Delete"
              onPress={() => onDeleteIntake(item, selectedDate)}
            />
          </View>
        ))}
      </View>

      {/* Display activities data */}
      <View style={styles.section}>
        <Text style={styles.header}>Activities</Text>
        {dayData?.activities?.map((activity) => (
          <View key={activity.id} style={styles.item}>
            <Text>{activity.name} - {activity.duration}</Text>
            <Button
              title="Delete"
              onPress={() => onDeleteActivity(activity, selectedDate)}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    marginVertical: 10,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
});

export default DayInfo;
