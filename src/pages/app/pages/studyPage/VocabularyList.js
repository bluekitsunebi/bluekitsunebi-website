import React from "react";
import tw from "twin.macro";
import styled from "styled-components";

const VocabularyListContainer = styled.div`
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

const VocabularyList = ({ wordsData }) => (
  <VocabularyListContainer>
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
  </VocabularyListContainer>
);

export default VocabularyList;
