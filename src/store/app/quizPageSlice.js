import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizData: [],
};

export const quizPageSlice = createSlice({
  name: "quizPage",
  initialState,
  reducers: {
    setQuizData(state, action) {
      state.quizData = action.payload;
    },
  },
});

export const {
  setQuizData,
} = quizPageSlice.actions;
export default quizPageSlice.reducer;
