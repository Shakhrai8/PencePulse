import React from 'react';
import {View, Text, Button, StyleSheet, processColor} from 'react-native';
import {useSelector} from 'react-redux';
import {LineChart} from 'react-native-charts-wrapper';

const HomeScreen = ({navigation}) => {
  const transactions =
    useSelector(state => state.transaction.transactions) || [];

  const expenses = transactions.filter(
    transaction => transaction.type === 'expense',
  );
  const incomes = transactions.filter(
    transaction => transaction.type === 'income',
  );

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

  let dataSets = [];

  if (expenseValues.length) {
    dataSets.push({
      label: 'Expenses',
      values: expenseValues,
      config: {
        color: processColor('red'),
      },
    });
  }

  if (incomeValues.length) {
    dataSets.push({
      label: 'Incomes',
      values: incomeValues,
      config: {
        color: processColor('green'),
      },
    });
  }

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>

      {dataSets.length ? (
        <LineChart
          style={styles.chart}
          data={{dataSets}}
          chartDescription={{text: 'Financial Overview'}}
          legend={{enabled: true}}
        />
      ) : (
        <Text>No data available.</Text>
      )}

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
