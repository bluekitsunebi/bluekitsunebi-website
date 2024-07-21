import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  quizData: [],
  score: {
    correctAnswers: 0,
    wrongAnswers: 0,
  },
  current: {
    set: 0,
    type: "", // kanjiQuestion, wordQuestions
    wordIndex: 0,
  },
  lastWrongQuestion: {
    set: 0,
    type: "",
    wordIndex: 0,
  },
};

export const quizPageSlice = createSlice({
  name: "quizPage",
  initialState,
  reducers: {
    setQuizData(state, action) {
      state.quizData = action.payload;
    },
    setCurrentType(state, action) {
      state.current.type = action.payload;
    },
    selectOption(state, action) {
      const [optionIndex, option] = [...action.payload];
      if (!option.isSelected) {
        state.quizData[state.current.set].kanjiQuestion.options.forEach(
          (opt, idx) => {
            if (idx !== optionIndex) {
              opt.isSelected = false;
            }
          }
        );
        state.quizData[state.current.set].kanjiQuestion.options[
          optionIndex
        ].isSelected = true;

        if (option.isCorrect) {
          state.score.correctAnswers += 1;
        } else {
          state.score.wrongAnswers += 1;
          state.lastWrongQuestion = {
            set: state.current.set,
            type: state.current.type,
            wordIndex: state.current.wordIndex,
          };
        }
      }
    },
    setWordReading(state, action) {
      state.quizData[state.current.set].wordQuestions[
        state.current.wordIndex
      ].userInput.value = action.payload;
    },
    checkReading(state) {
      const userInput =
        state.quizData[state.current.set].wordQuestions[state.current.wordIndex]
          .userInput.value;
      if (
        userInput ===
          state.quizData[state.current.set].wordQuestions[
            state.current.wordIndex
          ].word.kana_reading ||
        userInput ===
          state.quizData[state.current.set].wordQuestions[
            state.current.wordIndex
          ].word.romaji_reading
      ) {
        state.quizData[state.current.set].wordQuestions[
          state.current.wordIndex
        ].userInput.isCorrect = true;
        state.score.correctAnswers += 1;
      } else {
        state.quizData[state.current.set].wordQuestions[
          state.current.wordIndex
        ].userInput.isCorrect = false;
        state.score.wrongAnswers += 1;
        state.lastWrongQuestion = {
          set: state.current.set,
          type: state.current.type,
          wordIndex: state.current.wordIndex,
        };
      }
    },
    nextQuestion(state) {
      if (state.current.type === "kanjiQuestion") {
        state.current.wordIndex = 0;
        state.current.type = "wordQuestions";
      } else if (state.current.type === "wordQuestions") {
        if (
          state.current.wordIndex <
          state.quizData[state.current.set].wordQuestions.length - 1
        ) {
          state.current.wordIndex += 1;
        } else {
          state.current.type = "kanjiQuestion";
          state.current.set += 1;
        }
      }
    },
    resetQuiz(state) {
      state.quizData = [];
      state.score = {
        correctAnswers: 0,
        wrongAnswers: 0,
      };
      state.current = {
        set: 0,
        type: "",
        wordIndex: 0,
      };
    },
  },
});

export const {
  setQuizData,
  setCurrentType,
  selectOption,
  resetQuiz,
  checkReading,
  nextQuestion,
  setWordReading,
} = quizPageSlice.actions;
export default quizPageSlice.reducer;
