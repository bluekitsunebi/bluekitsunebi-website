import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  height: undefined,
  yAxisPosition: undefined,
};

export const aboutSectionSlice = createSlice({
  name: "aboutSection",
  initialState,
  reducers: {
    setAboutSectionId: (state, action) => {
      state.id = action.payload;
    },
    setHeight: (state, action) => {
      state.height = action.payload;
    },
    setYaxisPosition: (state, action) => {
      state.yAxisPosition = action.payload;
    },
  },
});

export const { setHeight, setYaxisPosition, setAboutSectionId } = aboutSectionSlice.actions;

export default aboutSectionSlice.reducer;
