import React from "react";
import tw from "twin.macro";
import styled, { css } from "styled-components";

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

const FinalScoreContainerComponent = ({ score }) => (
  <FinalScoreContainer perfectScore={score.wrongAnswers === 0}>
    <FinalScore>
      <FinalScoreCorrectAnswers>
        Correct answers: <span>{score.correctAnswers}</span>
      </FinalScoreCorrectAnswers>
      <FinalScoreWrongAnswers>
        Wrong answers: <span>{score.wrongAnswers}</span>
      </FinalScoreWrongAnswers>
    </FinalScore>
  </FinalScoreContainer>
);

export default FinalScoreContainerComponent;
