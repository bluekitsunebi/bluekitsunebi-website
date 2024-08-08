import React from "react";
import { useSelector, useDispatch } from "react-redux";
import tw from "twin.macro";
import styled from "styled-components";
import Button from "../../Button";
import { setStudyLesson } from "store/app/studySettingsSlice";
import { reset } from "store/app/studyPageSlice";
import { setPage } from "store/app/appSlice";

const BackButtonContainer = styled.div`
  ${tw`w-full mr-auto mb-5 sm:mb-8`}
`;

const BackButton = styled.div`
  ${tw`w-fit`}
`;

const BackButtonComponent = () => {
  const dispatch = useDispatch();
  const type = useSelector((state) => state.studySettings.studyType);
  const showAllKanjis = useSelector(
    (state) => state.studySettings.showAllKanjis
  );

  const handleBackToLessons = () => {
    if (type === "kanji") {
      showAllKanjis && dispatch(setStudyLesson(null));
    }
    dispatch(reset(type));
    dispatch(setPage("learningSettings"));
  };

  return (
    <BackButtonContainer>
      <BackButton>
        <Button onClick={() => handleBackToLessons()} full>
          Back
        </Button>
      </BackButton>
    </BackButtonContainer>
  );
};

export default BackButtonComponent;
