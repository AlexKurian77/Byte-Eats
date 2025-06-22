import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDayContext } from "../context/DayContext";

const DayInfo = () => {
  const {
    selectedDate,
    dayData,
    onDeleteIntake,
    onDeleteActivity,
  } = useDayContext();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.dateText}>
            Selected Date: {new Date(selectedDate).toDateString()}
          </Text>

          {/* Intake Section */}
          <View style={styles.section}>
            <Text style={styles.header}>Intake Items</Text>
            {dayData?.intakes?.length > 0 ? (
              dayData.intakes.map((item) => (
                <View key={item.id} style={styles.item}>
                  <Text style={{ color: "#fff" }}>
                    {item.name} - {item.quantity}
                  </Text>
                  {onDeleteIntake && (
                    <Button
                      title="Delete"
                      onPress={() => onDeleteIntake(item, selectedDate)}
                    />
                  )}
                </View>
              ))
            ) : (
              <Text style={{ color: "#aaa" }}>No intake data</Text>
            )}
          </View>

          {/* Activities Section */}
          <View style={styles.section}>
            <Text style={styles.header}>Activities</Text>
            {dayData?.activities?.length > 0 ? (
              dayData.activities.map((activity) => (
                <View key={activity.id} style={styles.item}>
                  <Text style={{ color: "#fff" }}>
                    {activity.name} - {activity.duration}
                  </Text>
                  {onDeleteActivity && (
                    <Button
                      title="Delete"
                      onPress={() => onDeleteActivity(activity, selectedDate)}
                    />
                  )}
                </View>
              ))
            ) : (
              <Text style={{ color: "#aaa" }}>No activity data</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
  },
  section: {
    marginVertical: 10,
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#6C63FF",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
});

export default DayInfo;
