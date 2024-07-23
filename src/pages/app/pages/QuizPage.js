import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import tw from "twin.macro";
import styled, { css } from "styled-components";
import Button from "../Button";
import { setPage } from "store/app/appSlice";
import {
  setQuizData,
  setCurrentType,
  selectOption,
  setWordReading,
  checkReading,
  setAnswered,
  nextQuestion,
  nextWrongQuestion,
  retryQuiz,
  resetQuiz,
} from "store/app/quizPageSlice";
import ConfettiComponent from "./quizPage/ConfettiComponent";

const BackButtonContainer = styled.div`
  ${tw`w-full mr-auto mb-5 sm:mb-8 flex flex-row
  justify-between`}
`;

const BackButton = styled.div`
  ${tw`w-fit`}
`;

const ScoreContainer = styled.div`
  ${tw`flex flex-col sm:flex-row gap-2 sm:gap-4 text-xl sm:text-2xl`}
`;

const CorrectAnswersScore = styled.div`
  ${tw`text-green-500`}
`;

const WrongAnswersScore = styled.div`
  ${tw`text-red-500`}
`;

const QuizPageContainer = styled.div`
  ${tw`w-full flex flex-col gap-2 sm:gap-5 sm:gap-10 items-center text-xl sm:text-3xl sm:my-auto
    justify-evenly`}
  height: calc(100vh - 8rem);
  @media (min-width: 640px) {
    height: auto;
  }
`;

const Card = styled.div`
  ${tw`flex flex-col gap-4 w-full h-full
      justify-evenly
      sm:h-fit sm:my-auto
      sm:bg-white sm:px-16 sm:py-16 sm:rounded-3xl sm:max-w-screen-lg
      sm:min-h-52r`}
`;

const ExerciseStatement = styled.div`
  ${tw`w-full flex flex-row justify-center`}
`;

const Symbols = styled.div`
  ${tw`font-thin text-gray-800
  w-full flex flex-row justify-center`}
  line-height: 90%;
  font-size: 8rem;
  @media (min-width: 640px) {
    font-size: 10rem;
  }
`;

const OptionsContainer = styled.div`
  ${tw`flex flex-col gap-1 sm:gap-5`}
`;

const Option = styled.div`
  ${tw`w-full py-2 px-4 border border-primary-500 border-2 rounded
  hover:bg-gray-200 cursor-pointer`}
  ${({ isSelected }) =>
    isSelected &&
    css`
      ${tw`text-white`}
    `}
  ${({ disabled }) =>
    disabled &&
    css`
      ${tw`pointer-events-none cursor-default`}
    `}
  ${({ disabled, isSelected, isCorrect }) =>
    isSelected && isCorrect
      ? css`
          ${tw`bg-green-500 border-green-500`}
        `
      : isSelected && !isCorrect
      ? css`
          ${tw`bg-red-500 border-red-500`}
        `
      : disabled &&
        !isSelected &&
        isCorrect &&
        css`
          ${tw`bg-green-500 border-green-500 text-white`}
        `}
`;

const FormContainer = styled.div`
  ${tw`w-full flex flex-col gap-2`}
`;

const Message = styled.div`
  ${tw`w-full flex flex-row justify-center text-3xl`}
  ${({ hide }) =>
    hide &&
    css`
      ${tw`opacity-0`}
    `}
`;

const Form = styled.form`
  ${tw`w-full mx-auto `}
  max-width: 31.5rem;
`;

const Input = styled.input`
  ${tw`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-3xl focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`}
  ${({ showAnswer }) =>
    showAnswer &&
    css`
      ${tw`pointer-events-none cursor-default text-white`}
    `}
${({ showAnswer, isCorrect }) =>
    showAnswer &&
    (isCorrect
      ? css`
          ${tw`border-green-500 bg-green-500`}
        `
      : css`
          ${tw`border-red-500 bg-red-500`}
        `)}
`;

const NextButtonContainer = styled.div`
  ${tw`w-full h-8`}
`;

const Title = styled.div`
  ${tw`mx-auto flex flex-col text-center gap-4`}
`;

const FinalScoreContainer = styled.div`
  ${tw`flex flex-col gap-2`}
  ${({ perfectScore }) =>
    perfectScore &&
    css`
      ${tw`mx-auto`}
    `}
`;

const FinalScore = styled.div`
  ${tw`flex flex-col`}
`;

const FinalScoreCorrectAnswers = styled.div`
  ${tw``}
  span {
    ${tw`text-green-500`}
  }
`;

const FinalScoreWrongAnswers = styled.div`
  ${tw``}
  span {
    ${tw`text-red-500`}
  }
`;

const ReviewContainer = styled.div`
  ${tw`flex flex-col gap-2`}
`;

const WrongQuestionsContainer = styled.div`
  ${tw`w-full border border-primary-100 rounded p-2 sm:px-8 sm:py-4 border-4
    overflow-y-auto h-80 min-h-80 bg-white
    flex flex-col`}

  scrollbar-gutter: stable;

  /* Custom scrollbar styles */
  &::-webkit-scrollbar {
    width: 12px; /* Width of the scrollbar */
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    width: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #8bd1ff;
    border-radius: 20px;
    border: 3px solid transparent;
    background-clip: content-box;
  }
`;

const KanjiQuestion = styled.div`
  ${tw`flex flex-col`}
`;

const WordQuestion = styled.div`
  ${tw`flex flex-col`}
`;

const QuestionItem = styled.div`
  ${tw`flex flex-row gap-2`}
`;

const Correct = styled.div`
  ${tw`text-green-500`}
`;

const Wrong = styled.div`
  ${tw`text-red-500`}
`;

const Divider = styled.div`
  ${tw`w-full bg-gray-300 rounded my-4`}
  height: 4px;
`;

const RetryButtonContainer = styled.div`
  ${tw`w-fit mx-auto`}
`;

const ConfettiContainer = styled.div`
  ${tw`flex flex-col`}
`;

const QuizPage = () => {
  const dispatch = useDispatch();
  const database = useSelector((state) => state.database.database);
  const level = useSelector((state) => state.studySettings.studyLevel);
  const lessonId = useSelector((state) => state.studySettings.studyLesson);
  const quizData = useSelector((state) => state.quizPage.quizData);
  const current = useSelector((state) => state.quizPage.current);
  const score = useSelector((state) => state.quizPage.score);
  const lastWrongQuestion = useSelector(
    (state) => state.quizPage.lastWrongQuestion
  );
  const answered = useSelector((state) => state.quizPage.answered);
  const retry = useSelector((state) => state.quizPage.retry);
  const inputRef = useRef(null);

  const getQuizData = async () => {
    if (level && lessonId) {
      try {
        const query = `
          SELECT 
            kl.id_kanji, 
            k.kanji,
            k.meanings,
            '[' || GROUP_CONCAT(
              json_object(
              'id', kl.id_word,
              'word', w.word,
              'kana_reading', w.kana_reading,
              'romaji_reading', w.romaji_reading
              )
            ) || ']' AS words
          FROM 
            kanji_lessons kl
          JOIN 
            kanjis k ON kl.id_kanji = k.id
          JOIN 
            words w ON kl.id_word = w.id
          WHERE 
            kl.level = "${level}" AND 
            kl.id_lesson = ${lessonId}
          GROUP BY 
            kl.id_kanji, 
            kl.level, 
            kl.id_lesson, 
            k.kanji, 
            k.meanings;
        `;
        const stmt = database.prepare(query);
        let quizData = [];
        let originalData = [];
        while (stmt.step()) {
          let row = stmt.getAsObject();
          row.meanings = JSON.parse(row.meanings).slice(0, 3);
          // TO DO
          // let words = JSON.parse(row.words).slice(0, 5);
          let words = JSON.parse(row.words).slice(0, 1);
          words.sort(() => Math.random() - 0.5);
          row.words = words.slice(0, 3);
          originalData.push(row);
        }
        stmt.free();

        // TO DO
        // for (let i = 0; i < originalData.length; i++) {
        for (let i = 0; i < 1; i++) {
          let questionsSet = {
            kanjiQuestion: null,
            wordQuestions: [],
          };
          questionsSet.kanjiQuestion = getKanjiQuestion(originalData, i);
          questionsSet.wordQuestions = getWordQuestions(originalData, i);
          quizData.push(questionsSet);
        }
        quizData.sort(() => Math.random() - 0.5);
        return quizData;
      } catch (error) {
        console.error(
          `Failed to load quiz data for ${level}, lesson ${lessonId} from database`,
          error
        );
      }
    } else return null;
  };

  const getKanjiQuestion = (originalData, i) => {
    let options = [];
    for (let j = 0; j < originalData.length; j++) {
      options.push({
        value: originalData[j].meanings,
        isCorrect: i === j,
        isSelected: false,
      });
    }

    options.sort(() => Math.random() - 0.5);

    let kanjiQuestion = {
      kanji: {
        id: originalData[i].id_kanji,
        kanji: originalData[i].kanji,
      },
      options: options,
    };
    return kanjiQuestion;
  };

  const getWordQuestions = (originalData, i) => {
    let wordQuestions = [];
    for (let j = 0; j < originalData[i].words.length; j++) {
      let wordQuestion = {
        word: originalData[i].words[j],
        userInput: {
          value: "",
          isCorrect: null,
        },
      };
      wordQuestions.push(wordQuestion);
    }
    wordQuestions.sort(() => Math.random() - 0.5);
    return wordQuestions;
  };

  useEffect(() => {
    const fetchQuizData = async () => {
      const data = await getQuizData();
      dispatch(setQuizData(data));
    };
    fetchQuizData();
    dispatch(setCurrentType("kanjiQuestion"));
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [current]);

  const handleWordReadingChange = (e) => {
    const value = e.target.value.replace(/\s+/g, "");
    dispatch(setWordReading(value));
  };

  const handleNextQuestion = () => {
    if (!retry) {
      dispatch(nextQuestion());
    } else {
      dispatch(nextWrongQuestion());
    }
    current.type === "wordQuestions" && dispatch(setAnswered(false));
  };

  useEffect(() => {
    const handleGlobalKeyPress = (e) => {
      if (e.key !== "Enter") return;
      let isDisabled = false;
      if (current.set > quizData.length - 1) {
        isDisabled = true;
      } else if (current.type === "kanjiQuestion") {
        isDisabled = !quizData[current.set]?.kanjiQuestion?.options.some(
          (opt) => opt.isSelected
        );
      } else if (current.type === "wordQuestions") {
        if (!answered) {
          e.preventDefault();
          if (
            quizData[current.set]?.wordQuestions[current.wordIndex].userInput
              .value
          ) {
            dispatch(checkReading());
            dispatch(setAnswered(true));
          }
          isDisabled = true;
        } else {
          isDisabled = false;
        }
      }

      if (!isDisabled) {
        e.preventDefault();
        handleNextQuestion();
      }
    };

    document.addEventListener("keydown", handleGlobalKeyPress);

    return () => {
      document.removeEventListener("keydown", handleGlobalKeyPress);
    };
  }, [current, answered, quizData]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.target.blur();
    }
  };

  const handleRetry = () => {
    dispatch(retryQuiz());
  };

  const handleBackToStudy = () => {
    dispatch(setPage("study"));
    dispatch(resetQuiz());
  };

  return (
    <>
      <BackButtonContainer>
        <BackButton>
          <Button onClick={() => handleBackToStudy()} full>
            Back
          </Button>
        </BackButton>
        {current.set <= quizData.length - 1 && (
          <ScoreContainer>
            <CorrectAnswersScore>
              Correct: {score.correctAnswers}
            </CorrectAnswersScore>
            <WrongAnswersScore>Wrong: {score.wrongAnswers}</WrongAnswersScore>
          </ScoreContainer>
        )}
      </BackButtonContainer>

      <QuizPageContainer>
        <Card>
          {quizData && current && score && (
            <>
              {current.set <= quizData.length - 1 ? (
                <>
                  <ExerciseStatement>
                    {current.type === "kanjiQuestion"
                      ? "Select the meaning of the kanji:"
                      : "Write the reading of the word:"}
                  </ExerciseStatement>
                  <Symbols>
                    {current.type === "kanjiQuestion"
                      ? quizData[current.set]?.kanjiQuestion?.kanji.kanji
                      : quizData[current.set]?.wordQuestions[current.wordIndex]
                          .word.word}
                  </Symbols>

                  {current.type === "kanjiQuestion" ? (
                    <OptionsContainer>
                      {quizData[current.set]?.kanjiQuestion?.options?.map(
                        (option, optionIndex) => (
                          <Option
                            key={"kanjiOption" + optionIndex}
                            isSelected={option.isSelected}
                            isCorrect={option.isCorrect}
                            disabled={quizData[
                              current.set
                            ]?.kanjiQuestion?.options.some(
                              (opt) => opt.isSelected
                            )}
                            onClick={() =>
                              dispatch(selectOption([optionIndex, option]))
                            }
                          >
                            {option?.value.join(", ")}
                          </Option>
                        )
                      )}
                    </OptionsContainer>
                  ) : (
                    <FormContainer>
                      {current.type === "wordQuestions" && (
                        <Message
                          hide={
                            !answered ||
                            quizData[current.set]?.wordQuestions[
                              current.wordIndex
                            ].userInput.isCorrect
                          }
                        >
                          The correct reading is:{" "}
                          {
                            quizData[current.set]?.wordQuestions[
                              current.wordIndex
                            ].word.kana_reading
                          }
                        </Message>
                      )}
                      <Form>
                        <Input
                          ref={inputRef}
                          type="text"
                          placeholder="reading"
                          value={
                            quizData[current.set]?.wordQuestions[
                              current.wordIndex
                            ].userInput.value
                          }
                          onChange={handleWordReadingChange}
                          isCorrect={
                            quizData[current.set]?.wordQuestions[
                              current.wordIndex
                            ].userInput.isCorrect
                          }
                          showAnswer={answered}
                          onKeyDown={handleKeyPress}
                        />
                      </Form>
                    </FormContainer>
                  )}
                  <NextButtonContainer>
                    {current.type === "kanjiQuestion" ||
                    (current.type === "wordQuestions" && answered) ? (
                      <Button
                        full
                        monochrome
                        onClick={() => handleNextQuestion()}
                        disabled={
                          current.type === "kanjiQuestion" &&
                          !quizData[current.set]?.kanjiQuestion?.options.some(
                            (opt) => opt.isSelected
                          )
                        }
                      >
                        Next
                      </Button>
                    ) : (
                      <Button
                        full
                        monochrome
                        disabled={
                          !quizData[current.set]?.wordQuestions[
                            current.wordIndex
                          ].userInput.value
                        }
                        onClick={() => {
                          dispatch(checkReading());
                          dispatch(setAnswered(true));
                        }}
                      >
                        Check
                      </Button>
                    )}
                  </NextButtonContainer>
                </>
              ) : (
                <>
                  <Title>
                    <div>Quiz ended</div>
                    {score.wrongAnswers === 0 && (
                      <ConfettiContainer>
                        <div>Congratulations!</div>
                        <ConfettiComponent />
                      </ConfettiContainer>
                    )}
                  </Title>
                  <FinalScoreContainer perfectScore={score.wrongAnswers === 0}>
                    <div>Your result</div>
                    <FinalScore>
                      <FinalScoreCorrectAnswers>
                        Correct answers: <span>{score.correctAnswers}</span>
                      </FinalScoreCorrectAnswers>
                      <FinalScoreWrongAnswers>
                        Wrong answers: <span>{score.wrongAnswers}</span>
                      </FinalScoreWrongAnswers>
                    </FinalScore>
                  </FinalScoreContainer>
                  {score.wrongAnswers !== 0 && (
                    <ReviewContainer>
                      <div>Review wrong answers</div>
                      <WrongQuestionsContainer>
                        {quizData.map((set, setIndex) => (
                          <React.Fragment key={`set-${setIndex}`}>
                            {set.kanjiQuestion.options.some(
                              (option) =>
                                option.isSelected === true &&
                                option.isCorrect === false
                            ) && (
                              <KanjiQuestion key={"kanjiQuestion" + setIndex}>
                                <QuestionItem>
                                  kanji: {set.kanjiQuestion.kanji.kanji}
                                </QuestionItem>

                                <QuestionItem>
                                  meaning:{" "}
                                  <Correct>
                                    {set.kanjiQuestion.options
                                      .find(
                                        (option) => option.isCorrect === true
                                      )
                                      .value.join(", ")}
                                  </Correct>
                                </QuestionItem>

                                <QuestionItem>
                                  your answer:{" "}
                                  <Wrong>
                                    {set.kanjiQuestion.options
                                      .find(
                                        (option) => option.isSelected === true
                                      )
                                      .value.join(", ")}
                                  </Wrong>
                                </QuestionItem>
                                {!(
                                  lastWrongQuestion.set === setIndex &&
                                  lastWrongQuestion.type === "kanjiQuestion"
                                ) && <Divider></Divider>}
                              </KanjiQuestion>
                            )}

                            {set.wordQuestions.map(
                              (wordQuestion, wordIndex) =>
                                !wordQuestion.userInput.isCorrect && (
                                  <WordQuestion
                                    key={"wordQuestion" + setIndex + wordIndex}
                                  >
                                    <QuestionItem>
                                      word: {wordQuestion.word.word}
                                    </QuestionItem>
                                    <QuestionItem>
                                      reading:{" "}
                                      <Correct>
                                        {wordQuestion.word.kana_reading}
                                      </Correct>
                                    </QuestionItem>
                                    <QuestionItem>
                                      your answer:{" "}
                                      <Wrong>
                                        {wordQuestion.userInput.value}
                                      </Wrong>
                                    </QuestionItem>
                                    {!(
                                      lastWrongQuestion.set === setIndex &&
                                      lastWrongQuestion.type ===
                                        "wordQuestions" &&
                                      lastWrongQuestion.wordIndex === wordIndex
                                    ) && <Divider></Divider>}
                                  </WordQuestion>
                                )
                            )}
                          </React.Fragment>
                        ))}
                      </WrongQuestionsContainer>
                    </ReviewContainer>
                  )}
                  {score.wrongAnswers !== 0 && (
                    <RetryButtonContainer>
                      <Button onClick={() => handleRetry()} full>
                        Retry wrong questions
                      </Button>
                    </RetryButtonContainer>
                  )}
                </>
              )}
            </>
          )}
        </Card>
      </QuizPageContainer>
    </>
  );
};

export default QuizPage;
