import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  database: null,
};

export const databaseSlice = createSlice({
  name: "database",
  initialState,
  reducers: {
    setDatabase(state, action) {
      state.database = action.payload;
    },
  },
});

export const { setDatabase } = databaseSlice.actions;
export default databaseSlice.reducer;
