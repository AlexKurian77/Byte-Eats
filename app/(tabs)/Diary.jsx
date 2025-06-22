import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import moment from "moment";
import { SafeAreaView } from "react-native-safe-area-context";
import { Calendar } from "react-native-calendars";
import { router } from "expo-router";
import { useDayContext } from "../context/DayContext";

const DiaryUI = () => {
  const tom = new Date();
  tom.setDate(tom.getDate() + 1);
  const maxDate = tom.toISOString().split("T")[0];
  const calories = { consumed: 62, goal: 3505 };
  const macros = { carbs: "14/525g", fat: "0/97g", protein: "0/131g" };

  const { selectedDate, setSelectedDate, setDayData } = useDayContext();
  useEffect(() => {
    if (!selectedDate) {
      const today = moment().format("YYYY-MM-DD");
      setSelectedDate(today);
    }
  }, []);

  const handleNavigateToDayInfo = () => {
    setSelectedDate(selectedDate);
    setDayData({ example: "some data" });
    router.push("/(screens)/DayInfo");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#121212" }}>
      <ScrollView>
        <View style={styles.container}>
          {/* Calendar */}
          {selectedDate && (
            <Calendar
              current={selectedDate}
              minDate={"2025-06-01"}
              maxDate={maxDate}
              onDayPress={(day) => setSelectedDate(day.dateString)}
              markedDates={{
                [selectedDate]: {
                  selected: true,
                  selectedColor: "#6C63FF",
                  selectedTextColor: "#fff",
                },
              }}
              theme={{
                backgroundColor: "#121212",
                calendarBackground: "#121212",
                dayTextColor: "#fff",
                monthTextColor: "#fff",
                selectedDayBackgroundColor: "#6C63FF",
                selectedDayTextColor: "#fff",
                todayTextColor: "#6C63FF",
                arrowColor: "#fff",
                textDisabledColor: "#444",
                textSectionTitleColor: "#fff",
              }}
              style={{ marginBottom: 16, borderRadius: 10 }}
            />
          )}

          {/* Date and Calories */}
          <View style={styles.dateSection}>
            <Text style={styles.dateTextLarge}>
              {moment(selectedDate).format("dddd, MMMM D, YYYY")}
            </Text>
            <View>
              <View style={styles.calorieBox}>
                <Text style={styles.calorieText}>
                  {calories.consumed}/{calories.goal} kcal
                </Text>
              </View>
              <Text style={styles.macroText}>
                Carbs: {macros.carbs}, Fat: {macros.fat}, Protein:{" "}
                {macros.protein}
              </Text>
            </View>
          </View>

          {/* Meals */}
          <View style={styles.mealSection}>
            <Text style={styles.sectionTitle}>Breakfast</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() =>
                router.push({
                  pathname: "/(screens)/DayInfo",
                  params: {
                    dayData: {},
                    selectedDate: selectedDate,
                  },
                })
              }
            >
              <Icon name="add-outline" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
          <View style={styles.mealSection}>
            <Text style={styles.sectionTitle}>Lunch</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => console.log("Add Lunch")}
            >
              <Icon name="add-outline" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
          <View style={styles.mealSection}>
            <Text style={styles.sectionTitle}>Dinner</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => console.log("Add Dinner")}
            >
              <Icon name="add-outline" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
          <View style={styles.mealSection}>
            <Text style={styles.sectionTitle}>Snack</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => console.log("Add Snack")}
            >
              <Icon name="add-outline" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
          <View style={styles.mealSection}>
            <Text style={styles.sectionTitle}>Customized Meal</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => console.log("Add Customized Meal")}
            >
              <Icon name="add-outline" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 16,
    paddingTop: 40,
  },
  dateSection: {
    alignItems: "center",
    marginBottom: 16,
  },
  dateTextLarge: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  calorieBox: {
    backgroundColor: "#FF3B30",
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: "center",
  },
  calorieText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  macroText: {
    color: "#FFF",
    fontSize: 14,
    textAlign: "center",
  },
  mealSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#6C63FF",
    padding: 8,
    borderRadius: 8,
  },
});

export default DiaryUI;
