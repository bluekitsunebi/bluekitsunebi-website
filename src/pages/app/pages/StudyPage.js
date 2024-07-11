import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import tw from "twin.macro";
import styled, { css } from "styled-components";
import { FaAngleLeft as Previous, FaAngleRight as Next } from "react-icons/fa6";
import Button from "../Button";
import { setPage } from "store/app/appSlice";
import { setStudyKanji, setStudyLesson } from "store/app/studySettingsSlice";

const StudyPage = () => {
  const dispatch = useDispatch();
  const database = useSelector((state) => state.database.database);
  const level = useSelector((state) => state.studySettings.studyLevel);
  const lessonId = useSelector((state) => state.studySettings.studyLesson);
  const kanjiId = useSelector((state) => state.studySettings.studyKanji);
  const showAllKanjis = useSelector(
    (state) => state.studySettings.showAllKanjis
  );
  const responseStudyLessons = useSelector(
    (state) => state.studySettings.responseStudyLessons
  );
  const [kanjiData, setKanjiData] = useState(null);

  const getKanjiList = () => {
    let lesson = null;
    if (responseStudyLessons && level && lessonId) {
      lesson = responseStudyLessons[level].find(
        (lesson) => lesson.id === lessonId
      );
    }
    return lesson?.kanjis || [];
  };

  const [kanjiList, setKanjiList] = useState(getKanjiList() || []);

  const getCurrentKajiIndex = () => {
    return kanjiList?.findIndex((kanji) => kanji.id === kanjiId);
  };

  const [currentKanjiIndex, setCurrentKanjiIndex] = useState(
    getCurrentKajiIndex()
  );
  const [lessonDone, setLessonDone] = useState(false);

  const getKanjiData = () => {
    if (level && lessonId && kanjiId) {
      try {
        const query = `
      SELECT 
        kl.level, 
        kl.id_lesson,
        '{ "id": ' || kl.id_kanji || 
        ', "kanji": "' || k.kanji || 
        '", "meanings": ' || k.meanings || 
        ', "kun_readings": ' || IFNULL(k.kun_readings, '[]') ||  
        ', "on_readings": ' || IFNULL(k.on_readings, '[]') || '}' AS kanji,
        '[' || GROUP_CONCAT('{ "id": ' || kl.id_word || 
        ', "word": "' || w.word || 
        '", "reading": "' || w.reading || 
        '", "meanings": ' || w.meanings || '}', ', ') || ']' AS words 
      FROM kanji_lessons kl
      JOIN words w ON kl.id_word = w.id
      JOIN kanjis k ON kl.id_kanji = k.id
      WHERE kl.level = "${level}" AND kl.id_lesson = ${lessonId} AND kl.id_kanji = ${kanjiId}
      GROUP BY kl.id_kanji, kl.level, kl.id_lesson;
      `;
        const stmt = database.prepare(query);
        while (stmt.step()) {
          const row = stmt.getAsObject();
          setKanjiData({
            level: level,
            id_lesson: lessonId,
            kanji: JSON.parse(row.kanji),
            words: JSON.parse(row.words),
          });
        }

        stmt.free();
      } catch (error) {
        console.error(
          `Failed to load kanji data for ${level}, lesson ${lessonId}, kanji_id ${kanjiId} from database`,
          error
        );
      }
    } else setKanjiData(null);
  };

  const handleBackToLessons = () => {
    dispatch(setPage("learningSettings"));
    showAllKanjis && dispatch(setStudyLesson(null));
  };

  const previousKanji = () => {
    if (currentKanjiIndex > 0 && !lessonDone) {
      dispatch(setStudyKanji(kanjiList[currentKanjiIndex - 1].id));
      setCurrentKanjiIndex(currentKanjiIndex - 1);
    } else if (lessonDone) {
      setLessonDone(false);
    }
  };

  const nextKanji = () => {
    if (!showAllKanjis) {
      if (
        currentKanjiIndex !== -1 &&
        currentKanjiIndex < kanjiList?.length - 1
      ) {
        dispatch(setStudyKanji(kanjiList[currentKanjiIndex + 1].id));
        setCurrentKanjiIndex(currentKanjiIndex + 1);
      } else if (
        currentKanjiIndex !== -1 &&
        currentKanjiIndex === kanjiList?.length - 1
      ) {
        setLessonDone(true);
      }
    } else {
      if (lessonId < responseStudyLessons[level].length) {
        if (
          currentKanjiIndex !== -1 &&
          currentKanjiIndex < kanjiList.length - 1
        ) {
          setCurrentKanjiIndex(currentKanjiIndex + 1);
        } else if (
          currentKanjiIndex !== -1 &&
          currentKanjiIndex === kanjiList.length - 1
        ) {
          dispatch(setStudyLesson(lessonId + 1));
          setCurrentKanjiIndex(0);
        }
      } else if (lessonId === responseStudyLessons[level].length) {
        if (
          currentKanjiIndex !== -1 &&
          currentKanjiIndex < kanjiList.length - 1
        ) {
          setCurrentKanjiIndex(currentKanjiIndex + 1);
        } else if (
          currentKanjiIndex !== -1 &&
          currentKanjiIndex === kanjiList.length - 1
        ) {
          dispatch(setStudyLesson(null));
          setKanjiList([]);
          setCurrentKanjiIndex(null);
          dispatch(setStudyKanji(null));
          setLessonDone(true);
        }
      }
    }
  };

  useEffect(() => {
    lessonId && setKanjiList(getKanjiList());
  }, [lessonId]);

  useEffect(() => {
    console.log("kanjiList: ", kanjiList);
    console.log("currentKanjiIndex: ", currentKanjiIndex);
    kanjiList &&
      kanjiList?.lenght !== 0 &&
      (currentKanjiIndex || currentKanjiIndex === 0) &&
      dispatch(setStudyKanji(kanjiList[currentKanjiIndex]?.id));
  }, [kanjiList, currentKanjiIndex]);

  useEffect(() => {
    kanjiId && getKanjiData();
    console.log("kanjiId: ", kanjiId);
    console.log("currentKanjiIndex: ", currentKanjiIndex);
    console.log("kanjiList: ", kanjiList);
    console.log("lessonId: ", lessonId);
  }, [kanjiId]);

  const StudyPageContainer = styled.div`
    ${tw`w-full flex flex-col gap-5 sm:gap-10 items-center text-xl sm:text-3xl sm:my-auto
    justify-evenly`}
    height: calc(100vh - 8rem);
    @media (min-width: 640px) {
      height: auto;
    }
  `;

  const BackButtonContainer = styled.div`
    ${tw`w-full mr-auto mb-5 sm:mb-8`}
  `;

  const BackButton = styled.div`
    ${tw`w-fit`}
  `;

  const Card = styled.div`
    ${tw`flex flex-col gap-5 w-full h-full
      justify-evenly
      sm:h-fit sm:my-auto
      sm:bg-white sm:px-16 sm:py-16 sm:gap-16 sm:rounded-3xl sm:max-w-screen-lg
      sm:min-h-52r`}
  `;

  const KanjiContainer = styled.div`
    ${tw`flex flex-row gap-2 text-center w-full justify-between items-center h-36 sm:gap-10`}
  `;

  const Icon = styled.div`
    ${tw`text-primary-300 cursor-pointer border rounded-full border-primary-300 p-1 transition-colors duration-300

    hover:bg-primary-300 
    hover:text-white
    active:bg-primary-300 
    active:text-white
    focus:bg-primary-300 
    focus:text-white
    `}
    border-width: 3px;
    @media (min-width: 640px) {
      border-width: 0.5rem;
    }
    ${({ hide }) =>
      hide &&
      css`
        ${tw`opacity-50 cursor-default pointer-events-none`}
      `}
  `;

  const PreviousIcon = styled(Previous)`
    ${tw`w-6 h-6  sm:w-16 sm:h-16`}
  `;

  const NextIcon = styled(Next)`
    ${tw`w-6 h-6 sm:w-16 sm:h-16`}
  `;

  const KanjiSymbol = styled.div`
    ${tw`font-thin text-gray-800`}
    line-height: 90%;
    font-size: 8rem;
    @media (min-width: 640px) {
      font-size: 10rem;
    }
  `;

  const MainDetails = styled.div`
    ${tw`flex flex-col items-center gap-2 sm:gap-4 mx-auto min-h-28 sm:min-h-44 bg-red-500`}
  `;

  const TitleContainer = styled.div`
    ${tw`flex flex-col items-center text-gray-800`}
  `;

  const Title = styled.div`
    ${tw`text-xl sm:text-4xl`}
  `;

  const WordsList = styled.div`
    ${tw`w-full border border-primary-100 rounded p-2 sm:px-8 sm:py-4 border-4
    overflow-y-auto h-64 min-h-64 bg-white
    flex flex-col gap-2 sm:gap-0
    `}
    ${({ hide }) =>
      hide &&
      css`
        ${tw`opacity-0 cursor-default pointer-events-none`}
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

  const StartQuizContainer = styled.div`
    ${tw`w-full flex flex-col items-center justify-center min-h-28 sm:min-h-44`}
  `;

  const StartQuizButtonContainer = styled.div`
    ${tw``}
  `;

  return (
    <>
      <BackButtonContainer>
        <BackButton>
          <Button onClick={() => handleBackToLessons()} full>
            Back to lessons
          </Button>
        </BackButton>
      </BackButtonContainer>
      <StudyPageContainer>
        <Card>
          <KanjiContainer>
            <Icon
              hide={
                !showAllKanjis
                  ? currentKanjiIndex === 0
                  : lessonId === 1 && currentKanjiIndex === 1
              }
            >
              <PreviousIcon onClick={() => previousKanji()}></PreviousIcon>
            </Icon>
            {!lessonDone ? (
              <KanjiSymbol>{kanjiData?.kanji.kanji}</KanjiSymbol>
            ) : (
              <TitleContainer>
                <Title>Lesson done.</Title>
                <Title>Ready for the quiz?</Title>
              </TitleContainer>
            )}
            <Icon hide={lessonDone}>
              <NextIcon onClick={() => nextKanji()}></NextIcon>
            </Icon>
          </KanjiContainer>

          <>
            {!lessonDone ? (
              <MainDetails>
                <div>
                  {kanjiData?.kanji.meanings.length > 3
                    ? kanjiData?.kanji.meanings.slice(0, 3).join(", ")
                    : kanjiData?.kanji.meanings.join(", ")}
                </div>

                {kanjiData?.kanji.kun_readings.length !== 0 && (
                  <div>
                    <b>kun:</b> {kanjiData?.kanji.kun_readings.join(", ")}
                  </div>
                )}
                {kanjiData?.kanji.on_readings.length !== 0 && (
                  <div>
                    <b>on:</b> {kanjiData?.kanji.on_readings.join(", ")}
                  </div>
                )}
              </MainDetails>
            ) : (
              <StartQuizContainer>
                <StartQuizButtonContainer>
                  <Button full>Start quiz</Button>
                </StartQuizButtonContainer>
              </StartQuizContainer>
            )}

            {kanjiData?.words?.length !== 0 && (
              <WordsList hide={lessonDone}>
                {kanjiData?.words.map((word) => (
                  <div key={word.id}>
                    {word.word} ({word.reading}) = {word.meanings.join(", ")}
                  </div>
                ))}
              </WordsList>
            )}
          </>
        </Card>
      </StudyPageContainer>
    </>
  );
};

export default StudyPage;
