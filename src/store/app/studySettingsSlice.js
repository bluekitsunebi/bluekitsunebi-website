import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  levels: ["N5", "N4", "N3", "N2", "N1"],
  responseStudyKanjiLessons: {
    N5: [],
    N4: [],
    N3: [],
    N2: [],
    N1: [],
  },
  responseStudyVocabularyLessons: {
    N5: [],
    N4: [],
    N3: [],
    N2: [],
    N1: [],
  },
  action: null, // study, quiz
  studyLevel: null, // N5->N1
  studyType: null, // vocabulary, kanji
  studyLesson: null, // number
  studyKanji: null,
  // LessonSelector
  showAllKanjis: false,
  showAllLessons: false,
};

export const studySettingsSlice = createSlice({
  name: "studySettings",
  initialState,
  reducers: {
    //lessons
    setResponseStudyKanjiLessons(state, action) {
      state.responseStudyKanjiLessons = action.payload;
    },
    setResponseStudyVocabularyLessons(state, action) {
      state.responseStudyVocabularyLessons = action.payload;
    },

    //settings
    setAction(state, action) {
      state.action = action.payload;
    },
    // study
    setStudyLevel(state, action) {
      state.studyLevel = action.payload;
    },
    setStudyType(state, action) {
      state.studyType = action.payload;
      state.studyLesson = null;
      state.showAllLessons = true;
      if (action.payload === "vocabulary") {
        state.showAllKanjis = false;
        state.studyKanji = null;
      } else if (action.payload === "kanji") {
      }
    },
    setStudyLesson(state, action) {
      state.studyLesson = action.payload;
    },
    setStudyKanji(state, action) {
      state.studyKanji = action.payload;
    },
    // LessonSelector
    setShowAllKanjis(state, action) {
      state.showAllKanjis = action.payload;
    },
    setShowAllLessons(state, action) {
      state.showAllLessons = action.payload;
    },
  },
});

export const {
  // lessons
  setResponseStudyKanjiLessons,
  setResponseStudyVocabularyLessons,

  //settings
  setAction,
  // study
  setStudyLevel,
  setStudyType,
  setStudyLesson,
  setStudyKanji,
  // LessonSelector
  setShowAllKanjis,
  setShowAllLessons,
} = studySettingsSlice.actions;
export default studySettingsSlice.reducer;
