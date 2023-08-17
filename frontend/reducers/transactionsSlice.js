import {createSlice} from '@reduxjs/toolkit';

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    transactions: [],
    loading: false,
    error: null,
  },
  reducers: {
    addTransaction: (state, action) => {
      state.transactions.push(action.payload);
    },
    fetchTransactionBegin: state => {
      state.loading = true;
      state.error = null;
    },
    fetchTransactionSuccess: (state, action) => {
      state.transactions = action.payload;
      state.loading = false;
    },
    fetchTransactionError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addTransaction,
  fetchTransactionBegin,
  fetchTransactionSuccess,
  fetchTransactionError,
} = transactionsSlice.actions;
export default transactionsSlice.reducer;
