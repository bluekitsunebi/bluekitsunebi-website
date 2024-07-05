import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  setResponseStudyLessons,
  setStudyLesson,
} from "store/app/studySettingsSlice";
import Button from "./Button";
import {
  IoCaretDownCircleOutline,
  IoCaretUpCircleOutline,
} from "react-icons/io5";

const LessonSelectorWrapper = styled.div`
  ${tw`flex flex-col justify-start gap-4  h-96 overflow-y-auto border border-primary-500 p-4 w-full
    sm:flex-row sm:flex-wrap sm:justify-start`}
  ${({ show }) =>
    !show &&
    css`
      ${tw`opacity-0 pointer-events-none`}
    `}
  ${({ showAllLessons }) =>
    !showAllLessons &&
    css`
      padding-right: 1.9rem;
    `}
`;

const LessonContainer = styled.div`
  ${tw`flex flex-row gap-5 items-center h-fit`}
  ${({ isSelected }) =>
    isSelected &&
    css`
      ${tw`w-full`}
    `}
`;

const LessonName = styled.span`
  ${tw`flex flex-row justify-center gap-2 w-24`}
`;

const KanjisContainer = styled.span`
  ${tw`flex flex-row gap-5 w-full`}
`;

const Kanji = styled.span`
  ${tw``}
`;

const CaretDown = styled(IoCaretDownCircleOutline)`
  ${tw`text-primary-500 w-8 h-8 cursor-pointer`}
`;

const CaretUp = styled(IoCaretUpCircleOutline)`
  ${tw`text-primary-500 w-8 h-8 cursor-pointer`}
`;

const LessonSelector = ({ show }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setResponseStudyLessons([
        {
          id: 1,
          kanjis: [
            { id: 1, kanji: "日" },
            { id: 2, kanji: "一" },
            { id: 3, kanji: "国" },
            { id: 4, kanji: "人" },
            { id: 5, kanji: "年" },
          ],
        },
        {
          id: 2,
          kanjis: [
            { id: 6, kanji: "大" },
            { id: 7, kanji: "十" },
            { id: 8, kanji: "二" },
            { id: 9, kanji: "本" },
            { id: 10, kanji: "中" },
          ],
        },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
        { id: 9 },
        { id: 10 },
        { id: 11 },
        { id: 12 },
        { id: 13 },
        { id: 14 },
        { id: 15 },
        { id: 16 },
        { id: 17 },
        { id: 18 },
        { id: 19 },
        { id: 20 },
        { id: 21 },
        { id: 22 },
        { id: 23 },
        { id: 24 },
        { id: 25 },
        { id: 26 },
        { id: 27 },
        { id: 28 },
        { id: 29 },
        { id: 30 },
        { id: 31 },
        { id: 32 },
        { id: 33 },
        { id: 34 },
        { id: 35 },
        { id: 36 },
        { id: 37 },
        { id: 38 },
        { id: 39 },
        { id: 40 },
        { id: 41 },
        { id: 42 },
        { id: 43 },
        { id: 44 },
        { id: 45 },
        { id: 46 },
        { id: 47 },
        { id: 48 },
        { id: 49 },
        { id: 50 },
      ])
    );
  }, []);
  const responseStudyLessons = useSelector(
    (state) => state.studySettings.responseStudyLessons
  );
  const studyLesson = useSelector((state) => state.studySettings.studyLesson);
  const handleSetStudyLesson = (lessons) => {
    dispatch(setStudyLesson(lessons));
  };
  const handleShowAllLessons = () => {
    setShowAllLessons(!showAllLessons);
  };

  const [showAllLessons, setShowAllLessons] = useState(false);

  return (
    <LessonSelectorWrapper show={show} showAllLessons={showAllLessons}>
      {responseStudyLessons.map(
        (lesson) =>
          (!studyLesson ||
            (studyLesson && (studyLesson === lesson.id || showAllLessons))) && (
            <LessonContainer isSelected={studyLesson === lesson.id}>
              <Button
                key={lesson.id}
                onClick={() => {handleSetStudyLesson(lesson.id); handleShowAllLessons()}}
                isSelected={studyLesson === lesson.id}
                isLessonSelector
              >
                <LessonName>Lesson {lesson.id}</LessonName>
                <KanjisContainer>
                  {studyLesson === lesson.id &&
                    lesson?.kanjis &&
                    lesson.kanjis.map((kanji) => <Kanji>{kanji.kanji}</Kanji>)}
                </KanjisContainer>
              </Button>
              {studyLesson && studyLesson === lesson.id && (
                <div onClick={() => handleShowAllLessons()}>
                  {!showAllLessons ? (
                    <CaretDown></CaretDown>
                  ) : (
                    <CaretUp></CaretUp>
                  )}
                </div>
              )}
            </LessonContainer>
          )
      )}
    </LessonSelectorWrapper>
  );
};

export default LessonSelector;
