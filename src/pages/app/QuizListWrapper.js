import React from "react";
import tw from "twin.macro";
import styled from "styled-components";

const QuizListWrapperStyled = styled.div`
  ${tw`border border-primary-500 bg-white rounded p-4 flex flex-col w-full h-96 s:min-w-17rem text-gray-700 gap-4 select-none`}
  max-height: 100%;
  overflow-y: auto;
`;

const QuizListWrapper = ({ children }) => {
  return <QuizListWrapperStyled>{children}</QuizListWrapperStyled>;
};

export default QuizListWrapper;
