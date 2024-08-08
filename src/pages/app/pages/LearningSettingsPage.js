import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import tw from "twin.macro";
import styled from "styled-components";
import { setPage } from "store/app/appSlice";
import {
  setStudyLevel,
  setStudyType,
  setStudyLesson,
  setShowAllKanjis,
} from "store/app/studySettingsSlice";
import {
  selectAll,
  deselectAll,
  expandAll,
  shrinkAll,
} from "store/app/quizSettingsSlice";
import Card from "../Card";
import PrimarySettings from "../PrimarySettings";
import ActionSelector from "../ActionSelector";
import LevelSelector from "../LevelSelector";
import TypeSelector from "../TypeSelector";
import LessonSelector from "../LessonSelector";
import QuizListWrapper from "../QuizListWrapper";
import QuizLevel from "../QuizLevel";
import QuizType from "../QuizType";
import QuizLesson from "../QuizLesson";
import Button from "../Button";
import { setStartQuizLoading } from "store/app/studyPageSlice";

const ButtonsContainer = styled.div`
  ${tw`flex flex-row w-full gap-2`}
`;

const ButtonContainer = styled.div`
  ${tw`w-fit`}
`;

const LearningSettingsPage = () => {
  const dispatch = useDispatch();
  const levels = useSelector((state) => state.studySettings.levels);
  const responseQuizLessons = useSelector(
    (state) => state.quizSettings.responseQuizLessons
  );
  const action = useSelector((state) => state.studySettings.action);
  const studyLevel = useSelector((state) => state.studySettings.studyLevel);
  const studyType = useSelector((state) => state.studySettings.studyType);

  const quizSettings = useSelector((state) => state.quizSettings.quizSettings);
  const allSelected = useSelector((state) => state.quizSettings.allSelected);
  const allDeselected = useSelector(
    (state) => state.quizSettings.allDeselected
  );
  const allExpanded = useSelector((state) => state.quizSettings.allExpanded);
  const allShrunk = useSelector((state) => state.quizSettings.allShrunk);
  const startQuizLoading = useSelector(
    (state) => state.studyPage.startQuizLoading
  );

  const handleSetStudyType = (type) => {
    dispatch(setStudyType(type));
  };
  const handleSetStudyLevel = (level) => {
    dispatch(setStudyLevel(level));
  };

  const handleSelectAll = () => {
    dispatch(selectAll(responseQuizLessons));
  };
  const handleDeselectAll = () => {
    dispatch(deselectAll());
  };

  // TO DO - show/hide all
  const handleExpandAll = () => {
    dispatch(expandAll());
  };
  const handleShrinkAll = () => {
    dispatch(shrinkAll());
  };
  // ---------------------

  const handleStartQuiz = () => {
    dispatch(setStartQuizLoading(true));
  };

  useEffect(() => {
    if (setStartQuizLoading === true) {
      dispatch(setPage("quiz"));
    }
  }, [setStartQuizLoading]);

  return (
    <Card>
      <PrimarySettings>
        <ActionSelector />
        {action !== "quiz" ? (
          <>
            <LevelSelector show={action}>
              {levels.map((level, index) => (
                <Button
                  key={level}
                  onClick={() => {
                    handleSetStudyLevel(level);
                    studyLevel &&
                      studyLevel !== level &&
                      dispatch(setStudyLesson(null));
                    dispatch(setShowAllKanjis(false));
                  }}
                  isSelected={studyLevel === level}
                  isLevelSelector
                  isFirst={index === 0}
                  isLast={index === 4}
                >
                  {level}
                </Button>
              ))}
            </LevelSelector>
            <TypeSelector show={studyLevel}>
              <Button
                onClick={() => handleSetStudyType("kanji")}
                isSelected={studyType === "kanji"}
                isDual
                isFirst
              >
                Kanji
              </Button>
              <Button
                onClick={() => handleSetStudyType("vocabulary")}
                isSelected={studyType === "vocabulary"}
                isDual
                isLast
              >
                Vocabulary
              </Button>
            </TypeSelector>
          </>
        ) : (
          action === "quiz" && (
            <>
              <ButtonsContainer>
                <ButtonContainer onClick={() => handleSelectAll()}>
                  <Button monochrome disabled={allSelected}>
                    Select all
                  </Button>
                </ButtonContainer>
                <ButtonContainer onClick={() => handleDeselectAll()}>
                  <Button monochrome disabled={allDeselected}>
                    Deselect All
                  </Button>
                </ButtonContainer>
              </ButtonsContainer>
              {/* TO DO - show/hide all */}
              {/* <ButtonsContainer>
                <ButtonContainer onClick={() => handleExpandAll()}>
                  <Button monochrome disabled={allExpanded}>Show all</Button>
                </ButtonContainer>
                <ButtonContainer onClick={() => handleShrinkAll()}>
                  <Button monochrome disabled={allShrunk}>Hide All</Button>
                </ButtonContainer>
              </ButtonsContainer> */}
              <QuizListWrapper>
                {levels.map((level) => (
                  <QuizLevel key={level} level={level}>
                    <QuizType level={level} type="kanji">
                      {responseQuizLessons[level].kanji.map((lesson) => (
                        <QuizLesson
                          key={lesson.id}
                          level={level}
                          type="kanji"
                          lesson={lesson}
                          isSelected={quizSettings[level].kanji.lessons.some(
                            (obj) => obj.id === lesson.id
                          )}
                        />
                      ))}
                    </QuizType>
                    <QuizType level={level} type="vocabulary">
                      {responseQuizLessons[level].vocabulary.map((lesson) => (
                        <QuizLesson
                          key={lesson.id}
                          level={level}
                          type="vocabulary"
                          lesson={lesson}
                          isSelected={quizSettings[
                            level
                          ].vocabulary.lessons.some(
                            (obj) => obj.id === lesson.id
                          )}
                        />
                      ))}
                    </QuizType>
                  </QuizLevel>
                ))}
              </QuizListWrapper>
              <ButtonContainer onClick={() => handleStartQuiz()}>
                <Button disabled={allDeselected} loading={startQuizLoading}>
                  Start Quiz
                </Button>
              </ButtonContainer>
            </>
          )
        )}
        {(action === "study" || !action) && (
          <LessonSelector show={studyType}></LessonSelector>
        )}
      </PrimarySettings>
    </Card>
  );
};

export default LearningSettingsPage;
