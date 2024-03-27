import React from "react";
import styled from "styled-components"; //eslint-disable-line
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-9.svg";
import { ContentWithPaddingXl, Container } from "components/misc/Layouts";

const PrimaryBackgroundContainer = tw.div`py-20 lg:py-24 bg-primary-900 rounded-lg relative`
const Row = tw.div`px-8 max-w-screen-lg mx-auto flex items-center relative z-10 flex-col lg:flex-row text-center lg:text-left`;

const ColumnContainer = tw.div`lg:w-1/2 max-w-lg`
const TextContainer = tw(ColumnContainer)``;
const Text = tw.h5`text-white text-2xl sm:text-3xl font-bold`;

const LinksContainer = tw(ColumnContainer)`flex justify-center w-full lg:justify-end mt-6 lg:mt-0 flex-col sm:flex-row`;
const Details = tw.div`w-full sm:w-auto text-sm sm:text-base font-bold text-white flex flex-col gap-3`;
const Word = tw.span`break-words`;

const DecoratorBlobContainer = tw.div`absolute inset-0 overflow-hidden rounded-lg`
const DecoratorBlob1 = tw(SvgDecoratorBlob1)`absolute bottom-0 left-0 w-80 h-80 transform -translate-x-20 translate-y-32 text-primary-700 opacity-50`
const DecoratorBlob2 = tw(SvgDecoratorBlob1)`absolute top-0 right-0 w-80 h-80 transform  translate-x-20 -translate-y-64 text-primary-700 opacity-50`
export default ({
  text = "Informații",
  // primaryLinkText = "Get Started",
  // primaryLinkUrl = "http://timerse.com",
  // secondaryLinkText = "Contact Us",
  // secondaryLinkUrl = "http://google.com",
  pushDownFooter = true
}) => {
  return (
    <Container css={pushDownFooter && tw`mx-8 mb-20 lg:mb-24`}>
      <ContentWithPaddingXl>
      <PrimaryBackgroundContainer>
        <Row>
          <TextContainer>
            <Text>{text}</Text>
          </TextContainer>
          <LinksContainer>
            <Details>
                <div>Kitsunebi Miyabi SRL</div>
                <div>Nr. ord. registrul com.: <Word>J29/63/2023</Word></div>
                <div>C.I.F.: <Word>47442947</Word></div>
                <div>Sediu social: Str. Peneș Curcanul, nr. 8, bl. 151C, sc. A, et. P, ap. 1, Ploiești, Prahova, 100511, România</div>
                <div>Tel: <Word>+40745984726</Word></div>
                <div>Email: <Word>bluekitsunebi@gmail.com</Word></div>
                <div>Cont LEI: <Word>RO84CECEB00030RON2569171</Word></div>
            </Details>
          </LinksContainer>
        </Row>
        <DecoratorBlobContainer>
          <DecoratorBlob1/>
          <DecoratorBlob2/>
        </DecoratorBlobContainer>
      </PrimaryBackgroundContainer>
      </ContentWithPaddingXl>
    </Container>
  );
};
