import React from 'react';
import { View, Text, Button } from 'react-native';
import { useSelector } from 'react-redux';

const HomeScreen = ({ navigation }) => {
  const expenses = useSelector((state) => state.expenses.expenses);

  return (
    <View>
      <Text>Home Screen</Text>
      {expenses.map((expense, index) => (
        <Text key={index}>{expense.title}</Text>
      ))}
      <Button
        title="Add Expense"
        onPress={() => navigation.navigate('AddExpense')}
      />
    </View>
  );
};

export default HomeScreen;
