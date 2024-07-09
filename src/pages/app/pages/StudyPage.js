import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import tw from "twin.macro";
import styled, { css } from "styled-components";
import { FaAngleLeft as Previous, FaAngleRight as Next } from "react-icons/fa6";
import Button from "../Button";
import { setPage } from "store/app/appSlice";
import { setStudyKanji } from "store/app/studySettingsSlice";

const StudyPage = () => {
  const dispatch = useDispatch();
  const database = useSelector((state) => state.database.database);
  const level = useSelector((state) => state.studySettings.studyLevel);
  const lessonId = useSelector((state) => state.studySettings.studyLesson);
  const kanjiId = useSelector((state) => state.studySettings.studyKanji);
  const responseStudyLessons = useSelector(
    (state) => state.studySettings.responseStudyLessons
  );
  const [kanjiData, setKanjiData] = useState(null);

  const getKanjiList = () => {
    const lesson = responseStudyLessons[level].find(
      (lesson) => lesson.id === lessonId
    );
    return lesson.kanjis;
  };

  const kanjiList = getKanjiList();

  const getCurrentKajiIndex = () => {
    return kanjiList.findIndex((kanji) => kanji.id === kanjiId);
  };

  const [currentKanjiIndex, setCurrentKanjiIndex] = useState(
    getCurrentKajiIndex()
  );
  const [lessonDone, setLessonDone] = useState(false);

  const getKanjiData = () => {
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
  };

  useEffect(() => {
    getKanjiData();
  }, [currentKanjiIndex]);

  const previousKanji = () => {
    if (currentKanjiIndex > 0 && !lessonDone) {
      dispatch(setStudyKanji(kanjiList[currentKanjiIndex - 1].id));
      setCurrentKanjiIndex(currentKanjiIndex - 1);
    } else if (lessonDone) {
      setLessonDone(false);
    }
  };

  const nextKanji = () => {
    if (currentKanjiIndex !== -1 && currentKanjiIndex < kanjiList.length - 1) {
      dispatch(setStudyKanji(kanjiList[currentKanjiIndex + 1].id));
      setCurrentKanjiIndex(currentKanjiIndex + 1);
    } else if (
      currentKanjiIndex !== -1 &&
      currentKanjiIndex === kanjiList.length - 1
    ) {
      setLessonDone(true);
    }
  };

  const StudyPageContainer = styled.div`
    ${tw`w-full h-full flex flex-col gap-20`}
  `;

  const BackButton = styled.div`
    ${tw`w-fit`}
  `;

  const KanjiContainer = styled.div`
    ${tw`flex flex-row gap-20 text-center w-full justify-between items-center min-h-15r`}
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
    border-width: 0.5rem;
    ${({ hide }) =>
      hide &&
      css`
        ${tw`opacity-0 cursor-default pointer-events-none`}
      `}
  `;

  const PreviousIcon = styled(Previous)`
    ${tw`w-16 h-16`}
  `;

  const NextIcon = styled(Next)`
    ${tw`w-16 h-16`}
  `;

  const KanjiSymbol = styled.div`
    ${tw`font-thin text-gray-800`}
    font-size: 10rem;
  `;

  const KanjiDetails = styled.div`
    ${tw`w-full flex flex-col items-center gap-20`}
  `;

  const MainDetails = styled.div`
    ${tw`w-fit flex flex-col gap-2 border border-gray-500 rounded p-8 border-4`}
  `;

  const TitleContainer = styled.div`
    ${tw`flex flex-col items-center text-gray-800`}
  `;

  const Title = styled.div`
    ${tw`text-6xl`}
  `;

  const WordsContainer = styled.div`
    ${tw`w-full flex flex-col gap-8 border border-gray-500 rounded p-8 border-4`}
  `;

  const WordsListContainer = styled.div`
    ${tw`flex flex-row justify-evenly gap-8`}
  `;

  const WordsList = styled.div`
    ${tw`w-full flex flex-col gap-2`}
  `;

  const StartQuizContainer = styled.div`
    ${tw`h-full w-full flex flex-row justify-center`}
  `;

  const StartQuizButtonContainer = styled.div`
    ${tw`h-full w-fit`}
  `;


  

  return (
    <StudyPageContainer>
      <BackButton>
        <Button onClick={() => dispatch(setPage("learningSettings"))} full>
          Back to lessons
        </Button>
      </BackButton>
      <KanjiContainer>
        <Icon hide={currentKanjiIndex === 0}>
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

      {!lessonDone ? (
        <KanjiDetails>
          <MainDetails>
            <div>meanings: {kanjiData?.kanji.meanings}</div>

            {kanjiData?.kanji.kun_readings.length !== 0 && (
              <div>kun: {kanjiData?.kanji.kun_readings.join(", ")}</div>
            )}
            {kanjiData?.kanji.on_readings.length !== 0 && (
              <div>on: {kanjiData?.kanji.on_readings.join(", ")}</div>
            )}
          </MainDetails>

          {kanjiData?.words?.length !== 0 && (
            <WordsContainer>
              <div>words:</div>
              <WordsListContainer>
                <WordsList>
                  {kanjiData?.words
                    .slice(0, Math.ceil(kanjiData?.words.length / 2))
                    .map((word) => (
                      <div key={word.id}>
                        {word.word} ({word.reading}) = {word.meanings}
                      </div>
                    ))}
                </WordsList>
                <WordsList>
                  {kanjiData?.words
                    .slice(Math.ceil(kanjiData?.words.length / 2))
                    .map((word) => (
                      <div key={word.id}>
                        {word.word} ({word.reading}) = {word.meanings}
                      </div>
                    ))}
                </WordsList>
              </WordsListContainer>
            </WordsContainer>
          )}
        </KanjiDetails>
      ) : (
        <StartQuizContainer>
          <StartQuizButtonContainer>
            <Button full>start quiz</Button>
          </StartQuizButtonContainer>
        </StartQuizContainer>
      )}
    </StudyPageContainer>
  );
};

export default StudyPage;
