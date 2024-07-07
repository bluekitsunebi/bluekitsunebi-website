import React from "react";
import tw from "twin.macro";
import styled from "styled-components";

const ContentWrapper = styled.div`
  ${tw`w-screen min-h-screen flex flex-col items-center justify-center p-8 sm:px-12 md:px-24 lg:px-32`}
`;

const Content = ({ children }) => {
  return <ContentWrapper>{children}</ContentWrapper>;
};

export default Content;
