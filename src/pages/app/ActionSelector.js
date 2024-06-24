import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { setAction } from "store/app/studySettingsSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";

const ActionSelectorWrapper = styled.div`
  ${tw`flex flex-col s:flex-row gap-4 justify-between w-full s:min-w-17rem`}
`;

const ActionSelector = () => {
  const dispatch = useDispatch();
  const action = useSelector((state) => state.studySettings.action);
  const handleSetAction = (action) => {
    dispatch(setAction(action));
  };

  return (
    <ActionSelectorWrapper>
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
    </ActionSelectorWrapper>
  );
};

export default ActionSelector;
