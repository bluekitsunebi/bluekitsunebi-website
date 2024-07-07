import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: "auth", // auth, settings, 
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
  },
});

export const { setPage } = appSlice.actions;
export default appSlice.reducer;
