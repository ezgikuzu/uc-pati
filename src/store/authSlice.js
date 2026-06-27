import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  role: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.role = action.payload.role;

      state.user = {
        name: action.payload.name,
        email: action.payload.email,
        role: action.payload.role,
      };
    },

    logout: (state) => {
      state.isLoggedIn = false;
      state.role = null;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;