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
  firstWrongQuestion: {
    set: 0,
    type: "",
    wordIndex: 0,
  },
  answered: false,
  retry: false,
  retryQuestions: 0,
  currentWrongQuestion: 0,
};

export const quizPageSlice = createSlice({
  name: "quizPage",
  initialState,
  reducers: {
    setQuizData(state, action) {
      state.quizData = action.payload;
      console.log("quizData: ", action.payload);
    },
    setCurrentType(state, action) {
      state.current.type = action.payload;
    },
    setRetryQuestions(state, action) {
      state.retryQuestions = action.payload;
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
          if (!state.firstWrongQuestion.type) {
            state.firstWrongQuestion = {
              set: state.current.set,
              type: state.current.type,
              wordIndex: state.current.wordIndex,
            };
          }
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
        if (!state.firstWrongQuestion.type) {
          state.firstWrongQuestion = {
            set: state.current.set,
            type: state.current.type,
            wordIndex: state.current.wordIndex,
          };
        }
      }
    },
    setAnswered(state, action) {
      state.answered = action.payload;
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
    nextWrongQuestion(state) {
      let goToNextQuestion = true;

      const nextQuestion = () => {
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
        if (state.current.set <= state.quizData.length - 1) {
          goToNextQuestion = questionWasAnswered();
        } else {
          goToNextQuestion = false;
        }
      };

      const questionWasAnswered = () => {
        if (state.current.type === "wordQuestions") {
          if (
            !state.quizData[state.current.set].wordQuestions[
              state.current.wordIndex
            ].userInput.value
          ) {
            return false;
          } else return true;
        } else if (state.current.type === "kanjiQuestion") {
          if (
            !state.quizData[state.current.set].kanjiQuestion.options.some(
              (option) => option.isSelected
            )
          ) {
            return false;
          } else return true;
        } else return null;
      };

      while (
        goToNextQuestion &&
        state.current.set <= state.quizData.length - 1
      ) {
        nextQuestion();
      }
      
      state.currentWrongQuestion += 1;
    },
    retryQuiz(state) {
      state.retry = true;
      state.quizData.forEach((set, setIndex) => {
        set.kanjiQuestion.options.forEach((option, optionIndex) => {
          if (option.isSelected && !option.isCorrect) {
            state.quizData[setIndex].kanjiQuestion.options[
              optionIndex
            ].isSelected = false;
          }
        });
        set.wordQuestions.forEach((wordQuestion, wordQuestionIndex) => {
          if (
            wordQuestion.userInput.value &&
            !wordQuestion.userInput.isCorrect
          ) {
            state.quizData[setIndex].wordQuestions[
              wordQuestionIndex
            ].userInput.value = "";
            state.quizData[setIndex].wordQuestions[
              wordQuestionIndex
            ].userInput.isCorrect = null;
          }
        });
      });
      state.lastWrongQuestion = {
        set: 0,
        type: "",
        wordIndex: 0,
      };
      state.answered = false;
      state.retryQuestions = state.score.wrongAnswers;
      state.currentWrongQuestion = 0;
      state.score.wrongAnswers = 0;
      state.current = {
        set: state.firstWrongQuestion.set,
        type: state.firstWrongQuestion.type,
        wordIndex: state.firstWrongQuestion.wordIndex,
      };
      state.firstWrongQuestion = {
        set: 0,
        type: "",
        wordIndex: 0,
      };
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
      state.lastWrongQuestion = {
        set: 0,
        type: "",
        wordIndex: 0,
      };
      state.firstWrongQuestion = {
        set: 0,
        type: "",
        wordIndex: 0,
      };
      state.answered = false;
      state.retry = false;
      state.retryQuestions = 0;
      state.currentWrongQuestion = 0;
    },
  },
});

export const {
  setQuizData,
  setCurrentType,
  setRetryQuestions,
  selectOption,
  setWordReading,
  checkReading,
  setAnswered,
  nextQuestion,
  nextWrongQuestion,
  retryQuiz,
  resetQuiz,
} = quizPageSlice.actions;
export default quizPageSlice.reducer;
