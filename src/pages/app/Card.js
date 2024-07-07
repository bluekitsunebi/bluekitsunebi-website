import React from "react";
import tw from "twin.macro";
import styled from "styled-components";

const CardWrapper = styled.div`
  ${tw`rounded-2xl sm:shadow-md w-full max-w-screen-lg h-full sm:h-fit sm:min-h-40r flex flex-col gap-10 items-center justify-evenly sm:p-8 sm:bg-white`}
`;

const Card = ({ children }) => {
  return <CardWrapper>{children}</CardWrapper>;
};

export default Card;
