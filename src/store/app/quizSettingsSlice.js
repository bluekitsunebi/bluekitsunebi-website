import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    levels: ["N5", "N4", "N3", "N2", "N1"],
    responseQuizLessons: null,
    allSelected: false,
    allDeselected: true,
    allExpanded: false,
    allShrunk: true,

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

const updateAllSelected = (state) => {
    let allLessonsSelected = true;
    state.levels.forEach((lessonLevel) => {
        if (
            state.quizSettings[lessonLevel].kanji.lessons.length !== state.responseQuizLessons[lessonLevel].kanji.length
        ) {
            allLessonsSelected = false;
        }
        if (
            state.quizSettings[lessonLevel].vocabulary.lessons.length !== state.responseQuizLessons[lessonLevel].vocabulary.length
        ) {
            allLessonsSelected = false;
        }
    });
    state.allSelected = allLessonsSelected;
};

const updateAllDeselected = (state) => {
    let allLessonsDeselected = true;
    state.levels.forEach((lessonLevel) => {
        if (state.quizSettings[lessonLevel].kanji.lessons.length !== 0) {
            allLessonsDeselected = false;
        }
        if (state.quizSettings[lessonLevel].vocabulary.lessons.length !== 0) {
            allLessonsDeselected = false;
        }
    });
    state.allDeselected = allLessonsDeselected;
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
            const lessons = state.quizSettings[level][type].lessons;
            const lessonExists = lessons.some((obj) => obj.id === lesson.id);

            if (!lessonExists) {
                state.quizSettings[level][type].lessons.push(lesson);
            } else {
                state.quizSettings[level][type].lessons = lessons.filter(
                    (obj) => obj.id !== lesson.id
                );
            }
            updateAllSelected(state);
            updateAllDeselected(state);
        },

        selectType(state, action) {
            const { level, type, lessons } = action.payload;
            if (state.quizSettings[level][type].lessons.length === lessons.length) {
                state.quizSettings[level][type].lessons = [];
            } else {
                state.quizSettings[level][type].lessons = lessons;
            }
            updateAllSelected(state);
            updateAllDeselected(state);
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
            updateAllSelected(state);
            updateAllDeselected(state);
        },

        selectAll(state, action) {
            const lessons = action.payload;
            state.allSelected = true;
            state.allDeselected = false;
            state.levels.forEach(level => {
                state.quizSettings[level].kanji.lessons = [];
                state.quizSettings[level].vocabulary.lessons = [];
                lessons[level].kanji.forEach((lesson) => {
                    state.quizSettings[level].kanji.lessons.push(lesson);
                });
                lessons[level].vocabulary.forEach((lesson) => {
                    state.quizSettings[level].vocabulary.lessons.push(lesson);
                });
                state.quizSettings[level].expanded = true;
            });
        },
        deselectAll(state) {
            state.allDeselected = true;
            state.allSelected = false;
            state.levels.forEach(level => {
                state.quizSettings[level].expanded = false;
                state.quizSettings[level].kanji.expanded = false;
                state.quizSettings[level].vocabulary.expanded = false;
                state.quizSettings[level].kanji.lessons = [];
                state.quizSettings[level].vocabulary.lessons = [];
            });
        },
        // TO DO - show/hide all
        expandAll(state) {
            state.allExpanded = true;
            state.allShrunk = false;
            state.levels.forEach(level => {
                state.quizSettings[level].expanded = true;
                state.quizSettings[level].kanji.expanded = true;
                state.quizSettings[level].vocabulary.expanded = true;
            });
        },
        shrinkAll(state) {
            state.allShrunk = true;
            state.allExpanded = false;
            state.levels.forEach(level => {
                state.quizSettings[level].expanded = false;
                state.quizSettings[level].kanji.expanded = false;
                state.quizSettings[level].vocabulary.expanded = false;
            });
        }
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
    selectAll,
    deselectAll,
    expandAll,
    shrinkAll,
} = quizSettingsSlice.actions;
export default quizSettingsSlice.reducer;
