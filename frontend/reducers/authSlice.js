import {createSlice} from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';

const initialState = {
  token: null,
  userId: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      const decodedToken = jwt_decode(action.payload);
      state.userId = decodedToken.user_id;
    },
    logout: state => {
      state.token = null;
      state.userId = null;
    },
  },
});

export const {setToken, logout} = authSlice.actions;
export default authSlice.reducer;
