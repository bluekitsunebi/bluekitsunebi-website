import React from "react";
import tw from "twin.macro";
import styled from "styled-components";

const QuizListWrapperStyled = styled.div`
  ${tw`border border-primary-500 bg-white rounded p-4 flex flex-col w-full h-full h-96 sm:h-144 s:min-w-17rem text-gray-700 gap-4 select-none`}
  max-height: 100%;
  overflow-y: auto;

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

const QuizListWrapper = ({ children }) => {
  return <QuizListWrapperStyled>{children}</QuizListWrapperStyled>;
};

export default QuizListWrapper;
