import React from "react";
import { useDispatch } from "react-redux";
import tw from "twin.macro";
import styled, { css } from "styled-components";
import Button from "../../Button";
import { setPage } from "store/app/appSlice";
import { resetQuiz } from "store/app/quizPageSlice";

const BackButtonContainer = styled.div`
  ${tw`z-10 sm:w-full mr-auto sm:mb-8 flex flex-row justify-between`}
  ${({ mobile }) =>
    mobile &&
    css`
      ${tw`sm:hidden`}
    `}
  ${({ desktop }) =>
    desktop &&
    css`
      ${tw`hidden sm:block`}
    `}
`;

const BackButton = styled.div`
  ${tw`w-fit`}
`;

const BackButtonContainerComponent = ({mobile, desktop}) => {
  const dispatch = useDispatch();
  const handleBackToStudy = () => {
    dispatch(setPage("study"));
    dispatch(resetQuiz());
  };

  return (
    <BackButtonContainer mobile={mobile} desktop={desktop}>
      <BackButton>
        <Button onClick={() => handleBackToStudy()} full>
          Back
        </Button>
      </BackButton>
    </BackButtonContainer>
  )
};

export default BackButtonContainerComponent;
