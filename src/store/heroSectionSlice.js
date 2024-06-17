import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  heroSection__entered: false,
  backgroundLeft__entered: false,
  titleLeft__entered: false,
  descriptionLeft__entered: false,
  videosLoaded: false,
  halfAnimation: "middle",
};

export const heroSectionSlice = createSlice({
  name: "heroSection",
  initialState,
  reducers: {
    setHeroSection__entered: (state, action) => {
      state.heroSection__entered = action.payload;
    },
    setBackgroundLeft__entered: (state, action) => {
      state.backgroundLeft__entered = action.payload;
    },
    setTitleLeft__entered: (state, action) => {
      state.titleLeft__entered = action.payload;
    },
    setDescriptionLeft__entered: (state, action) => {
      state.descriptionLeft__entered = action.payload;
    },
    setVideosLoaded: (state, action) => {
      state.videosLoaded = action.payload;
    },
    setHalfAnimation: (state, action) => {
      state.halfAnimation = action.payload;
    },
  },
});

export const {
  setBackgroundLeft__entered,
  setTitleLeft__entered,
  setDescriptionLeft__entered,
  setHeroSection__entered,
  setVideosLoaded,
  setHalfAnimation,
} = heroSectionSlice.actions;

export default heroSectionSlice.reducer;
