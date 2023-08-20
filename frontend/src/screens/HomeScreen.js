import React, {useEffect} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
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
} from 'victory-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

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
    y: monthlyIncomes[index].y - expense.y,
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
      <VictoryChart domainPadding={20} animate={{duration: 500}}>
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
      style={{
        labels: {fontSize: 8, padding: 5},
      }}
      labelRadius={70}
      labelPlacement="parallel"
    />
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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Financial Overview</Text>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
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
    padding: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default HomeScreen;
