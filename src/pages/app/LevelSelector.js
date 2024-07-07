import React from "react";
import tw from "twin.macro";
import styled, { css } from "styled-components";

const LevelSelectorWrapper = styled.div`
  ${tw`flex flex-col s:flex-row w-full`}
  ${({ show }) =>
    !show &&
    css`
      ${tw`opacity-0 cursor-default pointer-events-none`}
    `}
`;

const LevelSelector = ({ show, children }) => {
  return <LevelSelectorWrapper show={show}>{children}</LevelSelectorWrapper>;
};

export default LevelSelector;
