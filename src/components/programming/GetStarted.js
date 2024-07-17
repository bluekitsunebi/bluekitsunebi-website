import React, { useEffect, useRef } from "react";
import styled from "styled-components"; //eslint-disable-line
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-9.svg";
import { ContentWithPaddingXl, Container } from "components/misc/Layouts";
import { useSelector, useDispatch } from "react-redux";
import { setInfoSectionId } from "store/infoSectionSlice";
import enData from "helpers/data/lang/en/japanese.json";
import jaData from "helpers/data/lang/ja/japanese.json";
import roData from "helpers/data/lang/ro/japanese.json";

const PrimaryBackgroundContainer = tw.div`py-20 lg:py-24 bg-lightBlue-500 rounded-lg relative`;
const Row = tw.div`px-8 max-w-screen-lg mx-auto flex items-center relative z-1 flex-col lg:flex-row text-center lg:text-left`;

const ColumnContainer = tw.div`lg:w-1/2 max-w-lg`;
const TextContainer = tw(ColumnContainer)``;
const Text = tw.h5`text-white text-2xl sm:text-3xl font-bold`;

const LinksContainer = tw(
  ColumnContainer
)`flex justify-center w-full lg:justify-end mt-6 lg:mt-0 flex-col sm:flex-row`;
const Details = tw.div`w-full sm:w-auto text-sm sm:text-base font-bold text-white flex flex-col gap-3`;
const Breakable = tw.span`break-words`;

const DecoratorBlobContainer = tw.div`absolute inset-0 overflow-hidden rounded-lg`;
const DecoratorBlob1 = tw(
  SvgDecoratorBlob1
)`absolute bottom-0 left-0 w-80 h-80 transform -translate-x-20 translate-y-32 text-darkPurple-500 opacity-50`;
const DecoratorBlob2 = tw(
  SvgDecoratorBlob1
)`absolute top-0 right-0 w-80 h-80 transform  translate-x-20 -translate-y-64 text-darkPurple-500 opacity-50`;

export default function InfoSection({ onRender, pushDownFooter = true }) {
  const dispatch = useDispatch();
  const homeWasRendered = useSelector((state) => state.home.wasRendered);
  const infoSectionId = "info-section";

  useEffect(() => {
    if (homeWasRendered === "true") {
      // send section id to store
      dispatch(setInfoSectionId(infoSectionId));
    }
    if (typeof onRender === "function") {
      // signals the end of rendering the section to the store
      onRender();
    }
  }, [onRender, homeWasRendered]);

  // ---------------------------------------------------------

  // get the website language
  let language = useSelector((state) => state.websiteLanguage.language);
  let langData =
    language === "en" ? enData : language === "ja" ? jaData : roData;

  return (
    <Container
      id={infoSectionId}
      css={pushDownFooter && tw`mx-8 mb-20 lg:mb-24`}
    >
      <ContentWithPaddingXl>
        <PrimaryBackgroundContainer>
          <Row>
            <TextContainer>
              <Text>{langData.InfoSection.title}</Text>
            </TextContainer>
            <LinksContainer>
              <Details>
                <div>{langData.InfoSection.details[0]}</div>
                <div>
                  {langData.InfoSection.details[1][0]}
                  <Breakable>{langData.InfoSection.details[1][1]}</Breakable>
                </div>
                <div>
                  {langData.InfoSection.details[2][0]}
                  <Breakable>{langData.InfoSection.details[3][1]}</Breakable>
                </div>
                <div>
                  {langData.InfoSection.details[3][0]}{" "}
                  <Breakable>{langData.InfoSection.details[3][1]}</Breakable>
                </div>
                <div>
                  {langData.InfoSection.details[4][0]}
                  <Breakable>{langData.InfoSection.details[4][1]}</Breakable>
                </div>
                <div>
                  {langData.InfoSection.details[5][0]}
                  <Breakable>{langData.InfoSection.details[5][1]}</Breakable>
                </div>
                <div>{langData.InfoSection.details[6]}</div>
              </Details>
            </LinksContainer>
          </Row>
          <DecoratorBlobContainer>
            <DecoratorBlob1 />
            <DecoratorBlob2 />
          </DecoratorBlobContainer>
        </PrimaryBackgroundContainer>
      </ContentWithPaddingXl>
    </Container>
  );
}
