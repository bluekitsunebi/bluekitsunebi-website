import React, { useRef } from "react";
import { useSelector } from "react-redux";
import tw from "twin.macro";
import styled, { css } from "styled-components";

const WordsListContainer = styled.div`
  ${tw`w-full border border-primary-100 rounded p-2 sm:px-8 sm:py-4 border-4
    overflow-y-auto h-64 min-h-64 bg-white
    flex flex-col gap-2 sm:gap-0
    `}
  ${({ hide }) =>
    hide &&
    css`
      ${tw`opacity-0 cursor-default pointer-events-none`}
    `}
    
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

const WordsList = () => {
  const kanjiData = useSelector((state) => state.studyPage.kanjiData);
  const kanjiList = useSelector((state) => state.studyPage.kanjiList);
  const currentKanjiIndex = useSelector(
    (state) => state.studyPage.currentKanjiIndex
  );
  const wordsListRef = useRef(null);

  return (
    <WordsListContainer ref={wordsListRef} hide={kanjiList[currentKanjiIndex]?.lessonDone}>
      {kanjiData?.words?.map((word) => (
        <div key={word.id}>
          {word.word} ({word.kana_reading}) ={" "}
          {word?.meanings.join(", ")}
        </div>
      ))}
    </WordsListContainer>
  );
};

export default WordsList;
