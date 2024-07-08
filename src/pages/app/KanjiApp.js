import React from "react";
import Content from "./Content";
import LearningSettingsPage from "./pages/LearningSettingsPage";
import StudyPage from "./pages/StudyPage";
import { useSelector } from "react-redux";

const LearnKanjiPage = () => {
  const currentPage = useSelector((state) => state.app.page);

  return (
    <Content>
      {currentPage === "learningSettings" ? (
        <LearningSettingsPage />
      ) : (
        <StudyPage />
      )}
    </Content>
  );
};

export default LearnKanjiPage;
