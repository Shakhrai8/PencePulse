import React from 'react';
import {View, Text, Button, StyleSheet, processColor} from 'react-native';
import {useSelector} from 'react-redux';
import {LineChart} from 'react-native-charts-wrapper';

const HomeScreen = ({navigation}) => {
  const expenses = useSelector(state => state.expenses.expenses);
  const incomes = useSelector(state => state.expenses.incomes);

  const sortedExpenses = expenses.sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );
  const sortedIncomes = incomes.sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );

  const expenseValues = sortedExpenses.map(expense => ({
    y: parseFloat(expense.amount),
  }));
  const incomeValues = sortedIncomes.map(income => ({
    y: parseFloat(income.amount),
  }));

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>

      <LineChart
        style={styles.chart}
        data={{
          dataSets: [
            {
              label: 'Expenses',
              values: expenseValues,
              config: {
                color: processColor('red'),
              },
            },
            {
              label: 'Incomes',
              values: incomeValues,
              config: {
                color: processColor('green'),
              },
            },
          ],
        }}
        chartDescription={{text: 'Financial Overview'}}
        legend={{enabled: true}}
      />

      <Button
        title="Add Transaction"
        onPress={() => navigation.navigate('AddTransaction')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  chart: {
    flex: 1,
  },
});

export default HomeScreen;
