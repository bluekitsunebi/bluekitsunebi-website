import React, { useState, useEffect } from "react";
import tw from "twin.macro";
import styled, { css } from "styled-components";
import { useDispatch } from "react-redux";
import { levelSelected } from "store/levelSelectSlice";

const Content = styled.div`
  ${tw`w-screen h-screen flex flex-col items-center justify-center 
  p-8 sm:px-12 md:px-24 lg:px-32`}
`;

const Card = styled.div`
  ${tw`rounded-2xl shadow-md bg-white
  w-full max-w-screen-lg h-full max-h-80  
  flex flex-col gap-10 items-center justify-center p-8
  `}
`;

const Title = styled.div`
  ${tw`text-primary-700 font-bold text-center`}
`;

const Selector = styled.div`
  ${tw`flex flex-col sm:flex-row`}
`;
const Button = styled.div`
  ${tw`bg-transparent hover:bg-primary-500 text-primary-700 font-semibold hover:text-white py-2 px-4  border-primary-500 hover:border-transparent cursor-pointer 
  border border-b-0 
  sm:border-b sm:border-r-0
  `}
  ${({ type }) =>
    type === "left" &&
    css`
      ${tw`rounded-t sm:rounded-bl sm:rounded-tr-none`}
    `}
  ${({ type }) =>
    type === "right" &&
    css`
      ${tw`border-b
      rounded-b sm:border-r sm:rounded-tr sm:rounded-bl-none`}
    `}
`;

const handleLevelSelect = async (event) => {
  event.preventDefault();

  try {
        dispatch(
          levelSelected({
            levelSelected: event.target.value
          })
        );
        // navigate("/app");
      } 
    catch (error) {
      console.log('Something went wrong after level selection')
  }
};

const LearnKanjiPage = () => {
  const dispatch = useDispatch();

  return (
    <Content>
      <Card>
        <Title>Choose the level you want to study for</Title>
        <Selector>
          <Button type="left" onClick={handleLevelSelect}>N5</Button>
          <Button onClick={handleLevelSelect}>N4</Button>
          <Button onClick={handleLevelSelect}>N3</Button>
          <Button onClick={handleLevelSelect}>N2</Button>
          <Button type="right" onClick={handleLevelSelect}>N1</Button>
        </Selector>
      </Card>
    </Content>
  );
};

export default LearnKanjiPage;
