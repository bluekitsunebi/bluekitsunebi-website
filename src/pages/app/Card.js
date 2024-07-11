import React from "react";
import tw from "twin.macro";
import styled from "styled-components";

const CardWrapper = styled.div`
  ${tw`
     
    w-full
    max-w-screen-lg 
    rounded-2xl 
    my-auto
    
    
    flex 
    flex-col 
    gap-5 
    items-center 
    justify-between
    
    sm:shadow-md
    sm:p-8 
    sm:bg-white
    `
  }
  height: 55rem;
  @media (max-width: 400px) {
    height: 70rem;
  }
`;

const Card = ({ children }) => {
  return <CardWrapper>{children}</CardWrapper>;
};

export default Card;
