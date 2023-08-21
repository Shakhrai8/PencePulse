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
      if (action.payload) {
        state.token = action.payload;
        const decodedToken = jwt_decode(action.payload);
        state.userId = decodedToken.user_id;
      } else {
        state.token = null;
        state.userId = null;
      }
    },
    logout: state => {
      state.token = null;
      state.userId = null;
    },
  },
});

export const {setToken, logout} = authSlice.actions;
export default authSlice.reducer;
