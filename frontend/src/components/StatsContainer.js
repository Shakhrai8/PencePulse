import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'; // Import the Font Awesome 5 icon library

const StatContainer = ({title, description, value, icon}) => (
  <View style={styles.statContainer}>
    <View style={styles.iconContainer}>{icon}</View>
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
  averageYearlyIncome,
  averageYearlyExpense,
}) => (
  <View style={styles.container}>
    <StatContainer
      title="Total Expenses"
      description="You've spent a total of"
      value={`$${totalExpenses.toFixed(2)}`}
      icon={<Icon name="money-bill" size={30} color="#6a6a6a" />}
    />
    <StatContainer
      title="Total Incomes"
      description="You've earned a total of"
      value={`$${totalIncomes.toFixed(2)}`}
      icon={<Icon name="hand-holding-usd" size={30} color="#6a6a6a" />}
    />
    <StatContainer
      title="Largest Expense"
      description="Your highest expenditure was on"
      value={`$${(largestExpense.amount || 0).toFixed(2)} for ${
        largestExpense.title || 'N/A'
      }`}
      icon={<Icon name="chart-bar" size={30} color="#6a6a6a" />} // Bar chart icon
    />
    <StatContainer
      title="Largest Income"
      description="Your biggest earning was from"
      value={`$${(largestIncome.amount || 0).toFixed(2)} through ${
        largestIncome.title || 'N/A'
      }`}
      icon={<Icon name="money-check" size={30} color="#6a6a6a" />} // Money check icon
    />
    <StatContainer
      title="Average Yearly Expense"
      description="On average per year, you've spent"
      value={`$${averageYearlyExpense.toFixed(2)}`}
      icon={<Icon name="calendar-alt" size={30} color="#6a6a6a" />}
    />
    <StatContainer
      title="Average Yearly Income"
      description="On average per year, you've earned"
      value={`$${averageYearlyIncome.toFixed(2)}`}
      icon={<Icon name="calendar-alt" size={30} color="#6a6a6a" />}
    />
    <StatContainer
      title="Average Monthly Expense"
      description="Your typical monthly expenditure is around"
      value={`$${averageMonthlyExpense.toFixed(2)}`}
      icon={<Icon name="calendar-alt" size={30} color="#6a6a6a" />}
    />
    <StatContainer
      title="Average Monthly Income"
      description="On average per month, you've earned"
      value={`$${averageMonthlyIncome.toFixed(2)}`}
      icon={<Icon name="calendar-alt" size={30} color="#6a6a6a" />}
    />
    <StatContainer
      title="Popular Expense Category"
      description="The category you've spent the most on is"
      value={mostFrequentCategory}
      icon={<Icon name="tags" size={30} color="#6a6a6a" />}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
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
  iconContainer: {
    alignSelf: 'center',
    marginBottom: 10,
  },
});

export default StatsContainer;
