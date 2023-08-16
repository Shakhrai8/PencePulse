import {configureStore} from '@reduxjs/toolkit';
import expensesReducer from './reducers/expensesSlice';

const store = configureStore({
  reducer: {
    expenses: expensesReducer,
  },
});

export default store;
