import React from "react";
import tw from "twin.macro";
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setRetryQuestions } from "store/app/quizPageSlice";
import BackButtonContainer from "./BackButtonContainer";


const Content = styled.div`
${tw`w-full flex flex-col gap-4 sm:gap-5`}
`;

const ProgressBarAndBackButton = styled.div`
  ${tw`w-full flex flex-row gap-4 items-center`}
`;

const ProgressBarContainer = styled.div`
  ${tw`w-full bg-gray-400 h-4 rounded-lg relative`}
`;

const Bar = styled.div`
  ${tw`bg-primary-600 h-4 rounded-lg flex items-center justify-center`}
  ${({ percentage }) =>
    css`
      width: ${percentage}%;
    `}
`;

const PercentageText = styled.span`
  ${tw`text-white text-xs font-bold`}
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const ScoreContainer = styled.div`
  ${tw`flex flex-row mx-auto gap-2 text-xl sm:text-2xl`}
`;

const CorrectAnswersScore = styled.div`
  ${tw`text-green-500`}
`;

const WrongAnswersScore = styled.div`
  ${tw`text-red-500`}
`;

const ProgressBar = () => {
  const dispatch = useDispatch();
  const quizData = useSelector((state) => state.quizPage.quizData);
  const current = useSelector((state) => state.quizPage.current);
  const score = useSelector((state) => state.quizPage.score);
  const retry = useSelector((state) => state.quizPage.retry);
  const retryQuestions = useSelector((state) => state.quizPage.retryQuestions);
  const currentWrongQuestion = useSelector(
    (state) => state.quizPage.currentWrongQuestion
  );
  const showAllKanjis = useSelector(
    (state) => state.studySettings.showAllKanjis
  );

  if (!retry) {
    dispatch(
      setRetryQuestions(
        quizData.reduce((total, set) => {
          return total + 1 + set.wordQuestions.length;
        }, 0)
      )
    );
  }

  let currentQuestionIndex = 0;
  if (!retry) {
    currentQuestionIndex = quizData.reduce((index, set, setIndex) => {
      if (setIndex < current.set) {
        return index + 1 + set.wordQuestions.length;
      } else if (setIndex === current.set) {
        if (current.type === "kanjiQuestion") {
          return index;
        } else if (current.type === "wordQuestions") {
          return index + 1 + current.wordIndex;
        }
      }
      return index;
    }, 0);
  } else {
    currentQuestionIndex = currentWrongQuestion;
  }

  const progressPercentage = (currentQuestionIndex / retryQuestions) * 100;

  return (
    <Content>
      <ProgressBarAndBackButton>
        <BackButtonContainer mobile />
        <ProgressBarContainer>
          <Bar percentage={progressPercentage}>
            <PercentageText>{
              !showAllKanjis
                ? Math.round(progressPercentage)
                : Math.round(progressPercentage * 10) / (10)
            }%</PercentageText>
          </Bar>
        </ProgressBarContainer>
      </ProgressBarAndBackButton>

      {current.set <= quizData.length - 1 && (
        <ScoreContainer>
          <CorrectAnswersScore>
            Correct: {score.correctAnswers}
          </CorrectAnswersScore>
          <WrongAnswersScore>Wrong: {score.wrongAnswers}</WrongAnswersScore>
        </ScoreContainer>
      )}
    </Content>
  );
};

export default ProgressBar;
