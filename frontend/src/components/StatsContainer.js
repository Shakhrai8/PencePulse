import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const StatContainer = ({title, description, value}) => (
  <View style={styles.statContainer}>
    <Text style={styles.statTitle}>{title}</Text>
    <Text style={styles.statDescription}>{description}</Text>
    <Text style={styles.statValue}>{value}</Text>
  </View>
);

const StatsContainer = ({
  totalExpenses,
  totalIncomes,
  largestExpense,
  largestIncome,
  averageMonthlyExpense,
  averageMonthlyIncome,
  mostFrequentCategory,
}) => (
  <>
    <StatContainer
      title="Total Expenses"
      description="Your cumulative expenses for this year amounted to:"
      value={`$${totalExpenses.toFixed(2)}`}
    />
    <StatContainer
      title="Total Incomes"
      description="Your total earnings for this year were:"
      value={`$${totalIncomes.toFixed(2)}`}
    />
    <StatContainer
      title="Largest Expense"
      description={`Your highest expenditure was on ${
        largestExpense.title || 'N/A'
      } and it was:`}
      value={`$${(largestExpense.amount || 0).toFixed(2)}`}
    />
    <StatContainer
      title="Largest Income"
      description={`Your biggest earning was from ${
        largestIncome.title || 'N/A'
      }:`}
      value={`$${(largestIncome.amount || 0).toFixed(2)}`}
    />
    <StatContainer
      title="Average Monthly Expense"
      description="Your typical monthly expenditure is around:"
      value={`$${averageMonthlyExpense.toFixed(2)}`}
    />
    <StatContainer
      title="Average Monthly Income"
      description="On average, every month, you've earned:"
      value={`$${averageMonthlyIncome.toFixed(2)}`}
    />
    <StatContainer
      title="Popular Expense Category"
      description="The category you've spent the most in is:"
      value={mostFrequentCategory}
    />
  </>
);

const styles = StyleSheet.create({
  statContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    marginBottom: 15,
  },
  statTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statDescription: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default StatsContainer;
