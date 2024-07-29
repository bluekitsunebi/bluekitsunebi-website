import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { selectLesson } from "store/app/quizSettingsSlice";
import { FaCheckSquare, FaRegSquare as UncheckIcon } from "react-icons/fa";

const LessonItem = styled.div`
  ${tw`flex flex-row gap-2 items-start ml-24 cursor-pointer w-fit`}
`;

const CheckboxContainer = styled.div`
  ${tw``}
  padding-top: 0.3rem;
`;

const LessonName = styled.div`
  ${tw`flex flex-row gap-2`}
`;

const KanjiContainer = styled.div`
  ${tw``}
`;

const WordsContainer = styled.div`
  ${tw`flex flex-row gap-2 flex-wrap `}
`;

const Word = styled.div`
  ${tw`flex flex-row gap-1 px-2 py-1 rounded bg-blue-100`}
`;

const Kanji = styled.div`
  ${tw`px-2`}
`;

const Reading = styled.div`
  ${tw`rounded bg-blue-200 px-1`}
`;

const QuizLesson = ({ level, type, lesson, isSelected }) => {
  const dispatch = useDispatch();

  return (
    <LessonItem onClick={() => dispatch(selectLesson({ level, type, lesson}))}>
      <CheckboxContainer>
        {isSelected ? <FaCheckSquare /> : <UncheckIcon />}
      </CheckboxContainer>
      <LessonName><span>Lesson </span><span>{lesson?.id}</span></LessonName>
      {lesson?.kanji &&
        <KanjiContainer>
          ( {lesson?.kanji.join("、")} )
        </KanjiContainer>
      }
      {lesson?.words &&
        <WordsContainer>
          {lesson.words.map((word, wordIndex) => 
            <Word key={wordIndex}>
              <Kanji>{word?.word}</Kanji>
              <Reading>{word?.reading}</Reading>
            </Word>
          )}
        </WordsContainer>
      }
    </LessonItem>
  );
};

export default QuizLesson;
