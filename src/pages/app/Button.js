import React from "react";
import tw from "twin.macro";
import styled, { css } from "styled-components";

const ButtonWrapper = styled.div`
  ${tw`bg-white hover:bg-primary-500 text-primary-700 font-semibold hover:text-white py-2 px-4 border-primary-500 hover:border-transparent cursor-pointer border rounded text-center w-full`}
  ${({ isSelected }) =>
    isSelected &&
    css`
      ${tw`bg-primary-500 text-white border-transparent`}
    `}
    ${({ isLessonSelector }) =>
    isLessonSelector &&
    css`
      ${tw`sm:w-fit sm:flex-wrap`}
    `}
  ${({ isLevelSelector }) =>
    isLevelSelector &&
    css`
      ${tw`border-b-0 rounded-none s:border-b s:border-r-0`}
    `}
  ${({ isFirst }) =>
    isFirst &&
    css`
      ${tw`rounded-tl rounded-tr s:rounded-tr-none s:rounded-bl`}
    `}
  ${({ isLast }) =>
    isLast &&
    css`
      ${tw`border-b rounded-bl rounded-br s:border-r s:rounded-bl-none s:rounded-tr`}
    `}
  ${({ begin }) =>
    begin &&
    css`
      ${tw`w-fit`}
    `}
`;

const Button = ({
  onClick,
  isSelected,
  isLessonSelector,
  isLevelSelector,
  isFirst,
  isLast,
  begin,
  children,
}) => {
  return (
    <ButtonWrapper
      onClick={onClick}
      isSelected={isSelected}
      isLessonSelector={isLessonSelector}
      isLevelSelector={isLevelSelector}
      isFirst={isFirst}
      isLast={isLast}
      begin={begin}
    >
      {children}
    </ButtonWrapper>
  );
};

export default Button;
