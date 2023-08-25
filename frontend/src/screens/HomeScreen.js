import React, {useEffect} from 'react';
import {View, Text, Button, StyleSheet, ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import fetchTransactions from '../apis/fetchTransactions';
import {
  fetchTransactionBegin,
  fetchTransactionSuccess,
  fetchTransactionError,
} from '../../reducers/transactionsSlice';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import StatsContainer from '../components/StatsContainer';
import MonthlyChart from '../components/MonthlyChart';
import ExpenseChart from '../components/ExpenseChart';
import {
  getMonthlyTotals,
  getCategoryTotals,
  calculateStatistics,
} from '../components/TransactionLogic';
import CustomNavbar from '../components/customNavbar';
import Logo from '../components/Logo';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const userId = useSelector(state => state.auth.userId);
  const transactions =
    useSelector(state => state.transaction.transactions) || [];

  const loading = useSelector(state => state.transaction.loading);
  const username = useSelector(state => state.auth.username);

  useEffect(() => {
    if (!token || !userId) return;

    const getTransactions = async () => {
      try {
        dispatch(fetchTransactionBegin());
        const fetchedTransactions = await fetchTransactions(token, userId);
        dispatch(fetchTransactionSuccess(fetchedTransactions));
      } catch (error) {
        dispatch(fetchTransactionError(error.toString()));
      }
    };

    const unsubscribeFocus = navigation.addListener('focus', getTransactions);

    getTransactions();
    return unsubscribeFocus;
  }, [dispatch, token, userId, navigation]);

  const expenses = transactions.filter(
    transaction => transaction.type === 'expense',
  );
  const incomes = transactions.filter(
    transaction => transaction.type === 'income',
  );

  const monthlyExpenses = getMonthlyTotals(expenses);
  const monthlyIncomes = getMonthlyTotals(incomes);
  const categoryExpenses = getCategoryTotals(expenses);

  const monthlyBalance = monthlyExpenses.map((expense, index) => ({
    label: expense.label,
    y: (monthlyIncomes[index] ? monthlyIncomes[index].y : 0) - expense.y,
  }));

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'monthly', title: 'Monthly Overview'},
    {key: 'categories', title: 'Expense Categories'},
  ]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'monthly':
        return (
          <MonthlyChart
            monthlyBalance={monthlyBalance}
            monthlyIncomes={monthlyIncomes}
            monthlyExpenses={monthlyExpenses}
          />
        );
      case 'categories':
        return <ExpenseChart categoryExpenses={categoryExpenses} />;
      default:
        return null;
    }
  };

  const stats = calculateStatistics(expenses, incomes);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Home',
      headerRight: () => <CustomNavbar navigation={navigation} />,
    });
  }, [navigation]);

  const currentTime = new Date().getHours();
  let greetingMessage = 'Welcome';

  if (currentTime >= 5 && currentTime < 12) {
    greetingMessage = 'Good morning';
  } else if (currentTime >= 12 && currentTime < 18) {
    greetingMessage = 'Good afternoon';
  } else {
    greetingMessage = 'Good evening';
  }

  let balanceColor = '#42b72a';
  if (stats.currentBalance < 0) {
    balanceColor = 'red';
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  } else {
    return (
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
          <Text style={styles.welcomeMessage}>
            {greetingMessage}, {username}!
          </Text>
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
          <Button
            title="Add Transaction"
            onPress={() => navigation.navigate('AddTransaction')}
          />
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceLabel}>Current Balance</Text>
            <Text style={[styles.currentBalance, {color: balanceColor}]}>
              ${stats.currentBalance.toFixed(2)}
            </Text>
          </View>

          <StatsContainer {...stats} balanceColor={balanceColor} />
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
  welcomeMessage: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  balanceContainer: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  currentBalance: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#555',
  },
});

export default HomeScreen;
