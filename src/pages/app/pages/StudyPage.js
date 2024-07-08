import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import tw from "twin.macro";
import styled from "styled-components";
import {
  PiArrowCircleLeft as Previous,
  PiArrowCircleRight as Next,
} from "react-icons/pi";
import Button from "../Button";

const StudyPage = () => {
  const database = useSelector((state) => state.database.database);
  const level = useSelector((state) => state.studySettings.studyLevel);
  const lessonId = useSelector((state) => state.studySettings.studyLesson);
  const kanjiId = useSelector((state) => state.studySettings.studyKanji);
  const [kanjiData, setKanjiData] = useState(null);

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
        console.log(row);
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
  }, []);

  useEffect(() => {
    console.log("kanjiData: ", kanjiData);
  }, [kanjiData]);

  const StudyPageContainer = styled.div`
    ${tw`w-full h-full flex flex-col`}
  `;

  const Icon = styled.div`
    ${tw`text-gray-600 cursor-pointer`}
  `;

  const PreviousIcon = styled(Previous)`
    ${tw`w-8 h-8`}
  `;

  const NextIcon = styled(Next)`
    ${tw`w-8 h-8`}
  `;

  return (
    <StudyPageContainer>
      {kanjiData && (
        <>
          <Button>Back to lessons</Button>
          <Icon>
            <PreviousIcon>Previous</PreviousIcon>
          </Icon>
          <Icon>
            <NextIcon>Next</NextIcon>
          </Icon>

          <div>{kanjiData.kanji.kanji}</div>

          <div>meanings: {kanjiData.kanji.meanings}</div>

          <div>kun: {kanjiData.kanji.kun_readings}</div>
          <div>on: {kanjiData.kanji.on_readings}</div>

          <div>words:</div>
          
          <div>
            {kanjiData?.kanji?.words?.length !== 0 && kanjiData?.kanji?.words?.length[0].word}
            {/* {kanjiData?.kanji?.words?.length !== 0 && kanjiData.kanji.words.map((word) => (
              <div>{word.word} - {word.reading} = {word.meanings}</div>
            ))} */}
          </div>
        </>
      )}
    </StudyPageContainer>
  );
};

export default StudyPage;
