import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  studyLevel: null, // "N5"->"N1"
  subject: null, // "kanji", "vocabulary"
  level: null, // "N5"-> studyLevel
  lesson: null, // 1 -> n
};

export const studySlice = createSlice({
  name: "study",
  initialState,
  reducers: {
    setStudyLevel(state, action) {
      state.studyLevel = action.payload;
    },
    setSubject(state, action) {
        state.subject = action.payload;
    },
    setLevel(state, action) {
      state.level = action.payload;
    },
    setLesson(state, action) {
      state.lesson = action.payload;
    },
  },
});

export const { setStudyLevel, setSubject, setLevel, setLesson } = studySlice.actions;
export default studySlice.reducer;
