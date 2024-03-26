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

const LinksContainer = tw(ColumnContainer)`flex justify-center lg:justify-end mt-6 lg:mt-0 flex-col sm:flex-row`;


const Details = tw.div`w-full pl-8 pt-8 sm:w-auto text-sm sm:text-base  font-bold text-white relative`;

const DetailsText = tw.div`relative z-10 pl-16 pr-3 pt-8 pb-8 rounded-full`;

const Frame = tw.div`absolute top-0 left-0 bg-red-500 h-full w-full z-10 block rounded-full`;

const DecoratorBlobContainer = tw.div`absolute inset-0 overflow-hidden rounded-lg`
const DecoratorBlob1 = tw(SvgDecoratorBlob1)`absolute bottom-0 left-0 w-80 h-80 transform -translate-x-20 translate-y-32 text-primary-700 opacity-50`
const DecoratorBlob2 = tw(SvgDecoratorBlob1)`absolute top-0 right-0 w-80 h-80 transform  translate-x-20 -translate-y-64 text-primary-700 opacity-50`
export default ({
  text = "Detalii companie.",
  // primaryLinkText = "Get Started",
  // primaryLinkUrl = "http://timerse.com",
  // secondaryLinkText = "Contact Us",
  // secondaryLinkUrl = "http://google.com",
  pushDownFooter = true
}) => {
  return (
    <Container css={pushDownFooter && tw`mb-20 lg:mb-24`}>
      <ContentWithPaddingXl>
      <PrimaryBackgroundContainer>
        <Row>
          <TextContainer>
            <Text>{text}</Text>
          </TextContainer>
          <LinksContainer>
            <Details>
              {/* <Frame>
                <div></div>
              </Frame> */}
              <DetailsText>
                <div>Kitsunebi Miyabi SRL</div>
                <div>Nr. ord. registrul com.: J29/63/2023</div>
                <div>C.I.F.: 47442947</div>
                <div>Sediu social: Str. Penes Curcanul, nr. 8, bl. 151C, sc. A, et. P, ap. 1, Ploiesti, Prahova, 100511, Romania</div>
                <div>Tel: +40745984726</div>
                <div>Email: bluekitsunebi@gmail.com</div>
                <div>Cont LEI: RO84CECEB00030RON2569171</div>
              </DetailsText>
            </Details>
            {/* <PrimaryLink href={primaryLinkUrl}>{primaryLinkText}</PrimaryLink> */}
            {/* <SecondaryLink href={secondaryLinkUrl}>{secondaryLinkText}</SecondaryLink> */}
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
