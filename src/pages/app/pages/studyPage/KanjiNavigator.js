import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import tw from "twin.macro";
import styled, { css } from "styled-components";
import { FaAngleLeft as Previous, FaAngleRight as Next } from "react-icons/fa6";
import {
  setKanjiList,
  setCurrentKanjiIndex,
  setWordsData,
} from "store/app/studyPageSlice";
import { setStudyLesson } from "store/app/studySettingsSlice";

const KanjiContainer = styled.div`
  ${tw`flex flex-row gap-2 text-center w-full justify-between items-center sm:gap-10`}
  ${({ type }) =>
    type === "kanji"
      ? css`
          ${tw`h-36`}
        `
      : css`
          ${tw`h-20`}
        `}
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

const TitleContainer = styled.div`
  ${tw`flex flex-col items-center text-gray-800`}
`;

const Title = styled.div`
  ${tw`text-xl sm:text-4xl`}
`;

const LessonName = styled.div`
  ${tw`text-3xl sm:text-4xl`}
`;

const KanjiNavigator = () => {
  const dispatch = useDispatch();
  const type = useSelector((state) => state.studySettings.studyType);
  const kanjiData = useSelector((state) => state.studyPage.kanjiData);
  const currentKanjiIndex = useSelector(
    (state) => state.studyPage.currentKanjiIndex
  );
  const kanjiList = useSelector((state) => state.studyPage.kanjiList);
  const lessonId = useSelector((state) => state.studySettings.studyLesson);
  const responseStudyKanjiLessons = useSelector(
    (state) => state.studySettings.responseStudyKanjiLessons
  );
  const responseStudyVocabularyLessons = useSelector(
    (state) => state.studySettings.responseStudyVocabularyLessons
  );
  const level = useSelector((state) => state.studySettings.studyLevel);
  const showAllKanjis = useSelector(
    (state) => state.studySettings.showAllKanjis
  );
  const database = useSelector((state) => state.database.database);

  const fetchWordsData = async (newLessonId = lessonId) => {
    const data = await getWordsData(newLessonId);
    dispatch(setWordsData(data));
  };

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
    if (type === "kanji") {
      dispatch(setKanjiList(getKanjiList()));
    } else if (type === "vocabulary") {
      fetchWordsData();
    }
  }, []);

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

  return (
    <KanjiContainer type={type}>
      <Icon hide={type === "kanji" ? currentKanjiIndex === 0 : lessonId <= 1}>
        <PreviousIcon
          onClick={() =>
            type === "kanji" ? previousKanji() : previousLesson()
          }
        ></PreviousIcon>
      </Icon>
      {type === "kanji" ? (
        !kanjiList[currentKanjiIndex]?.lessonDone ? (
          <KanjiSymbol>{kanjiData?.kanji?.kanji}</KanjiSymbol>
        ) : (
          <TitleContainer>
            <Title>Lesson done.</Title>
            <Title>Ready for the quiz?</Title>
          </TitleContainer>
        )
      ) : (
        <LessonName>Lesson {lessonId}</LessonName>
      )}
      <Icon
        hide={
          type === "kanji"
            ? kanjiList[currentKanjiIndex]?.lessonDone
            : lessonId >= responseStudyVocabularyLessons[level].length
        }
      >
        <NextIcon
          onClick={() => (type === "kanji" ? nextKanji() : nextLesson())}
        ></NextIcon>
      </Icon>
    </KanjiContainer>
  );
};

export default KanjiNavigator;
