import React from "react";
import tw from "twin.macro";
import styled, { css } from "styled-components";
import { FaAngleLeft as Previous, FaAngleRight as Next } from "react-icons/fa6";

const KanjiContainer = styled.div`
  ${tw`flex flex-row gap-2 text-center w-full justify-between items-center sm:gap-10`}
  ${({ type }) =>
    type === "kanji"
      ? css`
          ${tw`h-36`}
        `
      : css`
          ${tw`h-20`}
        `}
`;

const Icon = styled.div`
  ${tw`text-primary-300 cursor-pointer border rounded-full border-primary-300 p-1 transition-colors duration-300
    hover:bg-primary-300 
    hover:text-white
    active:bg-primary-300 
    active:text-white
    focus:bg-primary-300 
    focus:text-white
    `}
  border-width: 3px;
  @media (min-width: 640px) {
    border-width: 0.5rem;
  }
  ${({ hide }) =>
    hide &&
    css`
      ${tw`opacity-50 cursor-default pointer-events-none`}
    `}
`;

const PreviousIcon = styled(Previous)`
  ${tw`w-6 h-6  sm:w-16 sm:h-16`}
`;

const NextIcon = styled(Next)`
  ${tw`w-6 h-6 sm:w-16 sm:h-16`}
`;

const KanjiSymbol = styled.div`
  ${tw`font-thin text-gray-800`}
  line-height: 90%;
  font-size: 8rem;
  @media (min-width: 640px) {
    font-size: 10rem;
  }
`;

const TitleContainer = styled.div`
  ${tw`flex flex-col items-center text-gray-800`}
`;

const Title = styled.div`
  ${tw`text-xl sm:text-4xl`}
`;

const LessonName = styled.div`
  ${tw`text-3xl sm:text-4xl`}
`;

const KanjiNavigator = ({ type, kanjiData, currentKanjiIndex, kanjiList, lessonId, responseStudyVocabularyLessons, level, previousKanji, nextKanji, previousLesson, nextLesson }) => {
  return (
    <KanjiContainer type={type}>
      <Icon
        hide={type === "kanji" ? currentKanjiIndex === 0 : lessonId <= 1}
      >
        <PreviousIcon
          onClick={() =>
            type === "kanji" ? previousKanji() : previousLesson()
          }
        ></PreviousIcon>
      </Icon>
      {type === "kanji" ? (
        !kanjiList[currentKanjiIndex]?.lessonDone ? (
          <KanjiSymbol>{kanjiData?.kanji?.kanji}</KanjiSymbol>
        ) : (
          <TitleContainer>
            <Title>Lesson done.</Title>
            <Title>Ready for the quiz?</Title>
          </TitleContainer>
        )
      ) : (
        <LessonName>Lesson {lessonId}</LessonName>
      )}
      <Icon
        hide={
          type === "kanji"
            ? kanjiList[currentKanjiIndex]?.lessonDone
            : lessonId >= responseStudyVocabularyLessons[level].length
        }
      >
        <NextIcon
          onClick={() => (type === "kanji" ? nextKanji() : nextLesson())}
        ></NextIcon>
      </Icon>
    </KanjiContainer>
  );
};

export default KanjiNavigator;
