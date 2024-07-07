import React from "react";
import tw from "twin.macro";
import styled, { css } from "styled-components";

const TypeSelectorWrapper = styled.div`
  ${tw`flex flex-col s:flex-row s:gap-4 justify-between w-full`}
  ${({ show }) =>
    !show &&
    css`
      ${tw`opacity-0 pointer-events-none`}
    `}
`;

const TypeSelector = ({ show, children }) => {
  return <TypeSelectorWrapper show={show}>{children}</TypeSelectorWrapper>;
};

export default TypeSelector;
