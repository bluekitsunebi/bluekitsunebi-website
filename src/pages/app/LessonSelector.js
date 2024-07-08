import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  setResponseStudyLessons,
  setStudyLesson,
  setStudyKanji,
  setShowAllKanjis,
} from "store/app/studySettingsSlice";
import { setPage } from "store/app/appSlice";
import Button from "./Button";
import {
  IoCaretDownCircleOutline,
  IoCaretUpCircleOutline,
} from "react-icons/io5";
import {
  PiArrowCircleLeft as Previous,
  PiArrowCircleRight as Next,
} from "react-icons/pi";

const LessonSelectorWrapper = styled.div`
  ${tw`
  flex flex-col gap-10 min-h-144 h-144 s:min-h-128 s:h-128 overflow-y-auto p-8 w-full border border-primary-500 justify-start bg-white`}
  ${({ show }) =>
    !show &&
    css`
      ${tw`opacity-0 pointer-events-none border-none`}
    `}
  scrollbar-gutter: stable;

  /* Custom scrollbar styles */
  &::-webkit-scrollbar {
    width: 12px; /* Width of the scrollbar */
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    width: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #8bd1ff;
    border-radius: 20px;
    border: 3px solid transparent;
    background-clip: content-box;
  }
`;

const SelectedLesson = styled.div`
  ${tw`flex s:flex-row h-fit items-center gap-2 w-full
  flex-col`}
`;

const NameAndExpand = styled.div`
  ${tw`flex flex-row gap-2 w-full items-center`}
`;

const LessonName = styled.span`
  ${tw`flex flex-row justify-center gap-2`}
  ${({ isSelected }) =>
    isSelected &&
    css`
      ${tw`w-full`}
    `}
`;

const Icon = styled.div`
  ${tw`text-gray-600 cursor-pointer`}
  ${({ hide }) =>
    hide &&
    css`
      ${tw`opacity-0 cursor-default pointer-events-none`}
    `}
`;

const DesktopIcon = styled.div`
  ${tw`hidden s:inline-block`}
`;

const MobileIcon = styled.div`
  ${tw`s:hidden`}
`;

const CaretDown = styled(IoCaretDownCircleOutline)`
  ${tw`w-8 h-8`}
`;

const CaretUp = styled(IoCaretUpCircleOutline)`
  ${tw`w-8 h-8`}
`;

const MobileBrowseLessons = styled.div`
  ${tw`flex flex-row w-full s:w-fit justify-between`}
`;

const PreviousIcon = styled(Previous)`
  ${tw`w-8 h-8`}
`;

const NextIcon = styled(Next)`
  ${tw`w-8 h-8`}
`;

const Lessons = styled.div`
  ${tw`flex flex-col justify-start gap-4    
  sm:flex-row sm:flex-wrap sm:justify-start`}
`;

const LessonContainer = styled.div`
  ${tw`flex flex-row h-fit items-center gap-2`}
  ${({ isSelected }) =>
    isSelected &&
    css`
      ${tw``}
    `}
`;

const KanjisContainer = styled.div`
  ${tw`
    flex flex-col gap-4 items-center
  `}
`;

const KanjiList = styled.div`
  ${tw`
    w-full h-fit
    flex flex-row flex-wrap
    gap-4 justify-evenly
  `}
`;

const ShowAllKanji = styled.div`
  ${tw`
    w-full s:w-fit
  `}
`;

const Kanji = styled.span`
  ${tw`text-gray-700 cursor-pointer text-5xl h-fit w-fit inline-block`}
`;

const LessonSelector = ({ show }) => {
  const dispatch = useDispatch();
  const database = useSelector((state) => state.database.database);
  const levels = useSelector((state) => state.studySettings.levels);
  const studyLevel = useSelector((state) => state.studySettings.studyLevel);
  const studyLesson = useSelector((state) => state.studySettings.studyLesson);
  const responseStudyLessons = useSelector(
    (state) => state.studySettings.responseStudyLessons
  );
  const showAllKanjis = useSelector(
    (state) => state.studySettings.showAllKanjis
  );

  const getLessons = async (level = studyLevel) => {
    if (level && responseStudyLessons[level].length === 0) {
      try {
        const query = `
      SELECT kl.id_lesson, 
      '[' || GROUP_CONCAT('{"id": ' || kl.id_kanji || ', "kanji": "' || k.kanji || '"}', ', ') || ']' as kanjis
      FROM (
        SELECT DISTINCT level, id_lesson, id_kanji 
        FROM kanji_lessons
        WHERE level = '${level}'
      ) kl
      JOIN kanjis k ON kl.id_kanji = k.id
      GROUP BY kl.level, kl.id_lesson
      ORDER BY kl.level DESC, kl.id_lesson ASC;
      `;
        const stmt = database.prepare(query);
        const lessons = [];
        while (stmt.step()) {
          const row = stmt.getAsObject();
          const kanjis = JSON.parse(row.kanjis);
          lessons.push({
            id: row.id_lesson,
            kanjis: kanjis,
          });
        }
        dispatch(setResponseStudyLessons({ lessons: lessons, level: level }));
        stmt.free();
      } catch (error) {
        console.error(
          `Failed to load lessons for ${level} from database`,
          error
        );
      }
    }
  };

  useEffect(() => {
    getLessons();
  }, [studyLevel]);

  const [showAllLessons, setShowAllLessons] = useState(false);

  const [getAllLessons, setGetAllLessons] = useState(false);

  const handleSetStudyLesson = (lessons) => {
    dispatch(setStudyLesson(lessons));
    setShowAllLessons(false);
    dispatch(setShowAllKanjis(false));
  };
  const handleShowAllLessons = (showAll) => {
    setShowAllLessons(showAll);
  };

  const handleShowAllKanjis = async () => {
    if (getAllLessons) {
      await Promise.all(
        levels.map((level) => {
          getLessons(level);
        })
      );
    }
    setGetAllLessons(true);
    setShowAllLessons(false);
    dispatch(setShowAllKanjis(!showAllKanjis));
  };

  const goToKanjiPage = (idKanji) => {
    dispatch(setPage("study"));
    dispatch(setStudyKanji(idKanji));
  };

  return (
    <LessonSelectorWrapper show={show}>
      {studyLesson && (
        <SelectedLesson>
          <MobileBrowseLessons>
            <Icon hide={studyLesson === 1}>
              <PreviousIcon
                onClick={() => handleSetStudyLesson(studyLesson - 1)}
              ></PreviousIcon>
            </Icon>
            <MobileIcon>
              <Icon
                hide={studyLesson === responseStudyLessons[studyLevel]?.length}
              >
                <NextIcon
                  onClick={() => handleSetStudyLesson(studyLesson + 1)}
                ></NextIcon>
              </Icon>
            </MobileIcon>
          </MobileBrowseLessons>

          <NameAndExpand>
            <Button
              onClick={() => {
                handleShowAllLessons(!showAllLessons);
                handleSetStudyLesson(studyLesson);
              }}
              monochrome
            >
              <LessonName isSelected={studyLesson}>
                Selected: Lesson {studyLesson}
              </LessonName>
            </Button>
            {studyLesson && (
              <Icon onClick={() => handleShowAllLessons(!showAllLessons)}>
                {!showAllLessons ? (
                  <CaretDown></CaretDown>
                ) : (
                  <CaretUp></CaretUp>
                )}
              </Icon>
            )}
          </NameAndExpand>

          <DesktopIcon>
            <Icon
              hide={studyLesson === responseStudyLessons[studyLevel]?.length}
            >
              <NextIcon
                onClick={() => handleSetStudyLesson(studyLesson + 1)}
              ></NextIcon>
            </Icon>
          </DesktopIcon>
        </SelectedLesson>
      )}

      {studyLevel &&
        (!studyLesson || (studyLesson && showAllLessons)) &&
        responseStudyLessons[studyLevel]?.length !== 0 && (
          <>
            <Lessons>
              {responseStudyLessons[studyLevel]?.map((lesson) => (
                <LessonContainer
                  isSelected={studyLesson === lesson.id}
                  key={`${lesson.id} ${studyLevel}`}
                >
                  <Button
                    onClick={() => {
                      handleSetStudyLesson(lesson.id);
                      handleShowAllLessons(false);
                    }}
                    isSelected={studyLesson === lesson.id}
                    isLessonSelector
                  >
                    <LessonName isSelected={studyLesson === lesson.id}>
                      Lesson {lesson.id}
                    </LessonName>
                  </Button>
                </LessonContainer>
              ))}
            </Lessons>
          </>
        )}

      {studyLesson && responseStudyLessons[studyLevel]?.length !== 0 && (
        <KanjisContainer>
          <ShowAllKanji>
            <Button monochrome onClick={() => handleShowAllKanjis()}>
              {!showAllKanjis
                ? `Show all kanji for ${studyLevel}`
                : `Show kanji only for Lesson ${studyLesson}`}
            </Button>
          </ShowAllKanji>
          <KanjiList>
            {!showAllKanjis
              ? responseStudyLessons[studyLevel]
                  .find((lesson) => lesson.id === studyLesson)
                  ?.kanjis.map((kanji) => (
                    <Kanji key={`${kanji.id}`} onClick={() => goToKanjiPage(kanji.id)}>
                      <Button monochrome fontsizeNormal>
                        {kanji.kanji}
                      </Button>
                    </Kanji>
                  ))
              : responseStudyLessons[studyLevel].map((kanjiLesson) =>
                  kanjiLesson.kanjis.map((kanji) => (
                    <Kanji key={`${kanji.id}`} onClick={() => goToKanjiPage(kanji.id)}>
                      <Button monochrome fontsizeNormal>
                        {kanji.kanji}
                      </Button>
                    </Kanji>
                  ))
                )}
          </KanjiList>
        </KanjisContainer>
      )}
    </LessonSelectorWrapper>
  );
};

export default LessonSelector;
