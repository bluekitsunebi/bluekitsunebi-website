import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import Button from "../../Button";

const RetryButtonContainer = styled.div`
  ${tw`w-fit mx-auto`}
`;

const RetryButtonContainerComponent = ({ onClick }) => (
  <RetryButtonContainer>
    <Button onClick={onClick} full>
      Retry wrong questions
    </Button>
  </RetryButtonContainer>
);

export default RetryButtonContainerComponent;
