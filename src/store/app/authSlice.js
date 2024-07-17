import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  // isAuthenticated: true,
  user: null,
  // {
    // id: number,
    // username: "",
    // password: ""
  // }
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
