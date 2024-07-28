import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // study

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
  responseQuizLessons: [],

  action: null, // study, quiz

  studyLevel: null, // N5->N1
  studyType: null, // vocabulary, kanji
  studyLesson: null, // number
  studyKanji: null,
  // LessonSelector
  showAllKanjis: false,
  showAllLessons: false,

  // quiz

  quizSettings: {
    N5: {
      expanded: false,
      kanji: {
        expanded: false,
        lessons: [],
      },
      vocabulary: {
        expanded: false,
        lessons: [],
      },
    },
    N4: {
      expanded: false,
      kanji: {
        expanded: false,
        lessons: [],
      },
      vocabulary: {
        expanded: false,
        lessons: [],
      },
    },
    N3: {
      expanded: false,
      kanji: {
        expanded: false,
        lessons: [],
      },
      vocabulary: {
        expanded: false,
        lessons: [],
      },
    },
    N2: {
      expanded: false,
      kanji: {
        expanded: false,
        lessons: [],
      },
      vocabulary: {
        expanded: false,
        lessons: [],
      },
    },
    N1: {
      expanded: false,
      kanji: {
        expanded: false,
        lessons: [],
      },
      vocabulary: {
        expanded: false,
        lessons: [],
      },
    },
  },
};

export const studySettingsSlice = createSlice({
  name: "studySettings",
  initialState,
  reducers: {
    //lessons
    setResponseStudyKanjiLessons(state, action) {
      state.responseStudyKanjiLessons = action.payload;
      console.log("Kanji Lessons: ", state.responseStudyKanjiLessons);
    },
    setResponseStudyVocabularyLessons(state, action) {
      state.responseStudyVocabularyLessons = action.payload;
      console.log("Vocabulary Lessons: ", state.responseStudyVocabularyLessons);
    },
    setResponseQuizLessons(state, action) {
      state.responseQuizLessons = action.payload;
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
        // if(state.studyLesson) {
        //   state.studyLesson = null;
        // }
        console.log("studyLevel: ", state.studyLevel);
      } else if (action.payload === "kanji") {
        // if(state.studyLesson) {
        //   state.studyLesson = null;
        // }
      }
    },
    setStudyLesson(state, action) {
      state.studyLesson = action.payload;
    },
    setStudyKanji(state, action) {
      state.studyKanji = action.payload;
    },
    setQuizSettings(state, action) {
      state.quizSettings = action.payload;
    },
    // LessonSelector
    setShowAllKanjis(state, action) {
      state.showAllKanjis = action.payload;
    },
    setShowAllLessons(state, action) {
      state.showAllLessons = action.payload;
    },
    // quiz
    levelDisplay(state, action) {
      const level = action.payload;
      const isDisplayed = state.quizSettings[level].expanded;
      if (isDisplayed) {
        state.quizSettings[level].kanji.expanded = false;
        state.quizSettings[level].vocabulary.expanded = false;
      }
      state.quizSettings[level].expanded = !isDisplayed;
    },
    typeDisplay(state, action) {
      const { level, type } = action.payload;
      state.quizSettings[level][type].expanded =
        !state.quizSettings[level][type].expanded;
    },
    selectLesson(state, action) {
      const { level, type, lesson } = action.payload;
      let lessons = state.quizSettings[level][type].lessons;
      const lessonExists = lessons.some((obj) => obj.id === lesson.id);
      if (!lessonExists) {
        state.quizSettings[level][type].lessons.push(lesson);
      } else {
        state.quizSettings[level][type].lessons = lessons.filter(
          (obj) => obj.id !== lesson.id
        );
      }
    },
    selectType(state, action) {
      const { level, type, lessons } = action.payload;
      if (state.quizSettings[level][type].lessons.length === lessons.length) {
        state.quizSettings[level][type].lessons = [];
      } else {
        state.quizSettings[level][type].lessons = lessons;
      }
    },
    selectLevel(state, action) {
      const { level, kanjiLessons, vocabularyLessons } = action.payload;
      if (
        state.quizSettings[level].kanji.lessons.length ===
        kanjiLessons.length &&
        state.quizSettings[level].vocabulary.lessons.length ===
        vocabularyLessons.length
      ) {
        state.quizSettings[level].kanji.lessons = [];
        state.quizSettings[level].vocabulary.lessons = [];
      } else {
        state.quizSettings[level].kanji.lessons = kanjiLessons;
        state.quizSettings[level].vocabulary.lessons = vocabularyLessons;
      }
    },
  },
});

export const {
  // lessons
  setResponseStudyKanjiLessons,
  setResponseStudyVocabularyLessons,
  setResponseQuizLessons,

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
  // quiz
  setQuizSettings,
  levelDisplay,
  typeDisplay,
  selectLesson,
  selectType,
  selectLevel,
} = studySettingsSlice.actions;
export default studySettingsSlice.reducer;
