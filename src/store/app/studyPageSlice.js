import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  kanjiList: [],
  currentKanjiIndex: null,
  kanjiData: null,
  // [
  //    {
  //        level: "",
  //        idLesson: null,
  //        idKanji: null,
  //        lessonDone: false,
  //    },
  // ]
};

export const studyPageSlice = createSlice({
  name: "studyPage",
  initialState,
  reducers: {
    nextKanji(state) {
      if (state.currentKanjiIndex !== kanjiList.length - 1) {
        state.currentKanjiIndex = state.currentKanjiIndex + 1;
      }
    },
    previousKanji(state) {
      if (state.currentKanjiIndex !== 0) {
        state.currentKanjiIndex = state.currentKanjiIndex - 1;
      }
    },
    setKanjiList(state, action) {
      state.kanjiList = action.payload;
    },
    setCurrentKanjiIndex(state, action) {
      state.currentKanjiIndex = action.payload;
    },
    setKanjiData(state, action) {
      state.kanjiData = action.payload;
    },
  },
});

export const {
  nextKanji,
  previousKanji,
  setKanjiList,
  setCurrentKanjiIndex,
  setKanjiData,
} = studyPageSlice.actions;
export default studyPageSlice.reducer;
