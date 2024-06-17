import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  height: undefined,
  yAxisPosition: undefined,
  id: "",
};

export const contactSectionSlice = createSlice({
  name: "contactSection",
  initialState,
  reducers: {
    setHeight: (state, action) => {
      state.height = action.payload;
    },
    setYaxisPosition: (state, action) => {
      state.yAxisPosition = action.payload;
    },
    setContactSectionId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { setHeight, setYaxisPosition, setContactSectionId } = contactSectionSlice.actions;

export default contactSectionSlice.reducer;
