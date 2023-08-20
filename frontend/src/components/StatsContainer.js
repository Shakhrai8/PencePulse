import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const StatsContainer = ({
  totalExpenses,
  totalIncomes,
  largestExpense,
  largestIncome,
  averageMonthlyExpense,
  averageMonthlyIncome,
  mostFrequentCategory,
}) => (
  <View style={styles.statsContainer}>
    <Text style={styles.statHeader}>Statistics</Text>
    <Text style={styles.statText}>
      Total Expenses: ${totalExpenses.toFixed(2)}
    </Text>
    <Text style={styles.statText}>
      Total Incomes: ${totalIncomes.toFixed(2)}
    </Text>
    <Text style={styles.statText}>
      Largest Expense: {largestExpense.title || 'N/A'} - $
      {(largestExpense.amount || 0).toFixed(2)}
    </Text>
    <Text style={styles.statText}>
      Largest Income: {largestIncome.title || 'N/A'} - $
      {(largestIncome.amount || 0).toFixed(2)}
    </Text>
    <Text style={styles.statText}>
      Average Monthly Expense: ${averageMonthlyExpense.toFixed(2)}
    </Text>
    <Text style={styles.statText}>
      Average Monthly Income: ${averageMonthlyIncome.toFixed(2)}
    </Text>
    <Text style={styles.statText}>
      Most Frequent Expense Category: {mostFrequentCategory}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  statsContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  statHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  statText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default StatsContainer;
