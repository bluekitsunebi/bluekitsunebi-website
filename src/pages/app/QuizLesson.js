import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { selectLesson } from "store/app/studySettingsSlice";
import { FaCheckSquare, FaRegSquare as UncheckIcon } from "react-icons/fa";

const LessonItem = styled.div`
  ${tw`flex flex-row gap-2 items-center ml-24 cursor-pointer w-fit`}
`;

const QuizLesson = ({ level, type, lesson, isSelected }) => {
  const dispatch = useDispatch();

  return (
    <LessonItem onClick={() => dispatch(selectLesson({ level, type, lesson }))}>
      {isSelected ? <FaCheckSquare /> : <UncheckIcon />}
      <div>Lesson {lesson.id}</div>
    </LessonItem>
  );
};

export default QuizLesson;
