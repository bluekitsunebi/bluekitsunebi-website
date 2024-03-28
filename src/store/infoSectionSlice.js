import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
};

export const infoSectionSlice = createSlice({
  name: "infoSection",
  initialState,
  reducers: {
    setInfoSectionId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { setInfoSectionId } = infoSectionSlice.actions;

export default infoSectionSlice.reducer;
