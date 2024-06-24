import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import {
  FaCaretDown as ExpandListIcon,
  FaCaretUp as CloseListIcon,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { typeDisplay, selectType } from "store/app/studySettingsSlice";
import { FaCheckSquare } from "react-icons/fa";
import { FaRegSquare } from "react-icons/fa";

const TypeItem = styled.div`
  ${tw`flex flex-row gap-2 items-center ml-12`}
`;

const DisplayIcon = styled.div`
  ${tw`cursor-pointer`}
`;

const CheckboxIcon = ({ checked }) =>
  checked ? <FaCheckSquare /> : <FaRegSquare />;

const CheckboxAndText = styled.div`
  ${tw`flex flex-row gap-2 items-center cursor-pointer select-none`}
`;

const QuizType = ({ level, type, children }) => {
  const dispatch = useDispatch();

  const quizLessons = useSelector(
    (state) => state.studySettings.responseQuizLessons
  );
  const quizSettings = useSelector((state) => state.studySettings.quizSettings);

  const isExpanded = quizSettings[level][type].expanded;
  const isSelected =
    quizSettings[level][type].lessons.length ===
    quizLessons[level][type].length;

  return (
    <>
      <TypeItem>
        <DisplayIcon onClick={() => dispatch(typeDisplay({ level, type }))}>
          {isExpanded ? <CloseListIcon /> : <ExpandListIcon />}
        </DisplayIcon>
        <CheckboxAndText
          onClick={(e) => {
            e.stopPropagation();
            dispatch(
              selectType({
                level,
                type,
                lessons: quizLessons[level][type],
              })
            );
          }}
        >
          <CheckboxIcon checked={isSelected} />
          <div>{type.charAt(0).toUpperCase() + type.slice(1)}</div>
        </CheckboxAndText>
      </TypeItem>
      {isExpanded && children}
    </>
  );
};

export default QuizType;
