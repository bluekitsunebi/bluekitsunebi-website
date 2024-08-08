import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import tw from "twin.macro";
import styled, { css } from "styled-components";
import Button from "../../Button";
import { setPage } from "store/app/appSlice";
import { setStartQuizLoading } from "store/app/studyPageSlice";

const StartQuizContainer = styled.div`
  ${tw`w-full flex flex-col items-center justify-center`}
  ${({ type }) =>
    type === "kanji"
      ? css`
          ${tw`min-h-28 sm:min-h-44`}
        `
      : css`
          ${tw`mt-4 sm:mt-0`}
        `}
`;

const StartQuizButtonContainer = styled.div`
  ${tw``}
`;

const StartQuiz = () => {
  const dispatch = useDispatch();
  const type = useSelector((state) => state.studySettings.studyType);
  const startQuizLoading = useSelector(
    (state) => state.studyPage.startQuizLoading
  );

  const goToQuiz = () => {
    dispatch(setStartQuizLoading(true));
  };

  useEffect(() => {
    console.log()
    if (setStartQuizLoading === true) {
      dispatch(setPage("quiz"));
    }
  }, [setStartQuizLoading]);

  return (
    <StartQuizContainer type={type}>
      <StartQuizButtonContainer>
        <Button full onClick={goToQuiz} loading={startQuizLoading}>
          Start quiz
        </Button>
      </StartQuizButtonContainer>
    </StartQuizContainer>
  );
};

export default StartQuiz;
