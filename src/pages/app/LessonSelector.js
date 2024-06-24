import React from "react";
import tw from "twin.macro";
import styled, { css } from "styled-components";

const LessonSelectorWrapper = styled.div`
  ${tw`flex flex-col flex-nowrap sm:flex-row s:flex-wrap w-full gap-4 justify-center h-96 overflow-y-auto border border-primary-500 p-4`}
  ${({ show }) =>
    !show &&
    css`
      ${tw`opacity-0 pointer-events-none`}
    `}
`;

const LessonSelector = ({ show, children }) => {
  return <LessonSelectorWrapper show={show}>{children}</LessonSelectorWrapper>;
};

export default LessonSelector;
