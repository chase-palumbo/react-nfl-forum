import { createSlice } from '@reduxjs/toolkit';

const initialState = { token: '', isAuthenticated: false };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      localStorage.setItem('token', state.token);
      localStorage.setItem('uid', action.payload.uid);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = '';
      localStorage.removeItem('token');
      localStorage.removeItem('uid');
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
