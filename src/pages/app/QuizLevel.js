import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import {
  FaCaretDown as ExpandListIcon,
  FaCaretUp as CloseListIcon,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { levelDisplay, selectLevel } from "store/app/studySettingsSlice";
import { FaCheckSquare } from "react-icons/fa";
import { FaRegSquare } from "react-icons/fa";

const LevelItem = styled.div`
  ${tw`flex flex-col gap-4`}
`;

const LevelHeader = styled.div`
  ${tw`flex flex-row gap-2 items-center`}
`;

const DisplayIcon = styled.div`
  ${tw`cursor-pointer`}
`;

const CheckboxAndText = styled.div`
  ${tw`flex flex-row gap-2 items-center cursor-pointer select-none`}
`;

const CheckboxIcon = ({ checked }) =>
  checked ? <FaCheckSquare /> : <FaRegSquare />;

const QuizLevel = ({ level, children }) => {
  const dispatch = useDispatch();
  const quizLessons = useSelector(
    (state) => state.studySettings.responseQuizLessons
  );
  const quizSettings = useSelector((state) => state.studySettings.quizSettings);

  const isExpanded = quizSettings[level].expanded;
  const isSelected =
    quizSettings[level].kanji.lessons.length ===
      quizLessons[level].kanji.length &&
    quizSettings[level].vocabulary.lessons.length ===
      quizLessons[level].vocabulary.length;

  return (
    <LevelItem>
      <LevelHeader>
        <DisplayIcon onClick={() => dispatch(levelDisplay(level))}>
          {isExpanded ? <CloseListIcon /> : <ExpandListIcon />}
        </DisplayIcon>
        <CheckboxAndText
          onClick={(e) => {
            e.stopPropagation();
            dispatch(
              selectLevel({
                level,
                kanjiLessons: quizLessons[level].kanji,
                vocabularyLessons: quizLessons[level].vocabulary,
              })
            );
          }}
        >
          <CheckboxIcon checked={isSelected} />
          <div>{level}</div>
        </CheckboxAndText>
      </LevelHeader>
      {isExpanded && children}
    </LevelItem>
  );
};

export default QuizLevel;
