import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Initialize language thunk
export const initializeLanguage = createAsyncThunk(
  'websiteLanguage/initializeLanguage',
  async (_, { dispatch }) => {
    const userLanguages = navigator.languages;
    const storedLanguage = localStorage.getItem("language");

    // TO DO
    // if (storedLanguage === 'en' || storedLanguage === 'ja' || storedLanguage === 'ro') {
    //   dispatch(setLanguage(storedLanguage));
    // } else if (userLanguages.some(lang => lang.startsWith("ro") || lang.startsWith("mo"))) {
    //   dispatch(setLanguage("ro"));
    //   localStorage.setItem("language", "ro");
    // } else if (userLanguages[0].startsWith("ja")) {
    //   dispatch(setLanguage("ja"));
    //   localStorage.setItem("language", "ja");
    // } else {
    //   dispatch(setLanguage("en"));
    //   localStorage.setItem("language", "en");
    // }

    if (storedLanguage === 'en' || storedLanguage === 'ro') {
      dispatch(setLanguage(storedLanguage));
    } else if (userLanguages.some(lang => lang.startsWith("ro") || lang.startsWith("mo"))) {
      dispatch(setLanguage("ro"));
      localStorage.setItem("language", "ro");
    } else {
      dispatch(setLanguage("en"));
      localStorage.setItem("language", "en");
    }
  }
);

const initialState = {
  language: null, // en, ja, ro
};

export const websiteLanguageSlice = createSlice({
  name: "websiteLanguage",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      const newLanguage = action.payload;
      // TO BE DELETED
      if(newLanguage === 'ja') return;
      state.language = newLanguage;
      const storedLanguage = localStorage.getItem("language");
      if (storedLanguage !== newLanguage) {
        localStorage.setItem("language", newLanguage);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initializeLanguage.fulfilled, (state, action) => {
    });
  }
});

export const { setLanguage } = websiteLanguageSlice.actions;

export default websiteLanguageSlice.reducer;
