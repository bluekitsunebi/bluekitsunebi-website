import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import tw from "twin.macro";
import styled from "styled-components";
import {
  setQuizData,
  setCurrentType,
  setWordReading,
  checkReading,
  setAnswered,
  nextQuestion,
  nextWrongQuestion,
} from "store/app/quizPageSlice";
import BackButtonContainer from "./BackButtonContainer";
import QuizCard from "./QuizCard";

const QuizPageContainer = styled.div`
  ${tw`w-full flex flex-col gap-2 sm:gap-5 sm:gap-10 items-center text-xl sm:text-3xl sm:my-auto
    justify-start`}
`;

const QuizPage = () => {
  const dispatch = useDispatch();
  const database = useSelector((state) => state.database.database);
  const level = useSelector((state) => state.studySettings.studyLevel);
  const lessonId = useSelector((state) => state.studySettings.studyLesson);
  const quizData = useSelector((state) => state.quizPage.quizData);
  const current = useSelector((state) => state.quizPage.current);
  const score = useSelector((state) => state.quizPage.score);
  const answered = useSelector((state) => state.quizPage.answered);
  const retry = useSelector((state) => state.quizPage.retry);
  const showAllKanjis = useSelector(
    (state) => state.studySettings.showAllKanjis
  );

  const getQuizData = async () => {
    if (level && lessonId) {
      let query = `
        SELECT 
          kl.id_kanji, 
          k.kanji,
          k.meanings,
          '[' || GROUP_CONCAT(
            json_object(
              'id', kl.id_word,
              'word', w.word,
              'kana_reading', w.kana_reading,
              'romaji_reading', w.romaji_reading
            )
          ) || ']' AS words
        FROM 
          kanji_lessons kl
        JOIN 
          kanjis k ON kl.id_kanji = k.id
        JOIN 
          words w ON kl.id_word = w.id
        WHERE 
          kl.level = "${level}"`;
      if (!showAllKanjis) {
        query += ` AND kl.id_lesson = ${lessonId}`;
      }
      query += `
        GROUP BY 
        kl.id_kanji,`;
      if (!showAllKanjis) {
        query += ` 
          kl.level, 
          kl.id_lesson, `;
      }
      query += `
        k.kanji, 
        k.meanings;`;
      try {
        const stmt = database.prepare(query);
        let quizData = [];
        let originalData = [];
        while (stmt.step()) {
          let row = stmt.getAsObject();
          row.meanings = JSON.parse(row.meanings).slice(0, 3);
          let words = JSON.parse(row.words).slice(0, 5);
          words.sort(() => Math.random() - 0.5);
          row.words = words.slice(0, 3);
          originalData.push(row);
        }
        stmt.free();
        for (let i = 0; i < originalData.length; i++) {
          let questionsSet = {
            kanjiQuestion: null,
            wordQuestions: [],
          };
          questionsSet.kanjiQuestion = await getKanjiQuestion(originalData, i);
          questionsSet.wordQuestions = getWordQuestions(originalData, i);
          quizData.push(questionsSet);
        }
        quizData.sort(() => Math.random() - 0.5);
        return quizData;
      } catch (error) {
        console.error(
          `Failed to load quiz data for ${level}, lesson ${lessonId} from database`,
          error
        );
      }
    } else return null;
  };

  const getKanjiQuestion = async (originalData, i) => {
    let options = [];
    let correctOption = null;
    for (let j = 0; j < originalData.length; j++) {
      if (i === j) {
        correctOption = {
          value: originalData[j].meanings,
          isCorrect: i === j,
          isSelected: false,
        };
      } else {
        options.push({
          value: originalData[j].meanings,
          isCorrect: i === j,
          isSelected: false,
        });
      }
    }
    options = options.slice(0, 2);
    if (options.length < 2 && lessonId > 1) {
      let previousLessonKanjis = await getPreviousLessonKanjis();
      previousLessonKanjis.sort(() => Math.random() - 0.5);
      previousLessonKanjis = previousLessonKanjis.slice(0, 2 - options.length);
      options = [...options, ...previousLessonKanjis];
    }
    options.push(correctOption);
    options.sort(() => Math.random() - 0.5);
    let kanjiQuestion = {
      kanji: {
        id: originalData[i].id_kanji,
        kanji: originalData[i].kanji,
      },
      options: options,
    };
    return kanjiQuestion;
  };

  const getPreviousLessonKanjis = async () => {
    let query = `
      SELECT 
        kl.id_kanji, 
        k.kanji,
        k.meanings
      FROM 
        kanji_lessons kl
      JOIN 
        kanjis k ON kl.id_kanji = k.id
      WHERE 
        kl.level = "${level}" AND kl.id_lesson = ${lessonId - 1}
      GROUP BY 
        kl.id_kanji, 
        kl.level, 
        kl.id_lesson, 
        k.kanji, 
        k.meanings;`;
    try {
      const stmt = database.prepare(query);
      let data = [];
      while (stmt.step()) {
        let row = stmt.getAsObject();
        data.push({
          value: JSON.parse(row.meanings),
          isCorrect: false,
          isSelected: false,
        });
      }
      stmt.free();
      return data;
    } catch (error) {
      console.error(
        `Failed to load quiz data for ${level}, lesson ${lessonId} from database`,
        error
      );
    }
  };

  const getWordQuestions = (originalData, i) => {
    let wordQuestions = [];
    for (let j = 0; j < originalData[i].words.length; j++) {
      let wordQuestion = {
        word: originalData[i].words[j],
        userInput: {
          value: "",
          isCorrect: null,
        },
      };
      wordQuestions.push(wordQuestion);
    }
    wordQuestions.sort(() => Math.random() - 0.5);
    return wordQuestions;
  };

  useEffect(() => {
    const fetchQuizData = async () => {
      const data = await getQuizData();
      dispatch(setQuizData(data));
    };
    fetchQuizData();
    dispatch(setCurrentType("kanjiQuestion"));
  }, []);

  const handleWordReadingChange = (e) => {
    const value = e.target.value.replace(/\s+/g, "");
    const regex =
      /^[\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF\uFF00-\uFFEFa-zA-Z]*$/;
    if (regex.test(value)) {
      dispatch(setWordReading(value));
    }
  };

  const handleNextQuestion = () => {
    if (!retry) {
      dispatch(nextQuestion());
    } else {
      dispatch(nextWrongQuestion());
    }
    current.type === "wordQuestions" && dispatch(setAnswered(false));
  };

  useEffect(() => {
    const handleGlobalKeyPress = (e) => {
      if (e.key !== "Enter") return;
      let isDisabled = false;
      if (current.set > quizData.length - 1) {
        isDisabled = true;
      } else if (current.type === "kanjiQuestion") {
        isDisabled = !quizData[current.set]?.kanjiQuestion?.options.some(
          (opt) => opt.isSelected
        );
      } else if (current.type === "wordQuestions") {
        if (!answered) {
          e.preventDefault();
          if (
            quizData[current.set]?.wordQuestions[current.wordIndex].userInput
              .value
          ) {
            dispatch(checkReading());
            dispatch(setAnswered(true));
          }
          isDisabled = true;
        } else {
          isDisabled = false;
        }
      }

      if (!isDisabled) {
        e.preventDefault();
        handleNextQuestion();
      }
    };

    document.addEventListener("keydown", handleGlobalKeyPress);

    return () => {
      document.removeEventListener("keydown", handleGlobalKeyPress);
    };
  }, [current, answered, quizData]);

  return (
    <>
      <BackButtonContainer desktop/>
      <QuizPageContainer>
        <QuizCard
          handleWordReadingChange={handleWordReadingChange}
          handleNextQuestion={handleNextQuestion}
        ></QuizCard>
      </QuizPageContainer>
    </>
  );
};

export default QuizPage;
