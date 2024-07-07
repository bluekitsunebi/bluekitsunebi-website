import React from "react";
import tw from "twin.macro";
import styled from "styled-components";

const CardWrapper = styled.div`
  ${tw`
     
    w-full
    max-w-screen-lg 
    rounded-2xl 
    
    
    flex 
    flex-col 
    gap-10 
    items-center 
    justify-between
    
    sm:shadow-md
    sm:p-8 
    sm:bg-white
    `
  }
  height: calc(100vh - 4rem);
  max-height: 55rem;
`;

const Card = ({ children }) => {
  return <CardWrapper>{children}</CardWrapper>;
};

export default Card;
