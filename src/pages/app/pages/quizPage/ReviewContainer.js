import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { useSelector } from "react-redux";

const ReviewContainer = styled.div`
  ${tw`flex flex-col gap-2`}
`;

const WrongQuestionsContainer = styled.div`
  ${tw`w-full border border-primary-100 rounded p-2 sm:px-8 sm:py-4 border-4
    overflow-y-auto h-80 min-h-80 bg-white
    flex flex-col select-none`}

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

const KanjiQuestion = styled.div`
  ${tw`flex flex-col`}
`;

const WordQuestion = styled.div`
  ${tw`flex flex-col`}
`;

const QuestionItem = styled.div`
  ${tw`gap-2`}
`;

const Correct = styled.span`
  ${tw`text-green-500`}
`;

const Wrong = styled.span`
  ${tw`text-red-500`}
`;

const Divider = styled.div`
  ${tw`w-full bg-gray-300 rounded my-4`}
  height: 4px;
`;

const ReviewContainerComponent = ({ quizData, lastWrongQuestion }) => {
  const action = useSelector((state) => state.studySettings.action);
  const type = useSelector((state) => state.studySettings.studyType);
  const lastVocabularyWrongQuestionIndex = useSelector(
    (state) => state.quizPage.lastVocabularyWrongQuestionIndex
  );

  return (
    <ReviewContainer>
      <div>Review wrong answers</div>
      <WrongQuestionsContainer>
        {((action === "study" && type === "kanji") || action === "quiz") &&
          quizData.map((set, setIndex) => (
            <React.Fragment key={`set-${setIndex}`}>
              {set?.kanjiQuestion?.options?.some(
                (option) => option.isSelected && !option.isCorrect
              ) && (
                <KanjiQuestion key={"kanjiQuestion" + setIndex}>
                  <QuestionItem>
                    <span>kanji:</span>{" "}
                    <span>{set.kanjiQuestion.kanji.kanji}</span>
                  </QuestionItem>

                  <QuestionItem>
                    <span>meaning: </span>
                    <Correct>
                      {set.kanjiQuestion.options
                        .find((option) => option.isCorrect)
                        .value.join(", ")}
                    </Correct>
                  </QuestionItem>

                  <QuestionItem>
                    <span>your answer: </span>
                    <Wrong>
                      {set.kanjiQuestion.options
                        .find((option) => option.isSelected)
                        .value.join(", ")}
                    </Wrong>
                  </QuestionItem>
                  {!(
                    lastWrongQuestion.set === setIndex &&
                    lastWrongQuestion.type === "kanjiQuestion"
                  ) && <Divider></Divider>}
                </KanjiQuestion>
              )}

              {/* TO DO */}
              {set?.vocabularyQuestion?.options?.some(
                (option) => option.isSelected && !option.isCorrect
              ) && (
                <KanjiQuestion key={"vocabularyQuestion" + setIndex}>
                  <QuestionItem>
                    <span>word:</span>{" "}
                    <span>{set.vocabularyQuestion.word}</span>
                  </QuestionItem>

                  <QuestionItem>
                    <span>meaning: </span>
                    <Correct>
                      {set.vocabularyQuestion.options
                        .find((option) => option.isCorrect)
                        .value.join(", ")}
                    </Correct>
                  </QuestionItem>

                  <QuestionItem>
                    <span>your answer: </span>
                    <Wrong>
                      {set.vocabularyQuestion.options
                        .find((option) => option.isSelected)
                        .value.join(", ")}
                    </Wrong>
                  </QuestionItem>
                  {!(
                    lastWrongQuestion.set === setIndex &&
                    lastWrongQuestion.type === "vocabularyQuestion"
                  ) && <Divider></Divider>}
                </KanjiQuestion>
              )}

              {set?.wordQuestions?.map(
                (wordQuestion, wordIndex) =>
                  !wordQuestion.userInput.isCorrect && (
                    <WordQuestion key={"wordQuestion" + setIndex + wordIndex}>
                      <QuestionItem>
                        word: {wordQuestion.word.word}
                      </QuestionItem>
                      <QuestionItem>
                        reading:{" "}
                        <Correct>{wordQuestion.word.kana_reading}</Correct>
                      </QuestionItem>
                      <QuestionItem>
                        your answer:{" "}
                        <Wrong>{wordQuestion.userInput.value}</Wrong>
                      </QuestionItem>
                      {!(
                        lastWrongQuestion.set === setIndex &&
                        lastWrongQuestion.type === "wordQuestions" &&
                        lastWrongQuestion.wordIndex === wordIndex
                      ) && <Divider></Divider>}
                    </WordQuestion>
                  )
              )}
            </React.Fragment>
          ))}

        {action === "study" &&
          type === "vocabulary" &&
          quizData.map((question, questionIndex) => (
            <React.Fragment key={questionIndex}>
              {question.options.some(
                (option) => option.isSelected && !option.isCorrect
              ) && (
                <KanjiQuestion>
                  <QuestionItem>
                    <>
                      <span>{"word: "}</span>
                      <span>{question.word}</span>
                    </>
                  </QuestionItem>

                  <QuestionItem>
                    <span>meaning: </span>
                    <Correct>
                      {question.options
                        .find((option) => option.isCorrect)
                        .value.join(", ")}
                    </Correct>
                  </QuestionItem>

                  <QuestionItem>
                    <span>your answer: </span>
                    <Wrong>
                      {question.options
                        .find((option) => option.isSelected)
                        .value.join(", ")}
                    </Wrong>
                  </QuestionItem>
                  {!(questionIndex === lastVocabularyWrongQuestionIndex) && (
                    <Divider></Divider>
                  )}
                </KanjiQuestion>
              )}
            </React.Fragment>
          ))}
      </WrongQuestionsContainer>
    </ReviewContainer>
  );
};

export default ReviewContainerComponent;
