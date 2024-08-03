import React, { useEffect, useCallback, useState } from "react";
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
  const action = useSelector((state) => state.studySettings.action);
  const level = useSelector((state) => state.studySettings.studyLevel);
  const type = useSelector((state) => state.studySettings.studyType);
  const lessonId = useSelector((state) => state.studySettings.studyLesson);
  const levels = useSelector((state) => state.quizSettings.levels);
  const quizSettings = useSelector((state) => state.quizSettings.quizSettings);
  const quizData = useSelector((state) => state.quizPage.quizData);
  const current = useSelector((state) => state.quizPage.current);
  const answered = useSelector((state) => state.quizPage.answered);
  const retry = useSelector((state) => state.quizPage.retry);
  const showAllKanjis = useSelector(
    (state) => state.studySettings.showAllKanjis
  );
  const wordsData = useSelector((state) => state.studyPage.wordsData);
  const [questionHaveInitialType, setQuestionHaveInitialType] = useState(false);

  const kanjiQuery = () => {
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
            kl.level = "${level}"
        `;
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
    return query;
  };

  const setKanjiData = async (query) => {
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
  };

  const setVocabularyData = (data = wordsData) => {
    let quizData = [];
    let wordsMeanings = [];
    data.forEach((word) => {
      wordsMeanings.push(word.meanings);
    });
    data.forEach((word) => {
      let options = [];
      let correctOption = null;
      wordsMeanings.forEach((meaning) => {
        let isCorrect = meaning === word.meanings;
        let option = {
          value: meaning,
          isCorrect: isCorrect,
          isSelected: false,
        };
        if (!isCorrect) {
          options.push(option);
        } else correctOption = option;
      });
      options = options.slice(0, 2);
      options.push(correctOption);
      options.sort(() => Math.random() - 0.5);
      let question = {
        word: word.word,
        reading: word.kana_reading,
        options: options,
      };
      quizData.push(question);
    });
    quizData.sort(() => Math.random() - 0.5);
    return quizData;
  };

  const getSelectedLessons = () => {
    let selectedLessons = {};
    levels.forEach((level) => {
      const hasKanjiLessons = quizSettings[level].kanji.lessons.length !== 0;
      const hasVocabularyLessons =
        quizSettings[level].vocabulary.lessons.length !== 0;
      if (hasKanjiLessons || hasVocabularyLessons) {
        selectedLessons[level] = {};
      }
      if (hasKanjiLessons) {
        selectedLessons[level].kanji = [];
        quizSettings[level].kanji.lessons.forEach((lesson) => {
          selectedLessons[level].kanji.push(lesson.id);
        });
      }
      if (hasVocabularyLessons) {
        selectedLessons[level].vocabulary = [];
        quizSettings[level].vocabulary.lessons.forEach((lesson) => {
          selectedLessons[level].vocabulary.push(lesson.id);
        });
      }
    });
    return selectedLessons;
  };

  const getCombinedQuestionsQuery = (
    selectedLessons,
    kanjiLessonsExists,
    vocabularyLessonsExists
  ) => {
    let query = ``;
    if (kanjiLessonsExists) {
      query += `
    SELECT 
      k.kanji AS question,
      k.meanings AS meanings,
      '[' || GROUP_CONCAT(
        json_object(
          'word', w.word,
          'kana_reading', w.kana_reading,
          'romaji_reading', w.romaji_reading
        )
      ) || ']' AS words,
      'kanji' AS question_type
    FROM 
      kanji_lessons kl
    JOIN 
      kanjis k ON kl.id_kanji = k.id
    JOIN 
      words w ON kl.id_word = w.id
    WHERE
    `;
      let firstExists = false;
      if (selectedLessons?.N5?.kanji) {
        firstExists = true;
        query += `(kl.level = "N5" AND kl.id_lesson IN (${selectedLessons.N5.kanji}))`;
      }
      if (selectedLessons?.N4?.kanji) {
        if (!firstExists) {
          firstExists = true;
        } else {
          query += ` OR `;
        }
        query += `(kl.level = "N4" AND kl.id_lesson IN (${selectedLessons.N4.kanji}))`;
      }
      if (selectedLessons?.N3?.kanji) {
        if (!firstExists) {
          firstExists = true;
        } else {
          query += ` OR `;
        }
        query += `(kl.level = "N3" AND kl.id_lesson IN (${selectedLessons.N3.kanji}))`;
      }
      if (selectedLessons?.N2?.kanji) {
        if (!firstExists) {
          firstExists = true;
        } else {
          query += ` OR `;
        }
        query += `(kl.level = "N2" AND kl.id_lesson IN (${selectedLessons.N2.kanji}))`;
      }
      if (selectedLessons?.N1?.kanji) {
        if (!firstExists) {
          firstExists = true;
        } else {
          query += ` OR `;
        }
        query += `(kl.level = "N1" AND kl.id_lesson IN (${selectedLessons.N1.kanji}))`;
      }
      query += `
    GROUP BY 
      kl.id_kanji,
      kl.level, 
      k.kanji, 
      k.meanings
    `;
    }

    if (kanjiLessonsExists && vocabularyLessonsExists) {
      query += `
      UNION ALL
      `;
    }

    if (vocabularyLessonsExists) {
      query += `
    SELECT 
      w.word AS question,
      w.meanings AS meanings,
      w.kana_reading AS words,
      'vocabulary' AS question_type
    FROM 
      vocab_lessons vl
    JOIN 
      words w ON vl.id_word = w.id
    WHERE
    `;
      let firstExists = false;
      if (selectedLessons?.N5?.vocabulary) {
        firstExists = true;
        query += `(vl.level = "N5" AND vl.id_lesson IN (${selectedLessons.N5.vocabulary}))`;
      }
      if (selectedLessons?.N4?.vocabulary) {
        if (!firstExists) {
          firstExists = true;
        } else {
          query += ` OR `;
        }
        query += `(vl.level = "N4" AND vl.id_lesson IN (${selectedLessons.N4.vocabulary}))`;
      }
      if (selectedLessons?.N3?.vocabulary) {
        if (!firstExists) {
          firstExists = true;
        } else {
          query += ` OR `;
        }
        query += `(vl.level = "N3" AND vl.id_lesson IN (${selectedLessons.N3.vocabulary}))`;
      }
      if (selectedLessons?.N2?.vocabulary) {
        if (!firstExists) {
          firstExists = true;
        } else {
          query += ` OR `;
        }
        query += `(vl.level = "N2" AND vl.id_lesson IN (${selectedLessons.N2.vocabulary}))`;
      }
      if (selectedLessons?.N1?.vocabulary) {
        if (!firstExists) {
          firstExists = true;
        } else {
          query += ` OR `;
        }
        query += `(vl.level = "N1" AND vl.id_lesson IN (${selectedLessons.N1.vocabulary}))`;
      }
    }
    query += `;`;
    return query;
  };

  const getCombinedQuestionsOriginalData = (query) => {
    let kanjiData = [];
    let vocabularyData = [];
    try {
      const stmt = database.prepare(query);
      while (stmt.step()) {
        let row = stmt.getAsObject();
        if (row.question_type === "kanji") {
          kanjiData.push({
            kanji: row.question,
            meanings: JSON.parse(row.meanings).slice(0, 3),
            words: JSON.parse(row.words)
              .slice(0, 5)
              .sort(() => Math.random() - 0.5)
              .slice(0, 3),
          });
        } else if (row.question_type === "vocabulary") {
          vocabularyData.push({
            word: row.question,
            meanings: JSON.parse(row.meanings),
            kana_reading: row.words,
          });
        }
      }
      stmt.free();
    } catch (error) {
      console.error(`Failed to load quiz data from database`, error);
    }
    return { kanjiData, vocabularyData };
  };

  const setQuizDataFromQuizSettings = async () => {
    let selectedLessons = getSelectedLessons();
    let combinedQuery = "";
    let quizData = [];
    let originalData = [];
    const kanjiLessonsExists =
      selectedLessons?.N5?.kanji ||
      selectedLessons?.N4?.kanji ||
      selectedLessons?.N3?.kanji ||
      selectedLessons?.N2?.kanji ||
      selectedLessons?.N1?.kanji;
    const vocabularyLessonsExists =
      selectedLessons?.N5?.vocabulary ||
      selectedLessons?.N4?.vocabulary ||
      selectedLessons?.N3?.vocabulary ||
      selectedLessons?.N2?.vocabulary ||
      selectedLessons?.N1?.vocabulary;

    if (kanjiLessonsExists || vocabularyLessonsExists) {
      combinedQuery = getCombinedQuestionsQuery(
        selectedLessons,
        kanjiLessonsExists,
        vocabularyLessonsExists
      );
      originalData = getCombinedQuestionsOriginalData(combinedQuery);
    }

    if (
      originalData?.kanjiData?.length &&
      originalData?.kanjiData?.length !== 0
    ) {
      for (let i = 0; i < originalData.kanjiData.length; i++) {
        let questionsSet = {
          kanjiQuestion: null,
          wordQuestions: [],
        };

        const randomLessonId = Math.floor(Math.random() * 16) + 1;
        const randomLevel = levels[Math.floor(Math.random() * levels.length)];
        questionsSet.kanjiQuestion = await getKanjiQuestion(
          originalData.kanjiData,
          i,
          randomLessonId,
          randomLevel
        );
        questionsSet.wordQuestions = getWordQuestions(
          originalData.kanjiData,
          i
        );
        quizData.push(questionsSet);
      }
    }

    if (
      originalData?.vocabularyData?.length &&
      originalData?.vocabularyData?.length !== 0
    ) {
      originalData.vocabularyData = setVocabularyData(
        originalData.vocabularyData
      );
      originalData.vocabularyData.forEach((question) => {
        let questionsSet = {
          vocabularyQuestion: {
            word: question.word,
            reading: question.reading,
            options: question.options,
          },
        };
        quizData.push(questionsSet);
      });
    }
    quizData.sort(() => Math.random() - 0.5);
    return quizData;
  };

  const getQuizData = useCallback(async () => {
    let quizData = [];
    if (action === "study") {
      if (level && lessonId) {
        // KANJI
        if (type === "kanji") {
          let query = kanjiQuery();
          quizData = await setKanjiData(query);
          // VOCABULARY
        } else if (type === "vocabulary") {
          quizData = setVocabularyData();
        }
      }
    } else if (action === "quiz") {
      quizData = setQuizDataFromQuizSettings();
    }
    return quizData;
  }, []);

  const getKanjiQuestion = async (
    originalData,
    i,
    randomLessonId = null,
    randomLevel = null
  ) => {
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
    if (options.length < 2 && (lessonId > 1 || randomLessonId !== null)) {
      let previousLessonKanjis = await getPreviousLessonKanjis(
        randomLessonId,
        randomLevel
      );
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

  const getPreviousLessonKanjis = async (
    randomLessonId = null,
    randomLevel = null
  ) => {
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
        kl.level = "${randomLevel || level}" AND kl.id_lesson = ${
      randomLessonId || lessonId - 1
    }
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
  }, []);

  useEffect(() => {
    if (!questionHaveInitialType && quizData.length !== 0) {
      if (action === "study" && type === "kanji") {
        dispatch(setCurrentType("kanjiQuestion"));
      } else if (action === "quiz") {
        if ("kanjiQuestion" in quizData[0] && "wordQuestions" in quizData[0]) {
          dispatch(setCurrentType("kanjiQuestion"));
        } else if ("vocabularyQuestion" in quizData[0]) {
          dispatch(setCurrentType("vocabularyQuestion"));
        }
      }
      setQuestionHaveInitialType(true);
    }
  }, [quizData]);

  const handleWordReadingChange = (e) => {
    if (
      type === "kanji" ||
      (action === "quiz" && current.type === "wordQuestions")
    ) {
      const value = e.target.value.replace(/\s+/g, "");
      const regex =
        /^[\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF\uFF00-\uFFEFa-zA-Z]*$/;
      if (regex.test(value)) {
        dispatch(setWordReading(value));
      }
    }
  };

  const handleNextQuestion = () => {
    if (!retry) {
      dispatch(nextQuestion([type, action]));
    } else {
      dispatch(nextWrongQuestion([type, action]));
    }
    if (type === "kanji" || action === "quiz") {
      current.type === "wordQuestions" && dispatch(setAnswered(false));
    }
  };

  useEffect(() => {
    if ((action === "study" && type === "kanji") || action === "quiz") {
      const handleGlobalKeyPress = (e) => {
        if (e.key !== "Enter") return;
        let isDisabled = false;
        if (current.set > quizData.length - 1) {
          isDisabled = true;
        } else if (current.type === "kanjiQuestion") {
          isDisabled = !quizData[current.set]?.kanjiQuestion?.options.some(
            (opt) => opt.isSelected
          );
        } else if (current.type === "vocabularyQuestion") {
          isDisabled = !quizData[current.set]?.vocabularyQuestion?.options.some(
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
    }
  }, [current, answered, quizData]);

  return (
    <>
      <BackButtonContainer desktop page={"learningSettings"}/>
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
