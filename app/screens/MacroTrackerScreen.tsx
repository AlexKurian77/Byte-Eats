import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PieChart } from 'react-native-chart-kit';

type TabType = 'CALORIES' | 'NUTRIENTS' | 'MACROS';

const MacroTrackerScreen = () => {
  const [activeTab, setActiveTab] = useState<TabType>('CALORIES');
  const [selectedDate, setSelectedDate] = useState('Today');

  const nutritionData = {
    calories: {
      total: 121,
      goal: 2880,
      meals: {
        breakfast: { percent: 100, calories: 121 },
        lunch: { percent: 0, calories: 0 },
        dinner: { percent: 0, calories: 0 },
        snacks: { percent: 0, calories: 0 },
      },
    },
    nutrients: {
      protein: { total: 2, goal: 144, unit: 'g' },
      carbs: { total: 27, goal: 360, unit: 'g' },
      fiber: { total: 0, goal: 38, unit: 'g' },
      sugar: { total: 0, goal: 108, unit: 'g' },
      fat: { total: 0, goal: 96, unit: 'g' },
    },
    macros: {
      carbs: { total: 27, percent: 91, goal: 50 },
      fat: { total: 1, percent: 2, goal: 30 },
      protein: { total: 3, percent: 7, goal: 20 },
    },
  };

  const renderCaloriesTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.pieContainer}>
        <PieChart
          data={[
            {
              name: 'Breakfast',
              population: nutritionData.calories.meals.breakfast.percent,
              color: '#4287f5',
            },
            {
              name: 'Remaining',
              population: 0,
              color: '#2C2C2E',
            },
          ]}
          width={300}
          height={200}
          chartConfig={{
            backgroundColor: '#000000',
            backgroundGradientFrom: '#000000',
            backgroundGradientTo: '#000000',
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="0"
          center={[0, 0]}
          absolute
        />
      </View>

      <View style={styles.mealsContainer}>
        {Object.entries(nutritionData.calories.meals).map(([meal, data]) => (
          <View key={meal} style={styles.mealRow}>
            <View style={[styles.mealDot, { backgroundColor: '#4287f5' }]} />
            <Text style={styles.mealText}>{meal.charAt(0).toUpperCase() + meal.slice(1)}</Text>
            <Text style={styles.mealCalories}>{data.calories} cal</Text>
          </View>
        ))}
      </View>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Calories</Text>
          <Text style={styles.summaryValue}>{nutritionData.calories.total}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Goal</Text>
          <Text style={styles.summaryValue}>{nutritionData.calories.goal}</Text>
        </View>
      </View>
    </View>
  );

  const renderNutrientsTab = () => (
    <ScrollView style={styles.tabContent}>
      <View style={styles.nutrientsContainer}>
        {Object.entries(nutritionData.nutrients).map(([nutrient, data]) => (
          <View key={nutrient} style={styles.nutrientRow}>
            <Text style={styles.nutrientLabel}>
              {nutrient.charAt(0).toUpperCase() + nutrient.slice(1)}
            </Text>
            <View style={styles.nutrientBarContainer}>
              <View 
                style={[
                  styles.nutrientBar, 
                  { width: `${(data.total / data.goal) * 100}%` }
                ]} 
              />
            </View>
            <View style={styles.nutrientValues}>
              <Text style={styles.nutrientTotal}>{data.total}</Text>
              <Text style={styles.nutrientGoal}>{data.goal} {data.unit}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );

  const renderMacrosTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.pieContainer}>
        <PieChart
          data={[
            {
              name: 'Carbs',
              population: nutritionData.macros.carbs.percent,
              color: '#00b894',
            },
            {
              name: 'Fat',
              population: nutritionData.macros.fat.percent,
              color: '#fd79a8',
            },
            {
              name: 'Protein',
              population: nutritionData.macros.protein.percent,
              color: '#ffeaa7',
            },
          ]}
          width={300}
          height={200}
          chartConfig={{
            backgroundColor: '#000000',
            backgroundGradientFrom: '#000000',
            backgroundGradientTo: '#000000',
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="0"
        />
      </View>

      <View style={styles.macrosLegend}>
        {Object.entries(nutritionData.macros).map(([macro, data]) => (
          <View key={macro} style={styles.macroRow}>
            <View style={styles.macroInfo}>
              <View 
                style={[
                  styles.macroDot, 
                  { 
                    backgroundColor: 
                      macro === 'carbs' ? '#00b894' : 
                      macro === 'fat' ? '#fd79a8' : '#ffeaa7' 
                  }
                ]} 
              />
              <Text style={styles.macroLabel}>
                {macro.charAt(0).toUpperCase() + macro.slice(1)} ({data.total}g)
              </Text>
            </View>
            <View style={styles.macroValues}>
              <Text style={styles.macroPercent}>{data.percent}%</Text>
              <Text style={styles.macroGoal}>Goal: {data.goal}%</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        
        <Text style={styles.headerTitle}>Meal & Nutrtion Tracking</Text>
        <View style={styles.headerIcons}>
          
          <TouchableOpacity style={styles.headerIcon}>
            <MaterialCommunityIcons name="cog-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tabs}>
        {(['CALORIES', 'NUTRIENTS', 'MACROS'] as TabType[]).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.dateSelector}>
        <TouchableOpacity>
          <MaterialCommunityIcons name="chevron-left" size={24} color="#fff" />
        </TouchableOpacity>
        <View>
          <Text style={styles.selectedDate}>{selectedDate}</Text>
        </View>
        <TouchableOpacity>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {activeTab === 'CALORIES' && renderCaloriesTab()}
      {activeTab === 'NUTRIENTS' && renderNutrientsTab()}
      {activeTab === 'MACROS' && renderMacrosTab()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,1)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(76,175,80,0.3)',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 0,
  },
  headerIcons: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  headerIcon: {
    marginLeft: 16,
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(76,175,80,0.3)',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#4caf50',
  },
  tabText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#4caf50',
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(76,175,80,0.3)',
  },
  dateLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    textAlign: 'center',
  },
  selectedDate: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  tabContent: {
    flex: 1,
    padding: 16,
  },
  pieContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  mealsContainer: {
    marginTop: 20,
  },
  mealRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  mealDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  mealText: {
    color: '#fff',
    flex: 1,
  },
  mealCalories: {
    color: 'rgba(255,255,255,0.6)',
  },
  summaryContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(76,175,80,0.3)',
    paddingTop: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    color: '#fff',
  },
  summaryValue: {
    color: '#4caf50',
    fontWeight: 'bold',
  },
  nutrientsContainer: {
    flex: 1,
  },
  nutrientRow: {
    marginBottom: 20,
  },
  nutrientLabel: {
    color: '#fff',
    marginBottom: 8,
  },
  nutrientBarContainer: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
  },
  nutrientBar: {
    height: '100%',
    backgroundColor: '#4caf50',
    borderRadius: 4,
  },
  nutrientValues: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  nutrientTotal: {
    color: '#4caf50',
  },
  nutrientGoal: {
    color: 'rgba(255,255,255,0.6)',
  },
  macrosLegend: {
    marginTop: 20,
  },
  macroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  macroInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  macroDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  macroLabel: {
    color: '#fff',
  },
  macroValues: {
    alignItems: 'flex-end',
  },
  macroPercent: {
    color: '#4caf50',
    fontWeight: 'bold',
  },
  macroGoal: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
  },
});

export default MacroTrackerScreen;