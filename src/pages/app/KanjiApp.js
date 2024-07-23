import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import LearningSettingsPage from "./pages/LearningSettingsPage";
import StudyPage from "./pages/StudyPage";
import QuizPage from "./pages/quizPage/QuizPage";
import { useSelector } from "react-redux";

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

const LearnKanjiPage = () => {
  const currentPage = useSelector((state) => state.app.page);


  return (
    <AppWraper>
      {currentPage === "learningSettings" ? (
        <LearningSettingsPage />
      ) : currentPage === "study" ? (
         <StudyPage />
      ) : <QuizPage />}
    </AppWraper>
    // learningSettings, study, quiz
  );
};

export default LearnKanjiPage;
