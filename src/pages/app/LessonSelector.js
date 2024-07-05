import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  setResponseStudyLessons,
  setStudyLesson,
} from "store/app/studySettingsSlice";
import Button from "./Button";
import {
  IoCaretDownCircleOutline,
  IoCaretUpCircleOutline,
} from "react-icons/io5";

const LessonSelectorWrapper = styled.div`
  ${tw`flex flex-col justify-start gap-4  h-96 overflow-y-auto border border-primary-500 p-4 w-full
    sm:flex-row sm:flex-wrap sm:justify-start`}
  ${({ show }) =>
    !show &&
    css`
      ${tw`opacity-0 pointer-events-none`}
    `}
  ${({ showAllLessons }) =>
    !showAllLessons &&
    css`
      padding-right: 1.9rem;
    `}
`;

const LessonContainer = styled.div`
  ${tw`flex flex-row gap-5 items-center h-fit`}
  ${({ isSelected }) =>
    isSelected &&
    css`
      ${tw`w-full`}
    `}
`;

const LessonName = styled.span`
  ${tw`flex flex-row justify-center gap-2 w-24`}
`;

const KanjisContainer = styled.span`
  ${tw`flex flex-row gap-5 w-full`}
`;

const Kanji = styled.span`
  ${tw``}
`;

const CaretDown = styled(IoCaretDownCircleOutline)`
  ${tw`text-primary-500 w-8 h-8 cursor-pointer`}
`;

const CaretUp = styled(IoCaretUpCircleOutline)`
  ${tw`text-primary-500 w-8 h-8 cursor-pointer`}
`;

const LessonSelector = ({ show }) => {
  const dispatch = useDispatch();
  const database = useSelector((state) => state.database.database);

  useEffect(() => {
    try {
      const query = `
      SELECT 
    kl.level, 
    kl.id_lesson, 
    '[' || GROUP_CONCAT('{"id": ' || kl.id_kanji || ', "kanji": "' || k.kanji || '"}', ', ') || ']' as kanjis
FROM 
    (SELECT DISTINCT level, id_lesson, id_kanji FROM kanji_lessons) kl
JOIN 
    kanjis k ON kl.id_kanji = k.id
GROUP BY 
    kl.level, 
    kl.id_lesson
ORDER BY 
    kl.level DESC, 
    kl.id_lesson ASC;
      `;
      const stmt = database.prepare(query);
      const lessons = [];
      while (stmt.step()) {
        const row = stmt.getAsObject();
        const kanjis = JSON.parse(row.kanjis);
        console.log(row);
        lessons.push({
          id: row.id_lesson,
          level: row.level,
          kanjis: kanjis,
        });
      }
      console.log("lessons: ", lessons);
      dispatch(setResponseStudyLessons(lessons));
      stmt.free();
    } catch (error) {
      console.error("Failed to load lessons from database", error);
    }
  }, []);
  const responseStudyLessons = useSelector(
    (state) => state.studySettings.responseStudyLessons
  );
  const studyLesson = useSelector((state) => state.studySettings.studyLesson);
  const handleSetStudyLesson = (lessons) => {
    dispatch(setStudyLesson(lessons));
  };
  const handleShowAllLessons = () => {
    setShowAllLessons(!showAllLessons);
  };

  const [showAllLessons, setShowAllLessons] = useState(false);

  return (
    <LessonSelectorWrapper show={show} showAllLessons={showAllLessons}>
      {responseStudyLessons.map(
        (lesson) =>
          (!studyLesson ||
            (studyLesson && (studyLesson === lesson.id || showAllLessons))) && (
            <LessonContainer
              isSelected={studyLesson === lesson.id}
              key={`${lesson.id} ${lesson.level}`}
            >
              <Button
                onClick={() => {
                  handleSetStudyLesson(lesson.id);
                  handleShowAllLessons();
                }}
                isSelected={studyLesson === lesson.id}
                isLessonSelector
              >
                <LessonName>Lesson {lesson.id}</LessonName>
                <KanjisContainer>
                  {studyLesson === lesson.id &&
                    lesson?.kanjis &&
                    lesson.kanjis.map((kanji) => (
                      <Kanji key={`${lesson.id} ${lesson.level} ${kanji.id}`}>{kanji.kanji}</Kanji>
                    ))}
                </KanjisContainer>
              </Button>
              {studyLesson && studyLesson === lesson.id && (
                <div onClick={() => handleShowAllLessons()}>
                  {!showAllLessons ? (
                    <CaretDown></CaretDown>
                  ) : (
                    <CaretUp></CaretUp>
                  )}
                </div>
              )}
            </LessonContainer>
          )
      )}
    </LessonSelectorWrapper>
  );
};

export default LessonSelector;
