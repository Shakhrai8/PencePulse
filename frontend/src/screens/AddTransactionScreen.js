import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import sendExpense from '../apis/sendExpense';
import sendIncome from '../apis/sendIncome';
import CustomPicker from '../components/customPicker';
import categories from '../components/categories';

const AddTransactionScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const userId = useSelector(state => state.auth.userId);

  const [typePickerVisible, setTypePickerVisible] = useState(false);
  const [categoryPickerVisible, setCategoryPickerVisible] = useState(false);

  const openTypePicker = () => setTypePickerVisible(true);
  const closeTypePicker = () => setTypePickerVisible(false);

  const openCategoryPicker = () => setCategoryPickerVisible(true);
  const closeCategoryPicker = () => setCategoryPickerVisible(false);

  const submitTransaction = async values => {
    try {
      const transactionData = {...values, userId};

      if (transactionData.type === 'Expense') {
        await sendExpense(transactionData, token);
      } else if (transactionData.type === 'Income') {
        await sendIncome(transactionData, token);
      }

      navigation.navigate('Home');
    } catch (error) {
      console.error('Error submitting transaction:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Text style={styles.heading}>New Transaction</Text>
        <Formik
          initialValues={{
            title: '',
            amount: '',
            type: 'Expense',
            category: 'Others',
          }}
          onSubmit={submitTransaction}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <View style={styles.formContainer}>
              <TextInput
                style={styles.input}
                name="title"
                placeholder="Title"
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                value={values.title}
                testID="title-input"
              />
              <TextInput
                style={styles.input}
                name="amount"
                placeholder="Amount"
                onChangeText={handleChange('amount')}
                onBlur={handleBlur('amount')}
                value={values.amount}
                keyboardType="numeric"
                testID="amount-input"
              />
              <TouchableOpacity
                onPress={openTypePicker}
                style={[styles.input, styles.pickerButton]}>
                <Text>{values.type}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={openCategoryPicker}
                style={[styles.input, styles.pickerButton]}>
                <Text>{values.category}</Text>
              </TouchableOpacity>
              <Button title="Submit" onPress={handleSubmit} />
              <CustomPicker
                visible={typePickerVisible}
                items={[
                  {label: 'Expense', value: 'Expense'},
                  {label: 'Income', value: 'Income'},
                ]}
                selectedItem={values.type}
                onSelect={item => {
                  handleChange('type')(item.value);
                  closeTypePicker();
                }}
                onClose={closeTypePicker}
              />
              <CustomPicker
                visible={categoryPickerVisible}
                items={categories}
                selectedItem={values.category}
                onSelect={item => {
                  handleChange('category')(item.value);
                  closeCategoryPicker();
                }}
                onClose={closeCategoryPicker}
              />
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 20,
    borderRadius: 10,
  },
  input: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  pickerButton: {
    justifyContent: 'center',
  },
  scrollViewContainer: {
    flexGrow: 1,
    backgroundColor: '#F5FCFF',
    padding: 20,
  },
});

export default AddTransactionScreen;
