import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  kanjiList: [],
  currentKanjiIndex: null,
  kanjiData: null,
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
    reset(state) {
      state.kanjiList = [];
      state.currentKanjiIndex = null;
      state.kanjiData = null;
    }
  },
});

export const {
  nextKanji,
  previousKanji,
  setKanjiList,
  setCurrentKanjiIndex,
  setKanjiData,
  reset,
} = studyPageSlice.actions;
export default studyPageSlice.reducer;
