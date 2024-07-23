import React from "react";
import tw from "twin.macro";
import styled from "styled-components";

const ScoreContainer = styled.div`
  ${tw`flex flex-col sm:flex-row gap-2 sm:gap-4 text-xl sm:text-2xl`}
`;

const CorrectAnswersScore = styled.div`
  ${tw`text-green-500`}
`;

const WrongAnswersScore = styled.div`
  ${tw`text-red-500`}
`;

const ScoreContainerComponent = ({ correctAnswers, wrongAnswers }) => (
  <ScoreContainer>
    <CorrectAnswersScore>
      Correct: {correctAnswers}
    </CorrectAnswersScore>
    <WrongAnswersScore>Wrong: {wrongAnswers}</WrongAnswersScore>
  </ScoreContainer>
);

export default ScoreContainerComponent;
