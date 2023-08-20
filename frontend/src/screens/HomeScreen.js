import React, {useEffect} from 'react';
import {View, Text, Button, StyleSheet, ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import fetchTransactions from '../components/fetchTransactions';
import {
  fetchTransactionBegin,
  fetchTransactionSuccess,
  fetchTransactionError,
} from '../../reducers/transactionsSlice';
import {
  VictoryBar,
  VictoryPie,
  VictoryAxis,
  VictoryChart,
  VictoryGroup,
  VictoryLabel,
  VictoryTheme,
} from 'victory-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const userId = useSelector(state => state.auth.userId);
  const transactions =
    useSelector(state => state.transaction.transactions) || [];

  const loading = useSelector(state => state.transaction.loading);

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
      const date = new Date(transaction.date);
      const monthYearKey = `${date.toLocaleDateString('default', {
        month: 'short',
      })}-${date.getFullYear()}`;

      if (!monthlyTotals[monthYearKey]) {
        monthlyTotals[monthYearKey] = {label: monthYearKey, y: 0};
      }

      monthlyTotals[monthYearKey].y += transaction.amount;
    });

    return Object.values(monthlyTotals).sort(
      (a, b) => new Date('01-' + a.label) - new Date('01-' + b.label),
    );
  };

  const getCategoryTotals = transactions => {
    const categoryTotals = {};

    transactions.forEach(transaction => {
      const category = transaction.category || 'Others';

      if (!categoryTotals[category]) {
        categoryTotals[category] = {label: category, value: 0};
      }

      categoryTotals[category].value += transaction.amount;
    });

    return Object.values(categoryTotals);
  };

  const monthlyExpenses = getMonthlyTotals(expenses);
  const monthlyIncomes = getMonthlyTotals(incomes);
  const categoryExpenses = getCategoryTotals(expenses);

  const monthlyBalance = monthlyExpenses.map((expense, index) => ({
    label: expense.label,
    y: (monthlyIncomes[index] ? monthlyIncomes[index].y : 0) - expense.y,
  }));

  const MonthlyOverview = () => {
    const maxExpenseValue = Math.max(...monthlyExpenses.map(item => item.y));
    const maxIncomeValue = Math.max(...monthlyIncomes.map(item => item.y));
    const maxBalanceValue = Math.max(...monthlyBalance.map(item => item.y));
    const maxYValue = Math.max(
      maxExpenseValue,
      maxIncomeValue,
      maxBalanceValue,
    );

    const generateTickValues = maxValue => {
      const tickValues = [];
      for (let i = 500; i <= maxValue; i += 500) {
        tickValues.push(i);
      }
      return tickValues;
    };

    return (
      <VictoryChart
        domainPadding={{x: 60}}
        animate={{duration: 500}}
        height={300}>
        <VictoryAxis
          dependentAxis
          tickValues={generateTickValues(maxYValue)}
          tickFormat={tick => `$${tick}`}
        />
        <VictoryAxis
          tickValues={monthlyExpenses.map(entry => entry.label)}
          tickFormat={monthlyExpenses.map(entry => entry.label)}
          style={{
            tickLabels: {
              fontSize: 10,
              padding: 5,
              angle: 45,
              textAnchor: 'start',
            },
          }}
        />
        <VictoryGroup offset={20}>
          <VictoryBar
            data={monthlyExpenses}
            x="label"
            y="y"
            style={{data: {fill: '#E57373', width: 15}}}
            labelComponent={<VictoryLabel text="" />}
          />
          <VictoryBar
            data={monthlyIncomes}
            x="label"
            y="y"
            style={{data: {fill: '#81C784', width: 15}}}
            labelComponent={<VictoryLabel text="" />}
          />
        </VictoryGroup>
      </VictoryChart>
    );
  };

  const ExpenseCategories = () => (
    <View style={styles.chartContainer}>
      <VictoryPie
        data={categoryExpenses}
        colorScale={[
          '#E57373',
          '#81C784',
          '#64B5F6',
          '#FFD54F',
          '#BA68C8',
          '#FF8A65',
        ]}
        x="label"
        y="value"
        animate={{duration: 500}}
        height={350}
        style={{
          labels: {
            fontSize: 14,
            padding: 12,
          },
        }}
        labelRadius={80}
        labelPlacement="parallel"
      />
    </View>
  );

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'monthly', title: 'Monthly Overview'},
    {key: 'categories', title: 'Expense Categories'},
  ]);

  const renderScene = SceneMap({
    monthly: MonthlyOverview,
    categories: ExpenseCategories,
  });

  let totalExpenses = 0;
  let totalIncomes = 0;
  let largestExpense = {};
  let largestIncome = {};
  let categoriesCount = {};

  for (let expense of expenses) {
    totalExpenses += expense.amount;

    if (!largestExpense.amount || expense.amount > largestExpense.amount) {
      largestExpense = expense;
    }

    if (!categoriesCount[expense.category]) {
      categoriesCount[expense.category] = 0;
    }
    categoriesCount[expense.category]++;
  }

  for (let income of incomes) {
    totalIncomes += income.amount;

    if (!largestIncome.amount || income.amount > largestIncome.amount) {
      largestIncome = income;
    }
  }

  let mostFrequentCategory;
  let highestCount = 0;

  for (let category in categoriesCount) {
    if (categoriesCount[category] > highestCount) {
      highestCount = categoriesCount[category];
      mostFrequentCategory = category;
    }
  }

  const averageMonthlyExpense = expenses.length
    ? totalExpenses / expenses.length
    : 0;
  const averageMonthlyIncome = incomes.length
    ? totalIncomes / incomes.length
    : 0;

  if (loading) {
    return <Text>Loading...</Text>;
  } else {
    return (
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
          <Text style={styles.header}>Financial Overview</Text>
          <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            style={{height: 400, marginBottom: 20}}
            initialLayout={{width: '100%'}}
            renderTabBar={props => (
              <TabBar
                {...props}
                style={{backgroundColor: '#F5FCFF', paddingTop: 10}}
                labelStyle={{fontSize: 14, fontWeight: 'bold'}}
                indicatorStyle={{backgroundColor: 'blue'}}
                activeColor="#000000"
                inactiveColor="#888888"
              />
            )}
          />
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

          <Button
            title="Add Transaction"
            onPress={() => navigation.navigate('AddTransaction')}
          />
        </View>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    backgroundColor: '#F5FCFF',
    padding: 20,
  },
  container: {
    // remove the flex: 1 here
    backgroundColor: '#F5FCFF',
    padding: 20,
  },
  tabViewContainer: {
    height: 600,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
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
  chartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
