import {createSlice} from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';

const initialState = {
  token: null,
  userId: null,
  username: null,
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
        state.username = null;
      }
    },
    logout: state => {
      state.token = null;
      state.userId = null;
      state.username = null;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const {setToken, logout, setUsername} = authSlice.actions;
export default authSlice.reducer;
