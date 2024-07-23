import React, { useEffect, useRef } from "react";
import tw from "twin.macro";
import styled, { css } from "styled-components";
import ProgressBar from "./ProgressBar";
import { useSelector, useDispatch } from "react-redux";
import { selectOption } from "store/app/quizPageSlice";
import Button from "../../Button";
import { checkReading, setAnswered, retryQuiz } from "store/app/quizPageSlice";
import FinalScoreContainer from "./FinalScoreContainer";
import ReviewContainer from "./ReviewContainer";
import RetryButtonContainer from "./RetryButtonContainer";
import ConfettiComponent from "./ConfettiComponent";

const Card = styled.div`
  ${tw`flex flex-col justify-between h-full w-full sm:h-fit sm:my-auto sm:bg-white sm:px-16 sm:py-8 sm:rounded-3xl sm:max-w-screen-lg sm:min-h-52r`}
`;

const CardContent = styled.div`
  ${tw`flex flex-col gap-4 w-full h-full justify-evenly sm:h-fit sm:min-h-52r`}
`;

const ExerciseStatement = styled.div`
  ${tw`w-full flex flex-row justify-center`}
`;

const Symbols = styled.div`
  ${tw`font-thin text-gray-800 w-full flex flex-row justify-center`}
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
  ${tw`w-full py-2 px-4 border border-primary-500 border-2 rounded hover:bg-gray-200 cursor-pointer`}
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
  ${tw`w-full`}
`;

const Title = styled.div`
  ${tw`mx-auto flex flex-col text-center gap-4`}
`;

const QuizCard = ({
  handleWordReadingChange,
  handleKeyPress,
  handleNextQuestion,
}) => {
  const dispatch = useDispatch();
  const quizData = useSelector((state) => state.quizPage.quizData);
  const current = useSelector((state) => state.quizPage.current);
  const answered = useSelector((state) => state.quizPage.answered);
  const lastWrongQuestion = useSelector(
    (state) => state.quizPage.lastWrongQuestion
  );
  const score = useSelector((state) => state.quizPage.score);
  const inputRef = useRef(null);

  const handleRetry = () => {
    dispatch(retryQuiz());
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [current]);

  return (
    <Card>
      {quizData && current && <ProgressBar />}
      {quizData && current && score && (
        <CardContent>
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
                  : quizData[current.set]?.wordQuestions[current.wordIndex].word
                      .word}
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
                        ]?.kanjiQuestion?.options.some((opt) => opt.isSelected)}
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
                        quizData[current.set]?.wordQuestions[current.wordIndex]
                          .userInput.isCorrect
                      }
                    >
                      The correct reading is:{" "}
                      {
                        quizData[current.set]?.wordQuestions[current.wordIndex]
                          .word.kana_reading
                      }
                    </Message>
                  )}
                  <Form>
                    <Input
                      ref={inputRef}
                      type="text"
                      placeholder="reading"
                      value={
                        quizData[current.set]?.wordQuestions[current.wordIndex]
                          .userInput.value
                      }
                      onChange={handleWordReadingChange}
                      isCorrect={
                        quizData[current.set]?.wordQuestions[current.wordIndex]
                          .userInput.isCorrect
                      }
                      showAnswer={answered}
                      onKeyDown={handleKeyPress}
                    />
                  </Form>
                </FormContainer>
              )}
            </>
          ) : (
            <>
              <Title>
                <div>Quiz ended</div>
                {score.wrongAnswers === 0 && (
                  <div>
                    <div>Congratulations!</div>
                    <ConfettiComponent />
                  </div>
                )}
              </Title>
              <FinalScoreContainer score={score} quizData={quizData} />
              {score.wrongAnswers !== 0 && (
                <>
                  <ReviewContainer
                    quizData={quizData}
                    lastWrongQuestion={lastWrongQuestion}
                  />
                  <RetryButtonContainer onClick={handleRetry} />
                </>
              )}
            </>
          )}
        </CardContent>
      )}
      {quizData && current && current.set <= quizData.length - 1 && (
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
                !quizData[current.set]?.wordQuestions[current.wordIndex]
                  .userInput.value
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
      )}
    </Card>
  );
};

export default QuizCard;
