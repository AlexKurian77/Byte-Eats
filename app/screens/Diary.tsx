import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment'; // Install moment.js for date manipulation

const DiaryUI: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(moment()); // Current date state
  const [selectedDate, setSelectedDate] = useState(moment().date()); // Selected date state

  const calories = { consumed: 62, goal: 3505 };
  const macros = { carbs: '14/525g', fat: '0/97g', protein: '0/131g' };

  // Navigate to the previous month
  const handlePreviousMonth = () => {
    setCurrentDate(currentDate.clone().subtract(1, 'month'));
  };

  // Navigate to the next month
  const handleNextMonth = () => {
    setCurrentDate(currentDate.clone().add(1, 'month'));
  };

  // Handle date selection
  const handleDateSelect = (date: number) => {
    setSelectedDate(date);
  };

  // Handle "Add" button press (Meal Sections)
  const handleAddPress = (section: string) => {
    console.log(`Add button pressed for ${section}`);
    // Add your logic here (e.g., navigate to another screen or open a modal)
  };

  // Generate days for the current month
  const daysInMonth = Array.from(
    { length: currentDate.daysInMonth() },
    (_, i) => i + 1
  );

  return (
    <View style={styles.container}>
      {/* Calendar Header */}
      {/* <View style={styles.calendarHeader}>
        <TouchableOpacity onPress={handlePreviousMonth}>
          <Icon name="chevron-back-outline" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.monthText}>{currentDate.format('MMMM YYYY')}</Text>
        <TouchableOpacity onPress={handleNextMonth}>
          <Icon name="chevron-forward-outline" size={24} color="#FFF" />
        </TouchableOpacity>
      </View> */}

      {/* Calendar */}
      {/* <View style={styles.calendar}>
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
          <Text key={index} style={styles.dayLabel}>
            {day}
          </Text>
        ))}
        {daysInMonth.map((day) => (
          <TouchableOpacity
            key={day}
            style={[
              styles.dateCircle,
              day === selectedDate && styles.selectedDateCircle, // Highlight selected date
            ]}
            onPress={() => handleDateSelect(day)}
          >
            <Text
              style={[
                styles.dateText,
                day === selectedDate && styles.selectedDateText,
              ]}
            >
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </View> */}

      {/* Date and Calories */}
      <View style={styles.dateSection}>
        <Text style={styles.dateTextLarge}>
          {/* {currentDate.clone().date(selectedDate).format('dddd, MMMM D, YYYY')} */}
          DIARY
        </Text>
        <View>
          <View style={styles.calorieBox}>
            <Text style={styles.calorieText}>
              {calories.consumed}/{calories.goal} kcal
            </Text>
          </View>
          <Text style={styles.macroText}>
            Carbs: {macros.carbs}, Fat: {macros.fat}, Protein: {macros.protein}
          </Text>
        </View>
      </View>

      {/* Breakfast Section */}
      <View style={styles.mealSection}>
        <Text style={styles.sectionTitle}>Breakfast</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleAddPress('Breakfast')}
        >
          <Icon name="add-outline" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Lunch Section */}
      <View style={styles.mealSection}>
        <Text style={styles.sectionTitle}>Lunch</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleAddPress('Lunch')}
        >
          <Icon name="add-outline" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Dinner Section */}
      <View style={styles.mealSection}>
        <Text style={styles.sectionTitle}>Dinner</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleAddPress('Dinner')}
        >
          <Icon name="add-outline" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Snack Section */}
      <View style={styles.mealSection}>
        <Text style={styles.sectionTitle}>Snack</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleAddPress('Snack')}
        >
          <Icon name="add-outline" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Customized Meal Section */}
      <View style={styles.mealSection}>
        <Text style={styles.sectionTitle}>Customized Meal</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleAddPress('Customized Meal')}
        >
          <Icon name="add-outline" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  monthText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dayLabel: {
    width: '14%',
    textAlign: 'center',
    color: '#FFF',
    fontSize: 12,
    marginBottom: 8,
  },
  dateCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  selectedDateCircle: {
    backgroundColor: '#6C63FF',
  },
  dateText: {
    color: '#FFF',
    fontSize: 14,
  },
  selectedDateText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  dateSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  dateTextLarge: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  calorieBox: {
    backgroundColor: '#FF3B30',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  calorieText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  macroText: {
    color: '#FFF',
    fontSize: 14,
  },
  mealSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#6C63FF',
    padding: 8,
    borderRadius: 8,
  },
});

export default DiaryUI;