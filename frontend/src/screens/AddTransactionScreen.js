import React from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import {addTransaction} from '../../reducers/transactionsSlice';
import sendExpense from '../apis/sendExpense';
import sendIncome from '../apis/sendIncome';

const AddTransactionScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const userId = useSelector(state => state.auth.userId);

  const submitTransaction = async values => {
    try {
      const transactionData = {...values, userId};

      dispatch(addTransaction(transactionData));

      if (transactionData.type === 'expense') {
        await sendExpense(transactionData, token);
      } else if (transactionData.type === 'income') {
        await sendIncome(transactionData, token);
      }

      navigation.navigate('Home');
    } catch (error) {
      console.error('Error submitting transaction:', error);
    }
  };

  return (
    <View>
      <Text>New Transaction</Text>
      <Formik
        initialValues={{
          title: '',
          amount: '',
          type: 'expense',
          category: 'Others',
        }}
        onSubmit={submitTransaction}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <View>
            <TextInput
              name="title"
              placeholder="Title"
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              value={values.title}
            />
            <TextInput
              name="amount"
              placeholder="Amount"
              onChangeText={handleChange('amount')}
              onBlur={handleBlur('amount')}
              value={values.amount}
            />
            <Picker
              selectedValue={values.type}
              onValueChange={itemValue => handleChange('type')(itemValue)}>
              <Picker.Item label="Expense" value="expense" />
              <Picker.Item label="Income" value="income" />
            </Picker>
            <Picker
              selectedValue={values.category}
              onValueChange={itemValue => handleChange('category')(itemValue)}>
              <Picker.Item label="Others" value="Others" />
              <Picker.Item label="Groceries" value="Groceries" />
              <Picker.Item label="Utilities" value="Utilities" />
              <Picker.Item label="Dining Out" value="Dining Out" />
              <Picker.Item label="Entertainment" value="Entertainment" />
              <Picker.Item label="Healthcare" value="Healthcare" />
              <Picker.Item label="Transportation" value="Transportation" />
              <Picker.Item label="Rent/Mortgage" value="Rent/Mortgage" />
              <Picker.Item label="Clothing" value="Clothing" />
              <Picker.Item label="Electronics" value="Electronics" />
              <Picker.Item label="Travel" value="Travel" />
              <Picker.Item label="Education" value="Education" />
              <Picker.Item
                label="Gifts & Donations"
                value="Gifts & Donations"
              />
              <Picker.Item label="Fitness" value="Fitness" />
              <Picker.Item label="Personal Care" value="Personal Care" />
              <Picker.Item label="Pets" value="Pets" />
              <Picker.Item label="Investments" value="Investments" />
              <Picker.Item label="Insurance" value="Insurance" />
              <Picker.Item label="Taxes" value="Taxes" />
              <Picker.Item label="Subscriptions" value="Subscriptions" />
              <Picker.Item label="Home Maintenance" value="Home Maintenance" />
              <Picker.Item label="Debt Payment" value="Debt Payment" />
            </Picker>

            <Button title="Submit" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default AddTransactionScreen;
