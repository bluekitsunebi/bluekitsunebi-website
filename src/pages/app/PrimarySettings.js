import React from "react";
import tw from "twin.macro";
import styled from "styled-components";

const PrimarySettingsWrapper = styled.div`
  ${tw`w-full h-full max-w-screen-xs s:max-w-screen-lg flex flex-col gap-10 items-center justify-between`}
`;

const PrimarySettings = ({ children }) => {
  return <PrimarySettingsWrapper>{children}</PrimarySettingsWrapper>;
};

export default PrimarySettings;
