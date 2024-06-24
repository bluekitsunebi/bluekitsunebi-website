import React from "react";
import tw from "twin.macro";
import styled from "styled-components";

const QuizListWrapper = styled.div`
  ${tw`border border-primary-500 rounded p-4 flex flex-col w-full h-full min-w-17rem text-gray-700 gap-4`}
`;

const QuizList = ({ children }) => {
  return <QuizListWrapper>{children}</QuizListWrapper>;
};

export default QuizList;
