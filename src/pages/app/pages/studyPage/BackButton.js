import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import Button from "../../Button";

const BackButtonContainer = styled.div`
  ${tw`w-full mr-auto mb-5 sm:mb-8`}
`;

const BackButton = styled.div`
  ${tw`w-fit`}
`;

const BackButtonComponent = ({ onClick }) => (
  <BackButtonContainer>
    <BackButton>
      <Button onClick={onClick} full>
        Back
      </Button>
    </BackButton>
  </BackButtonContainer>
);

export default BackButtonComponent;
