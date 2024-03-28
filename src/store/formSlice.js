import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSend: false,
  isSending: false,
  accord: false,
  isFilling: false,
  recaptchaNeeded: false,
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setIsSend: (state, action) => {
      state.isSend = action.payload;
    },
    setIsSending: (state, action) => {
      state.isSending = action.payload;
    },
    setAccord: (state, action) => {
      state.accord = action.payload;
    },
    setIsFilling: (state, action) => {
      state.isFilling = action.payload;
    },
    setRecaptchaNeeded: (state, action) => {
      state.recaptchaNeeded = action.payload;
    },
  },
});

export const { setIsSend, setIsSending, setAccord, setIsFilling, setRecaptchaNeeded } = formSlice.actions;

export default formSlice.reducer;
// 
