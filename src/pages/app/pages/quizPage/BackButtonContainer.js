import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import Button from "../../Button";

const BackButtonContainer = styled.div`
  ${tw`w-full mr-auto mb-5 sm:mb-8 flex flex-row justify-between`}
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

const BackButtonContainerComponent = ({ onClick, current, quizData, score }) => (
  <BackButtonContainer>
    <BackButton>
      <Button onClick={onClick} full>
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
);

export default BackButtonContainerComponent;
