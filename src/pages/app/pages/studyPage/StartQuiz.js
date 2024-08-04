import React from "react";
import tw from "twin.macro";
import styled, { css } from "styled-components";
import Button from "../../Button";

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

const StartQuiz = ({ type, goToQuiz }) => (
  <StartQuizContainer type={type}>
    <StartQuizButtonContainer>
      <Button full onClick={goToQuiz}>
        Start quiz
      </Button>
    </StartQuizButtonContainer>
  </StartQuizContainer>
);

export default StartQuiz;
