import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import tw from "twin.macro";
import styled, { css } from "styled-components";
import { FaAngleLeft as Previous, FaAngleRight as Next } from "react-icons/fa6";
import Button from "../Button";
import { setPage } from "store/app/appSlice";
import { setStudyKanji, setStudyLesson } from "store/app/studySettingsSlice";
import {
  setKanjiList,
  setCurrentKanjiIndex,
  setKanjiData,
  setWordsData,
  reset,
} from "store/app/studyPageSlice";

const StudyPageContainer = styled.div`
  ${tw`w-full flex flex-col gap-5 sm:gap-10 items-center text-xl sm:text-3xl sm:my-auto
    justify-evenly`}
`;

const BackButtonContainer = styled.div`
  ${tw`w-full mr-auto mb-5 sm:mb-8`}
`;

const BackButton = styled.div`
  ${tw`w-fit`}
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

const MainDetails = styled.div`
  ${tw`flex flex-col items-center gap-2 sm:gap-4 mx-auto min-h-28 sm:min-h-44`}
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

const LessonName = styled.div`
  ${tw`text-3xl sm:text-4xl`}
`;

const VocabularyList = styled.div`
  ${tw`flex flex-col gap-4 text-xl sm:text-3xl`}
`;

const Item = styled.span`
  ${tw``}
  line-height: 95%;
  @media (min-width: 640px) {
    line-height: 50%;
  }
`;

const WordContainer = styled.div`
  ${tw`w-fit inline-block `}
  line-height: normal;
  @media (min-width: 640px) {
    line-height: 100%;
  }
`;

const Word = styled.div`
  ${tw`w-fit mx-auto text-3xl sm:text-4xl font-thin`}
  line-height: 90%;
`;

const ReadingContainer = styled.div`
  ${tw`w-full text-sm text-gray-500 `}
`;

const Reading = styled.div`
  ${tw`w-fit mx-auto`}
`;

const Meanings = styled.span`
  ${tw``}
  line-height: normal;
  @media (min-width: 640px) {
    line-height: 110%;
  }
`;

const PartsOfSpeech = styled.div`
  ${tw`text-xs sm:text-xl text-gray-500 w-fit h-fit inline-block mr-1`}
  line-height: normal;
  @media (min-width: 640px) {
    line-height: 90%;
  }
`;

const UsuallyKana = styled.div`
  ${tw`text-xs sm:text-xl text-blue-300 w-fit h-fit inline-block`}
  line-height: normal;
  @media (min-width: 640px) {
    line-height: 90%;
  }
`;

const StartQuizContainer = styled.div`
  ${tw`w-full flex flex-col items-center justify-center`}
  ${({ type }) =>
    type === "kanji"
      ? css`
          ${tw`min-h-28 sm:min-h-44`}
        `
      : css`
          ${tw`mt-4 sm:mt-0`}
        `}
`;

const StartQuizButtonContainer = styled.div`
  ${tw``}
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
    if (type === "kanji") {
      kanjiList.length !== 0 &&
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
      <BackButtonContainer>
        <BackButton>
          <Button onClick={() => handleBackToLessons()} full>
            Back
          </Button>
        </BackButton>
      </BackButtonContainer>
      <StudyPageContainer>
        <Card>
          <KanjiContainer type={type}>
            <Icon
              hide={type === "kanji" ? currentKanjiIndex === 0 : lessonId <= 1}
            >
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

          <>
            {type === "kanji" && !kanjiList[currentKanjiIndex]?.lessonDone && (
              <MainDetails>
                <div>
                  {kanjiData?.kanji?.meanings.length > 3
                    ? kanjiData?.kanji?.meanings.slice(0, 3).join(", ")
                    : kanjiData?.kanji?.meanings.join(", ")}
                </div>

                {kanjiData?.kanji?.kun_readings.length !== 0 && (
                  <div>
                    <b>kun:</b> {kanjiData?.kanji?.kun_readings.join(", ")}
                  </div>
                )}
                {kanjiData?.kanji?.on_readings.length !== 0 && (
                  <div>
                    <b>on:</b> {kanjiData?.kanji?.on_readings.join(", ")}
                  </div>
                )}
              </MainDetails>
            )}

            {type === "kanji" && kanjiData?.words?.length !== 0 && (
              <WordsList
                ref={wordsListRef}
                hide={kanjiList[currentKanjiIndex]?.lessonDone}
              >
                {kanjiData?.words?.map((word) => (
                  <div key={word.id}>
                    {word.word} ({word.kana_reading}) ={" "}
                    {word?.meanings.join(", ")}
                  </div>
                ))}
              </WordsList>
            )}

            {type === "kanji" && kanjiList[currentKanjiIndex]?.lessonDone && (
              <StartQuizContainer type={type}>
                <StartQuizButtonContainer>
                  <Button full onClick={() => goToQuiz()}>
                    Start quiz
                  </Button>
                </StartQuizButtonContainer>
              </StartQuizContainer>
            )}

            {type === "vocabulary" && wordsData && wordsData.length !== 0 && (
              <>
                <VocabularyList>
                  {wordsData.map((word, index) => (
                    <Item key={index}>
                      <WordContainer>
                        <ReadingContainer>
                          <Reading>{word?.kana_reading}</Reading>
                        </ReadingContainer>
                        <Word>{word?.word}</Word>
                      </WordContainer>
                      <Meanings>
                        {" = " +
                          word?.meanings?.join(", ") +
                          (word?.parts_of_speech ? " " : "")}
                      </Meanings>
                      <PartsOfSpeech>
                        {word?.parts_of_speech?.join(", ")}
                      </PartsOfSpeech>
                      {word?.usually_kana && (
                        <UsuallyKana>Usually not written in kanji</UsuallyKana>
                      )}
                    </Item>
                  ))}
                </VocabularyList>
                <StartQuizContainer type={type}>
                  <StartQuizButtonContainer>
                    <Button full onClick={() => goToQuiz()}>
                      Start quiz
                    </Button>
                  </StartQuizButtonContainer>
                </StartQuizContainer>
              </>
            )}
          </>
        </Card>
      </StudyPageContainer>
    </>
  );
};

export default StudyPage;
