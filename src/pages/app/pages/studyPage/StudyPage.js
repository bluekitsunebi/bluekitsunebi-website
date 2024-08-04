import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import tw from "twin.macro";
import styled from "styled-components";
import { setPage } from "store/app/appSlice";
import { setStudyKanji, setStudyLesson } from "store/app/studySettingsSlice";
import {
  setKanjiList,
  setCurrentKanjiIndex,
  setKanjiData,
  setWordsData,
  reset,
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
  const responseStudyKanjiLessons = useSelector(
    (state) => state.studySettings.responseStudyKanjiLessons
  );
  const responseStudyVocabularyLessons = useSelector(
    (state) => state.studySettings.responseStudyVocabularyLessons
  );
  const kanjiList = useSelector((state) => state.studyPage.kanjiList);
  const currentKanjiIndex = useSelector(
    (state) => state.studyPage.currentKanjiIndex
  );
  const kanjiData = useSelector((state) => state.studyPage.kanjiData);
  const wordsData = useSelector((state) => state.studyPage.wordsData);
  const fetchWordsData = async (newLessonId = lessonId) => {
    const data = await getWordsData(newLessonId);
    dispatch(setWordsData(data));
  };

  useEffect(() => {
    if (type === "kanji") {
      dispatch(setKanjiList(getKanjiList()));
    } else if (type === "vocabulary") {
      fetchWordsData();
    }
  }, []);

  const getWordsData = async (newLessonId) => {
    if (level && newLessonId) {
      try {
        const query = `
          SELECT 
            w.id,
            w.word,
            w.meanings,
            w.parts_of_speech,
            w.kana_reading,
            w.usually_kana,
            vl.priority_score
          FROM 
            vocab_lessons vl
          JOIN 
            words w ON vl.id_word = w.id
          WHERE 
            vl.level = "${level}" AND vl.id_lesson = ${newLessonId};
        `;
        const stmt = database.prepare(query);
        let data = [];
        while (stmt.step()) {
          const row = stmt.getAsObject();
          data.push({
            id: row.id,
            word: row.word,
            meanings: JSON.parse(row.meanings),
            parts_of_speech: JSON.parse(row.parts_of_speech),
            kana_reading: row.kana_reading,
            usually_kana: row.usually_kana === "True",
            priority_score: row.priority_score,
          });
        }
        return data;
      } catch (error) {
        console.error(
          `Failed to load words data for ${level}, lesson ${newLessonId} from database`,
          error
        );
      }
    } else return null;
  };

  useEffect(() => {
    if(currentKanjiIndex === null && type === "kanji" && kanjiList.length !== 0) {
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

  const getKanjiList = () => {
    if (responseStudyKanjiLessons && level) {
      if (!showAllKanjis && lessonId) {
        const lesson = responseStudyKanjiLessons[level]?.find(
          (lesson) => lesson?.id === lessonId
        );
        if (lesson && lesson.kanjis) {
          let list =
            lesson.kanjis?.map((kanji) => ({
              level: level,
              idLesson: lessonId,
              idKanji: kanji.id,
              lessonDone: false,
            })) || [];

          list.push({
            level: null,
            idLesson: null,
            idKanji: null,
            lessonDone: true,
          });
          return list;
        } else {
          return [];
        }
      } else if (showAllKanjis) {
        let list =
          responseStudyKanjiLessons[level]?.flatMap((lesson) =>
            lesson.kanjis.map((kanji) => ({
              level: level,
              idLesson: lesson.id,
              idKanji: kanji.id,
              lessonDone: false,
            }))
          ) || [];
        list.push({
          level: null,
          idLesson: null,
          idKanji: null,
          lessonDone: true,
        });
        return list;
      } else return [];
    } else return [];
  };

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

  const handleBackToLessons = () => {
    if (type === "kanji") {
      showAllKanjis && dispatch(setStudyLesson(null));
    }
    dispatch(reset(type));
    dispatch(setPage("learningSettings"));
  };

  // scroll to top of list
  const wordsListRef = useRef(null);
  const scrollToTop = () => {
    if (wordsListRef.current) {
      wordsListRef.current.scrollTo({ top: 0, behavior: "instant" });
    }
  };
  // ------------------------

  const previousKanji = () => {
    if (currentKanjiIndex > 0) {
      dispatch(setCurrentKanjiIndex(currentKanjiIndex - 1));
      scrollToTop();
    }
  };

  const nextKanji = () => {
    if (!kanjiList[currentKanjiIndex]?.lessonDone) {
      dispatch(setCurrentKanjiIndex(currentKanjiIndex + 1));
      scrollToTop();
    }
  };

  const previousLesson = () => {
    if (lessonId > 1) {
      dispatch(setStudyLesson(lessonId - 1));
      fetchWordsData(lessonId - 1);
    }
  };

  const nextLesson = () => {
    if (
      responseStudyVocabularyLessons[level] &&
      lessonId < responseStudyVocabularyLessons[level].length
    ) {
      dispatch(setStudyLesson(lessonId + 1));
      fetchWordsData(lessonId + 1);
    }
  };

  const goToQuiz = () => {
    dispatch(setPage("quiz"));
  };

  return (
    <>
      <BackButtonComponent onClick={handleBackToLessons} />
      <StudyPageContainer>
        <Card>
          <KanjiNavigator
            type={type}
            kanjiData={kanjiData}
            currentKanjiIndex={currentKanjiIndex}
            kanjiList={kanjiList}
            lessonId={lessonId}
            responseStudyVocabularyLessons={responseStudyVocabularyLessons}
            level={level}
            previousKanji={previousKanji}
            nextKanji={nextKanji}
            previousLesson={previousLesson}
            nextLesson={nextLesson}
          />

          {type === "kanji" && !kanjiList[currentKanjiIndex]?.lessonDone && (
            <KanjiDetails kanjiData={kanjiData} />
          )}

          {type === "kanji" && kanjiData?.words?.length !== 0 && (
            <WordsList kanjiData={kanjiData} hide={kanjiList[currentKanjiIndex]?.lessonDone} />
          )}

          {type === "kanji" && kanjiList[currentKanjiIndex]?.lessonDone && (
            <StartQuiz type={type} goToQuiz={goToQuiz} />
          )}

          {type === "vocabulary" && wordsData && wordsData.length !== 0 && (
            <>
              <VocabularyList wordsData={wordsData} />
              <StartQuiz type={type} goToQuiz={goToQuiz} />
            </>
          )}
        </Card>
      </StudyPageContainer>
    </>
  );
};

export default StudyPage;
