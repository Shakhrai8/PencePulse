import {configureStore} from '@reduxjs/toolkit';
import transactionsReducer from './reducers/transactionsSlice';
import authReducer from './reducers/authSlice';

const store = configureStore({
  reducer: {
    transaction: transactionsReducer,
    auth: authReducer,
  },
});

export default store;
