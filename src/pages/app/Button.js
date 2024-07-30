import React from "react";
import tw from "twin.macro";
import styled, { css } from "styled-components";

const ButtonWrapper = styled.div`
  ${tw`bg-white hover:bg-primary-500 text-primary-700 font-semibold hover:text-white py-2 px-4 border-primary-500 hover:border-transparent cursor-pointer border rounded text-center w-full h-fit transition-colors duration-300 select-none
    
    text-xl sm:text-2xl
    `}
  ${({ isSelected }) =>
    isSelected &&
    css`
      ${tw`bg-primary-500 text-white border-transparent`}
    `}

  
  ${({ isLessonSelector, isSelected }) =>
    isLessonSelector &&
    !isSelected &&
    css`
      ${tw`sm:w-fit`}
    `}
  ${({ isLessonSelector, isSelected }) =>
    isLessonSelector &&
    isSelected &&
    css`
      ${tw`flex flex-row w-full gap-5`}
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
  ${({ monochrome }) =>
    monochrome &&
    css`
      ${tw`
      bg-white 
      text-gray-700 
      
      border-gray-500 
      
      hover:text-gray-700
      hover:border-transparent
      hover:bg-gray-200 
      `}
    `}
  ${({ isKanji }) =>
    isKanji &&
    css`
      ${tw`font-normal text-5xl sm:text-5xl`}
    `}
  ${({ isDual, isFirst, isLast }) =>
    isDual && isFirst
      ? css`
          ${tw`rounded-b-none s:rounded border-b-0 s:border-b`}
        `
      : isDual &&
        isLast &&
        css`
          ${tw`rounded-t-none s:rounded`}
        `}
  ${({ full }) =>
    full &&
    css`
      ${tw`bg-primary-500 text-white border-0
         hover:bg-primary-600 
         hover:text-white 
         hover:border-0
         `}
    `}

  ${({ full, monochrome }) =>
    full &&
    monochrome &&
    css`
      ${tw`
      bg-gray-300
      text-gray-700
      border-gray-400
      hover:bg-gray-400
      hover:text-gray-800
      `}
    `}
  ${({ disabled }) =>
    disabled &&
    css`
      ${tw`pointer-events-none cursor-default opacity-50`}
    `}
  ${({ roundColored }) =>
    roundColored &&
    css`
      ${tw`
      rounded-full px-2 sm:px-4 sm:rounded text-5xl sm:text-2xl

      bg-primary-500 text-white border-0
      hover:bg-primary-600 
      hover:text-white 
      hover:border-0

      sm:bg-gray-300
      sm:text-gray-700
      sm:border-gray-400
      sm:hover:bg-gray-400
      sm:hover:text-gray-800
      
      `}
    `}
`;

const Button = ({
  onClick,
  isSelected,
  isLessonSelector,
  isLevelSelector,
  isFirst,
  isLast,
  monochrome,
  children,
  isKanji,
  isDual,
  transparent,
  full,
  disabled,
  roundColored,
}) => {
  return (
    <ButtonWrapper
      onClick={onClick}
      isSelected={isSelected}
      isLessonSelector={isLessonSelector}
      isLevelSelector={isLevelSelector}
      isFirst={isFirst}
      isLast={isLast}
      monochrome={monochrome}
      isKanji={isKanji}
      isDual={isDual}
      transparent={transparent}
      full={full}
      disabled={disabled}
      roundColored={roundColored}
    >
      {children}
    </ButtonWrapper>
  );
};

export default Button;
