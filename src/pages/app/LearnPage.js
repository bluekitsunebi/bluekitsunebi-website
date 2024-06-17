import React from "react";
import tw from "twin.macro";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  setAction,
  setStudyLevel,
  setStudyType,
  setStudyLesson,
  setQuizSettings,
} from "store/app/studySettingsSlice";

const Content = styled.div`
  ${tw`w-screen h-screen flex flex-col items-center justify-center 
  p-8 sm:px-12 md:px-24 lg:px-32`}
`;

const Card = styled.div`
  ${tw`rounded-2xl shadow-md bg-white
  w-full max-w-screen-lg sm:h-fit sm:min-h-30r  
  flex flex-col gap-10 items-center justify-center p-8
  `}
`;

// bg-yellow-500
const PrimarySettings = styled.div`
  ${tw`w-full s:w-fit h-fit  max-w-screen-xs s:max-w-screen-lg
  flex flex-col gap-10 items-center justify-between
  bg-yellow-500
  `}
`;

// bg-orange-500
const Settings = styled.div`
  ${tw`w-full sm:w-full h-fit sm:max-w-screen-lg
  flex flex-col gap-10 items-center justify-between
  bg-orange-500
  s:w-fit
  `}
`;

const Title = styled.div`
  ${tw`text-primary-700 font-bold text-center`}
`;

const ActionSelector = styled.div`
  ${tw`flex xs:flex-row flex-col gap-4 justify-between w-full `}
`;

const TypeSelector = styled.div`
  ${tw`flex xs:flex-row flex-col gap-4 justify-between w-full `}
  ${({ show }) =>
    !show &&
    css`
      ${tw`opacity-0 pointer-events-none`}
    `}
`;

const LevelSelector = styled.div`
  ${tw`flex flex-col s:flex-row w-full sm:w-fit`}
  ${({ show }) =>
    !show &&
    css`
      ${tw`opacity-0 pointer-events-none`}
    `}
`;

const LessonSelector = styled.div`
  ${tw`flex flex-col flex-nowrap sm:flex-row s:flex-wrap w-full gap-4 justify-center h-72 overflow-y-auto px-8`}
  ${({ show }) =>
    !show &&
    css`
      ${tw`opacity-0 pointer-events-none`}
    `}
`;

const LevelSelectorButton = styled.div`
  ${tw`bg-transparent hover:bg-primary-500 text-primary-700 font-semibold hover:text-white py-2 px-4 border-primary-500 hover:border-transparent cursor-pointer border border-b-0 s:border-b s:border-r-0 text-center w-full s:w-fit`}
  ${({ type }) =>
    type === "left" &&
    css`
      ${tw`rounded-t s:rounded-bl s:rounded-tr-none`}
    `}
  ${({ type }) =>
    type === "right" &&
    css`
      ${tw`border-b rounded-b s:border-r s:rounded-tr s:rounded-bl-none`}
    `}
  ${({ isSelected }) =>
    isSelected &&
    css`
      ${tw`bg-primary-500 text-white border-transparent`}
    `}
`;

const Button = styled.div`
  ${tw`bg-transparent hover:bg-primary-500 text-primary-700 font-semibold hover:text-white py-2 px-4 border-primary-500 hover:border-transparent cursor-pointer border rounded text-center sm:w-fit`}
  ${({ isSelected }) =>
    isSelected &&
    css`
      ${tw`bg-primary-500 text-white border-transparent`}
    `}
`;

const LearnKanjiPage = () => {
  const dispatch = useDispatch();

  const lessons = [
    { id: 1 },
    { id: 2 },
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
  ];

  const action = useSelector((state) => state.studySettings.action);
  const studyLevel = useSelector((state) => state.studySettings.studyLevel);
  const studyType = useSelector((state) => state.studySettings.studyType);
  const studyLesson = useSelector((state) => state.studySettings.studyLesson);
  const quizSettings = useSelector((state) => state.studySettings.quizSettings);

  const handleSetAction = (action) => {
    dispatch(setAction(action));
  };
  const handleSetStudyType = (type) => {
    dispatch(setStudyType(type));
  };
  const handleSetStudyLevel = (level) => {
    dispatch(setStudyLevel(level));
  };
  const handleSetStudyLesson = (lessons) => {
    dispatch(setStudyLesson(lessons));
  };
  const handleSetQuizSettings = (quizSettings) => {
    dispatch(setQuizSettings(quizSettings));
  };

  return (
    <Content>
      <Card>
        <Settings>
          <PrimarySettings>
            <ActionSelector>
              <Button
                onClick={() => handleSetAction("study")}
                isSelected={action === "study"}
              >
                Study
              </Button>
              <Button
                onClick={() => handleSetAction("quiz")}
                isSelected={action === "quiz"}
              >
                Quiz
              </Button>
            </ActionSelector>
            <LevelSelector show={action === "study"}>
              {["N5", "N4", "N3", "N2", "N1"].map((level, index) => (
                <LevelSelectorButton
                  show={action === "study"}
                  onClick={() => handleSetStudyLevel(level)}
                  isSelected={studyLevel === level}
                  key={level}
                  type={
                    index === 0 ? "left" : index === 4 ? "right" : undefined
                  }
                >
                  {level}
                </LevelSelectorButton>
              ))}
            </LevelSelector>
            <TypeSelector show={action === "study" && studyLevel}>
              <Button
                onClick={() => handleSetStudyType("kanji")}
                isSelected={studyType === "kanji"}
              >
                Kanji
              </Button>
              <Button
                onClick={() => handleSetStudyType("vocabulary")}
                isSelected={studyType === "vocabulary"}
              >
                Vocabulary
              </Button>
            </TypeSelector>
          </PrimarySettings>
          <LessonSelector show={action === "study" && studyType}>
            {lessons.map((lesson) => (
              <Button
                onClick={() => handleSetStudyLesson(lesson.id)}
                isSelected={studyLesson === lesson.id}
              >
                {`Lesson ${lesson.id}`}
              </Button>
            ))}
          </LessonSelector>
        </Settings>
      </Card>
    </Content>
  );
};

export default LearnKanjiPage;
