import React, {useEffect} from 'react';
import {View, Text, Button, StyleSheet, processColor} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {BarChart, PieChart} from 'react-native-charts-wrapper';
import fetchTransactions from '../components/fetchTransactions';
import {
  fetchTransactionBegin,
  fetchTransactionSuccess,
  fetchTransactionError,
} from '../../reducers/transactionsSlice';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const userId = useSelector(state => state.auth.userId);
  const transactions =
    useSelector(state => state.transaction.transactions) || [];

  useEffect(() => {
    const getTransactions = async () => {
      try {
        dispatch(fetchTransactionBegin());
        const fetchedTransactions = await fetchTransactions(token, userId);
        dispatch(fetchTransactionSuccess(fetchedTransactions));
      } catch (error) {
        dispatch(fetchTransactionError(error.toString()));
      }
    };
    getTransactions();
  }, [dispatch, token, userId]);

  const expenses = transactions.filter(
    transaction => transaction.type === 'expense',
  );
  const incomes = transactions.filter(
    transaction => transaction.type === 'income',
  );

  const getMonthlyTotals = transactions => {
    const monthlyTotals = {};

    transactions.forEach(transaction => {
      const monthYear = new Date(transaction.date).toLocaleString('default', {
        month: 'short',
        year: 'numeric',
      });
      if (!monthlyTotals[monthYear]) {
        monthlyTotals[monthYear] = 0;
      }
      monthlyTotals[monthYear] += parseFloat(transaction.amount);
    });

    const labels = Object.keys(monthlyTotals);
    const values = Object.values(monthlyTotals).map(value => ({y: value}));

    return {labels, values};
  };

  const monthlyExpenses = getMonthlyTotals(expenses);
  const monthlyIncomes = getMonthlyTotals(incomes);

  const getCategoryTotals = transactions => {
    const categoryTotals = {};

    transactions.forEach(transaction => {
      const category = transaction.category;
      if (!categoryTotals[category]) {
        categoryTotals[category] = 0;
      }
      categoryTotals[category] += parseFloat(transaction.amount);
    });

    return Object.entries(categoryTotals).map(([label, value]) => ({
      value,
      label,
    }));
  };

  const categoryExpenses = getCategoryTotals(expenses);

  return (
    <View style={styles.container}>
      <Text>Financial Overview</Text>

      <Text>Monthly Overview</Text>
      <BarChart
        style={styles.chart}
        data={{
          labels: monthlyExpenses.labels,
          datasets: [
            {
              label: 'Expenses',
              values: monthlyExpenses.values,
              config: {
                color: processColor('red'),
              },
            },
            {
              label: 'Incomes',
              values: monthlyIncomes.values,
              config: {
                color: processColor('green'),
              },
            },
          ],
        }}
        legend={{enabled: true}}
      />

      <Text>Expense Categories</Text>
      <PieChart
        style={styles.chart}
        data={{
          dataSets: [
            {
              values: categoryExpenses,
              label: '',
              config: {
                colors: categoryExpenses.map(() =>
                  processColor(
                    '#' + ((Math.random() * 0xffffff) << 0).toString(16),
                  ),
                ),
              },
            },
          ],
        }}
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
    padding: 10,
  },
  chart: {
    flex: 1,
    marginTop: 15,
    height: 300,
    width: '100%',
  },
});

export default HomeScreen;
