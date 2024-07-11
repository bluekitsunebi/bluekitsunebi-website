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
  flex flex-col gap-5 w-full justify-start
  h-144 min-h-144 sm:h-128 sm:min-h-128`}
  ${({ show }) =>
    !show &&
    css`
      ${tw`opacity-0 pointer-events-none border-none`}
    `}
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
      ${tw`opacity-50 cursor-default pointer-events-none`}
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
  ${tw`flex flex-col gap-4 p-4   
  sm:flex-row sm:flex-wrap sm:content-start

  bg-white
  h-full 
  border border-primary-500 rounded overflow-y-auto 

  
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
    flex flex-col gap-4 p-4 items-center
    bg-white
    border border-primary-500 rounded overflow-y-auto
  `}
  ${({ showAllKanjis }) =>
    showAllKanjis ?
    css`
      ${tw`h-full`}
    ` :
    css`
      ${tw`h-fit`}
    `}
  min-height: 7.75rem;

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

const KanjiList = styled.div`
  ${tw`
    w-full h-fit
    flex flex-row flex-wrap
    gap-4 justify-evenly
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
  const studyKanji = useSelector((state) => state.studySettings.studyKanji);
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

  const handleSetStudyLesson = (lessonId) => {
    dispatch(setStudyLesson(lessonId));
    setShowAllLessons(false);
    dispatch(setShowAllKanjis(false));
  };

  

  const nextLesson = () => {
    dispatch(setShowAllKanjis(false));

    if (!showAllKanjis) {
      if (studyLesson < responseStudyLessons[studyLevel]?.length) {
        dispatch(setStudyLesson(studyLesson + 1));
      }
    } else {
      dispatch(setStudyLesson(1));
    }
  };

  const previousLesson = () => {
    if (studyLesson && studyLesson > 1) {
      dispatch(setStudyLesson(studyLesson - 1));
    } else if (studyLesson === 1) {
      dispatch(setStudyLesson(null));
      dispatch(setShowAllKanjis(true));
    }
  };

  const handleShowAllLessons = (showAll) => {
    setShowAllLessons(showAll);
  };

  const handleShowAllKanjis = async (showAllKanjis = !showAllKanjis) => {
    if (getAllLessons) {
      await Promise.all(
        levels.map((level) => {
          getLessons(level);
        })
      );
    }
    setGetAllLessons(true);
    setShowAllLessons(false);
    dispatch(setShowAllKanjis(showAllKanjis));
    dispatch(setStudyLesson(null));
  };

  const goToKanjiPage = (idKanji, idLesson) => {
    idLesson && dispatch(setStudyLesson(idLesson));
    dispatch(setStudyKanji(idKanji));
    console.log(studyLevel, studyLesson || idLesson, studyKanji || idKanji);
    if(studyLevel && (studyLesson || idLesson) && (studyKanji || idKanji)){
      dispatch(setPage("study"));
    }
  };

  return (
    <LessonSelectorWrapper show={show}>
      {(studyLesson || showAllKanjis) && (
        <SelectedLesson>
          <MobileBrowseLessons>
            <Icon hide={showAllKanjis}>
              <PreviousIcon onClick={() => previousLesson()}></PreviousIcon>
            </Icon>
            <MobileIcon>
              <Icon
                hide={studyLesson === responseStudyLessons[studyLevel]?.length}
              >
                <NextIcon onClick={() => nextLesson()}></NextIcon>
              </Icon>
            </MobileIcon>
          </MobileBrowseLessons>

          <NameAndExpand>
            <Button
              onClick={() => {
                handleShowAllLessons(!showAllLessons);
              }}
              monochrome
            >
              <LessonName isSelected={studyLesson}>
                Selected:
                {!showAllKanjis ? ` Lesson ${studyLesson}` : " All lessons"}
              </LessonName>
            </Button>
            {(studyLesson || showAllKanjis) && (
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
              <NextIcon onClick={() => nextLesson()}></NextIcon>
            </Icon>
          </DesktopIcon>
        </SelectedLesson>
      )}

      {((!studyLesson && !showAllKanjis) || showAllLessons) &&
        responseStudyLessons[studyLevel]?.length !== 0 && (
          <>
            <Lessons>
              <LessonContainer
                onClick={() => handleShowAllKanjis(true)}
                isSelected={showAllKanjis}
                key={`allLessons`}
              >
                <Button isSelected={showAllKanjis} isLessonSelector>
                  <LessonName isSelected={showAllKanjis}>
                    All lessons
                  </LessonName>
                </Button>
              </LessonContainer>

              {responseStudyLessons[studyLevel]?.map((lesson) => (
                <LessonContainer
                  onClick={() => {
                    handleSetStudyLesson(lesson.id);
                    handleShowAllLessons(false);
                  }}
                  isSelected={studyLesson === lesson.id}
                  key={`${lesson.id} ${studyLevel}`}
                >
                  <Button
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

      {studyLevel &&
        (studyLesson || showAllKanjis) &&
        responseStudyLessons[studyLevel]?.length !== 0 && (
          <KanjisContainer showAllKanjis={showAllKanjis}>
            <KanjiList>
              {!showAllKanjis && studyLesson
                ? responseStudyLessons[studyLevel]
                    .find((lesson) => lesson.id === studyLesson)
                    .kanjis.map((kanji) => (
                      <Kanji
                        key={`${kanji.id}`}
                        onClick={() => goToKanjiPage(kanji.id)}
                      >
                        <Button monochrome isKanji>
                          {kanji.kanji}
                        </Button>
                      </Kanji>
                    ))
                : responseStudyLessons[studyLevel].map((kanjiLesson) =>
                    kanjiLesson.kanjis.map((kanji) => (
                      <Kanji
                        key={`${kanji.id}`}
                        onClick={() => goToKanjiPage(kanji.id, kanjiLesson.id)}
                      >
                        <Button monochrome isKanji>
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
