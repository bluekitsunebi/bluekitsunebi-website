import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
  action: null, // study, quiz
  
  studyLevel: null, // N5->N1
  studyType: null, // vocabulary, kanji
  studyLesson: null, // [number]
  
  quizSettings: {
    N5: {
      kanjiLessons: [],
      vocabularyLessons: [], 
    },
    N4: {
      kanjiLessons: [],
      vocabularyLessons: [], 
    },
    N3: {
      kanjiLessons: [],
      vocabularyLessons: [], 
    },
    N2: {
      kanjiLessons: [],
      vocabularyLessons: [], 
    },
    N1: {
      kanjiLessons: [],
      vocabularyLessons: [], 
    },
  }, 
  
};

export const studySettingsSlice = createSlice({
  name: "studySettings",
  initialState,
  reducers: {
    setAction(state, action) {
      state.action = action.payload;
    },

    setStudyLevel(state, action) {
      state.studyLevel = action.payload;
    },
    setStudyType(state, action) {
      state.studyType = action.payload;
    },
    setStudyLesson(state, action) {
      state.studyLesson = action.payload;
    },

    setQuizSettings(state, action) {
      state.quizSettings = action.payload;
    }
  },
});

export const { setAction, setStudyLevel, setStudyType, setStudyLesson, setQuizSettings } = studySettingsSlice.actions;
export default studySettingsSlice.reducer;
