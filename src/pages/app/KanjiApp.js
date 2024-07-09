import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import LearningSettingsPage from "./pages/LearningSettingsPage";
import StudyPage from "./pages/StudyPage";
import { useSelector } from "react-redux";

const LearnKanjiPage = () => {
  const currentPage = useSelector((state) => state.app.page);

  const AppWraper = styled.div`
    ${tw`
      w-screen 
      min-h-screen 
      flex 
      flex-col 
      items-center 
      justify-start 
      p-8 
      sm:px-12 
      md:px-24 
      lg:px-32
      text-base 
      sm:text-lg
      md:text-xl
      `}
  `;

  return (
    <AppWraper>
      {currentPage === "learningSettings" ? (
        <LearningSettingsPage />
      ) : (
        <StudyPage />
      )}
    </AppWraper>
  );
};

export default LearnKanjiPage;
