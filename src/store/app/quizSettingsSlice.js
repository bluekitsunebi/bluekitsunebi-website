import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    responseQuizLessons: null,
    
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

export const quizSettingsSlice = createSlice({
    name: "quizSettings",
    initialState,
    reducers: {
        setResponseQuizLessons(state, action) {
            state.responseQuizLessons = action.payload;
        },
        setQuizSettings(state, action) {
            state.quizSettings = action.payload;
        },
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
    setResponseQuizLessons,
    setQuizSettings,
    levelDisplay,
    typeDisplay,
    selectLesson,
    selectType,
    selectLevel,
} = quizSettingsSlice.actions;
export default quizSettingsSlice.reducer;
