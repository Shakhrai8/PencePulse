import React from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { Formik, Field } from 'formik';
import { addExpense } from '../../reducers/expensesSlice';

const AddExpenseScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  return (
    <View>
      <Text>Add Expense Screen</Text>
      <Formik
        initialValues={{ title: '', amount: '' }}
        onSubmit={(values) => {
          dispatch(addExpense(values));
          navigation.goBack();
        }}
      >
        {({ handleSubmit }) => (
          <View>
            <Field name="title" placeholder="Title" />
            <Field name="amount" placeholder="Amount" />
            <Button title="Submit" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default AddExpenseScreen;
