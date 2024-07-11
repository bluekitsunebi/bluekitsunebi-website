import React, { useEffect } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  setStudyLevel,
  setStudyType,
  setResponseQuizLessons,
  setStudyLesson,
  setShowAllKanjis,
} from "store/app/studySettingsSlice";
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

const LearningSettingsPage = () => {
  const dispatch = useDispatch();
  const levels = useSelector((state) => state.studySettings.levels);
  const responseQuizLessons = useSelector(
    (state) => state.studySettings.responseQuizLessons
  );

  useEffect(() => {
    dispatch(
      setResponseQuizLessons({
        N5: {
          kanji: [{ id: 1 }],
          vocabulary: [{ id: 2 }, { id: 3 }, { id: 4 }],
        },
        N4: {
          kanji: [{ id: 5 }, { id: 6 }],
          vocabulary: [{ id: 7 }, { id: 8 }],
        },
        N3: {
          kanji: [{ id: 7 }, { id: 8 }],
          vocabulary: [{ id: 9 }, { id: 10 }],
        },
        N2: {
          kanji: [{ id: 11 }, { id: 12 }],
          vocabulary: [{ id: 13 }, { id: 14 }],
        },
        N1: {
          kanji: [{ id: 15 }, { id: 16 }],
          vocabulary: [{ id: 17 }, { id: 18 }],
        },
      })
    );
  }, []);

  const action = useSelector((state) => state.studySettings.action);
  const studyLevel = useSelector((state) => state.studySettings.studyLevel);
  const studyType = useSelector((state) => state.studySettings.studyType);

  const quizSettings = useSelector((state) => state.studySettings.quizSettings);

  const handleSetStudyType = (type) => {
    dispatch(setStudyType(type));
  };
  const handleSetStudyLevel = (level) => {
    dispatch(setStudyLevel(level));
  };

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
                <Button begin>Start</Button>
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
