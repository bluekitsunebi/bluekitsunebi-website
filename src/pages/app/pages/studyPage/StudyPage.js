import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import tw from "twin.macro";
import styled from "styled-components";
import { setStudyKanji, setStudyLesson } from "store/app/studySettingsSlice";
import {
  setCurrentKanjiIndex,
  setKanjiData,
} from "store/app/studyPageSlice";
import BackButtonComponent from "./BackButton";
import KanjiNavigator from "./KanjiNavigator";
import KanjiDetails from "./KanjiDetails";
import WordsList from "./WordsList";
import VocabularyList from "./VocabularyList";
import StartQuiz from "./StartQuiz";

const StudyPageContainer = styled.div`
  ${tw`w-full flex flex-col gap-5 sm:gap-10 items-center text-xl sm:text-3xl sm:my-auto
    justify-evenly`}
`;

const Card = styled.div`
  ${tw`flex flex-col gap-5 w-full
      justify-evenly
      sm:h-fit sm:my-auto
      sm:bg-white sm:px-16 sm:py-16 sm:gap-16 sm:rounded-3xl sm:max-w-screen-lg
      sm:min-h-52r`}
  min-height: calc(100vh - 4rem - 66px);
  @media (min-width: 640px) {
    height: auto;
  }
`;

const StudyPage = () => {
  const dispatch = useDispatch();
  const database = useSelector((state) => state.database.database);
  const level = useSelector((state) => state.studySettings.studyLevel);
  const type = useSelector((state) => state.studySettings.studyType);
  const lessonId = useSelector((state) => state.studySettings.studyLesson);
  const kanjiId = useSelector((state) => state.studySettings.studyKanji);
  const showAllKanjis = useSelector(
    (state) => state.studySettings.showAllKanjis
  );
  const kanjiList = useSelector((state) => state.studyPage.kanjiList);
  const currentKanjiIndex = useSelector(
    (state) => state.studyPage.currentKanjiIndex
  );
  const kanjiData = useSelector((state) => state.studyPage.kanjiData);
  const wordsData = useSelector((state) => state.studyPage.wordsData);

  useEffect(() => {
    if (
      currentKanjiIndex === null &&
      type === "kanji" &&
      kanjiList.length !== 0
    ) {
      dispatch(setCurrentKanjiIndex(getCurrentKajiIndex()));
    }
  }, [kanjiList]);

  useEffect(() => {
    if (type === "kanji") {
      if (currentKanjiIndex !== null && kanjiList?.length !== 0) {
        dispatch(setStudyKanji(kanjiList[currentKanjiIndex]?.idKanji));
        if (showAllKanjis && kanjiList[currentKanjiIndex]?.idLesson) {
          dispatch(setStudyLesson(kanjiList[currentKanjiIndex].idLesson));
        }
      }
    }
  }, [currentKanjiIndex]);

  useEffect(() => {
    if (type === "kanji") {
      const fetchKanjiData = async () => {
        const data = await getKanjiData();
        dispatch(setKanjiData(data));
      };
      fetchKanjiData();
    }
  }, [kanjiId]);

  const getCurrentKajiIndex = () => {
    let index = kanjiList?.findIndex((kanji) => kanji.idKanji === kanjiId);
    if (index !== -1) {
      return index;
    } else {
      return null;
    }
  };

  const getKanjiData = async () => {
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
        '", "kana_reading": "' || w.kana_reading ||
        '", "meanings": ' || w.meanings ||
        ', "priority_score": ' || kl.priority_score || '}', ', ') || ']' AS words
      FROM kanji_lessons kl
      JOIN words w ON kl.id_word = w.id
      JOIN kanjis k ON kl.id_kanji = k.id
      WHERE kl.level = "${level}" AND kl.id_lesson = ${lessonId} AND kl.id_kanji = ${kanjiId}
      GROUP BY kl.id_kanji, kl.level, kl.id_lesson;
      `;
        const stmt = database.prepare(query);
        while (stmt.step()) {
          const row = stmt.getAsObject();
          let words = [];
          try {
            words = JSON.parse(row.words);
          } catch (error) {
            console.error("Failed to convert words", error);
          }

          return {
            level: level,
            id_lesson: lessonId,
            kanji: JSON.parse(row.kanji),
            words: words,
          };
        }

        stmt.free();
      } catch (error) {
        console.error(
          `Failed to load kanji data for ${level}, lesson ${lessonId}, kanji_id ${kanjiId} from database`,
          error
        );
      }
    } else return null;
  };

  return (
    <>
      <BackButtonComponent />
      <StudyPageContainer>
        <Card>
          <KanjiNavigator />

          {type === "kanji" && !kanjiList[currentKanjiIndex]?.lessonDone && (
            <KanjiDetails />
          )}

          {type === "kanji" && kanjiData?.words?.length !== 0 && <WordsList />}

          {type === "kanji" && kanjiList[currentKanjiIndex]?.lessonDone && (
            <StartQuiz />
          )}

          {type === "vocabulary" && wordsData && wordsData.length !== 0 && (
            <>
              <VocabularyList />
              <StartQuiz />
            </>
          )}
        </Card>
      </StudyPageContainer>
    </>
  );
};

export default StudyPage;
