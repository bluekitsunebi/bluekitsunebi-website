import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import tw from "twin.macro";
import styled from "styled-components";
import Button from "../Button";
import { setPage } from "store/app/appSlice";
import { setQuizData } from "store/app/quizPageSlice";

const BackButtonContainer = styled.div`
  ${tw`w-full mr-auto mb-5 sm:mb-8`}
`;

const BackButton = styled.div`
  ${tw`w-fit`}
`;

const QuizPageContainer = styled.div`
  ${tw`w-full flex flex-col gap-5 sm:gap-10 items-center text-xl sm:text-3xl sm:my-auto
    justify-evenly`}
  height: calc(100vh - 8rem);
  @media (min-width: 640px) {
    height: auto;
  }
`;

const Card = styled.div`
  ${tw`flex flex-col gap-5 w-full h-full
      justify-evenly
      sm:h-fit sm:my-auto
      sm:bg-white sm:px-16 sm:py-16 sm:gap-16 sm:rounded-3xl sm:max-w-screen-lg
      sm:min-h-52r`}
`;

const QuizPage = () => {
  const dispatch = useDispatch();
  const database = useSelector((state) => state.database.database);
  const level = useSelector((state) => state.studySettings.studyLevel);
  const lessonId = useSelector((state) => state.studySettings.studyLesson);
  const quizData = useSelector((state) => state.quizPage.quizData);

  const getQuizData = async () => {
    if (level && lessonId) {
      try {
        // TO DO
        const query = ``;
        const stmt = database.prepare(query);
        while (stmt.step()) {
          const row = stmt.getAsObject();
          return {};
        }

        stmt.free();
      } catch (error) {
        console.error(
          `Failed to load quiz data for ${level}, lesson ${lessonId} from database`,
          error
        );
      }
    } else return null;
  };

  useEffect(() => {
    const fetchQuizData = async () => {
      const data = await getQuizData();
      dispatch(setQuizData(data));
    };
    fetchQuizData();
  }, []);

  const handleBackToStudy = () => {
    dispatch(setPage("study"));
  };

  return (
    <>
      <BackButtonContainer>
        <BackButton>
          <Button onClick={() => handleBackToStudy()} full>
            Back
          </Button>
        </BackButton>
      </BackButtonContainer>

      <QuizPageContainer>
        <Card>Quiz</Card>
      </QuizPageContainer>
    </>
  );
};

export default QuizPage;
