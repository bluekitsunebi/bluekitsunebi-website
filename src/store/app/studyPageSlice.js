import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  kanjiList: [],
  currentKanjiIndex: null,
  kanjiData: null,
  wordsData: null,
  startQuizLoading: false,
};

export const studyPageSlice = createSlice({
  name: "studyPage",
  initialState,
  reducers: {
    setKanjiList(state, action) {
      state.kanjiList = action.payload;
    },
    setCurrentKanjiIndex(state, action) {
      state.currentKanjiIndex = action.payload;
    },
    setKanjiData(state, action) {
      state.kanjiData = action.payload;
    },
    setWordsData(state, action) {
      state.wordsData = action.payload;
    },
    reset(state, action) {
      const type = action.payload;
      if (type === "kanji") {
        state.kanjiList = [];
        state.currentKanjiIndex = null;
        state.kanjiData = null;
      } else if (type === "vocabulary") {
        state.wordsData = null;
      }
    },
    setStartQuizLoading(state, action) {
      state.startQuizLoading = action.payload;
    },
  },
});

export const {
  nextKanji,
  previousKanji,
  setKanjiList,
  setCurrentKanjiIndex,
  setKanjiData,
  reset,
  setWordsData,
  setStartQuizLoading,
} = studyPageSlice.actions;
export default studyPageSlice.reducer;
