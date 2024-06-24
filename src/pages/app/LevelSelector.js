import React from "react";
import tw from "twin.macro";
import styled from "styled-components";

const LevelSelectorWrapper = styled.div`
  ${tw`flex flex-col s:flex-row w-full`}
`;

const LevelSelector = ({ children }) => {
  return <LevelSelectorWrapper>{children}</LevelSelectorWrapper>;
};

export default LevelSelector;
