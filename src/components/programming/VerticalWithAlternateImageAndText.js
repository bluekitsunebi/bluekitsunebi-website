import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { ReactComponent as SvgDotPatternIcon } from "../../images/dot-pattern.svg";
import { SectionHeading as HeadingTitle } from "../misc/Headings.js";
import laptop from "../../images/original/chibiMiyabi/laptop.png";
import study from "../../images/original/chibiMiyabi/study.png";
import fight from "../../images/original/chibiMiyabi/fight.png";
import { useSelector, useDispatch } from "react-redux";
import {
  setAboutSectionId,
  setHeight,
  setYaxisPosition,
} from "store/aboutSectionSlice";
import enData from "helpers/data/lang/en/programming.json";
import jaData from "helpers/data/lang/ja/programming.json";
import roData from "helpers/data/lang/ro/programming.json";
// import usePreloadImages from 'hooks/usePreloadImages';

const Container = tw.div`relative mx-8`;

const SingleColumn = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

const HeadingInfoContainer = tw.div`flex flex-col items-center text-gray-300`;

const Content = tw.div`mt-12`;

const Card = styled.div((props) => [
  tw`mt-16 md:mt-8 md:flex justify-between items-center gap-x-10`,
  props.reversed ? tw`flex-row-reverse` : "flex-row",
]);
const Image = styled.div((props) => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded md:w-1/2 lg:w-5/12 xl:w-1/3 flex-shrink-0 h-80 md:h-144 bg-contain bg-center bg-no-repeat mx-4 sm:mx-8 md:mx-4 lg:mx-8`,
]);
const Details = tw.div`mt-4 md:mt-0 md:max-w-2xl mx-4 sm:mx-8 md:mx-4 lg:mx-8`;
const Description = tw.p`mt-2 text-base sm:text-xl leading-loose text-gray-100`;
const Kaomoji = tw.span`inline-block whitespace-nowrap w-fit`;

const SvgDotPattern1 = tw(
  SvgDotPatternIcon
)`absolute top-0 left-0 transform -translate-x-20 rotate-90 translate-y-8 -z-10 opacity-50 text-lightBlue-500 fill-current w-24`;
const SvgDotPattern2 = tw(
  SvgDotPatternIcon
)`absolute top-0 right-0 transform translate-x-20 rotate-45 translate-y-24 -z-10 opacity-50 text-lightBlue-500 fill-current w-24`;
const SvgDotPattern3 = tw(
  SvgDotPatternIcon
)`absolute bottom-0 left-0 transform -translate-x-20 rotate-45 -translate-y-8 -z-10 opacity-50 text-lightBlue-500 fill-current w-24`;
const SvgDotPattern4 = tw(
  SvgDotPatternIcon
)`absolute bottom-0 right-0 transform translate-x-20 rotate-90 -translate-y-24 -z-10 opacity-50 text-lightBlue-500 fill-current w-24`;

export default function AboutSection({ onRender }) {
  // SET SECTION Y AXIS POSITION

  const dispatch = useDispatch();
  const homeWasRendered = useSelector((state) => state.home.wasRendered);
  const aboutSectionId = "about-section";
  const aboutSectionRef = useRef(null);
  let paddingBottom = 0;
  let paddingTop = 0;

  // const imagesLoaded = usePreloadImages([laptop, study, fight]);

  useEffect(() => {
    if (homeWasRendered === "true") {
      // ---------------------------------------------------
      // send section id to store
      dispatch(setAboutSectionId(aboutSectionId));
      // ---------------------------------------------------
      const computedStyle = getComputedStyle(aboutSectionRef.current);
      paddingTop = parseFloat(computedStyle.paddingTop);
      paddingBottom = parseFloat(computedStyle.paddingBottom);
      const totalHeight =
        aboutSectionRef.current.offsetHeight + paddingTop + paddingBottom;
      dispatch(setHeight(totalHeight));
      const rect = aboutSectionRef.current.getBoundingClientRect();
      const yOffset = window.pageYOffset || document.documentElement.scrollTop;
      const yPosition = rect.top + yOffset;
      dispatch(setYaxisPosition(yPosition + 40));
    }
    if (typeof onRender === "function") {
      // signals the end of rendering the section to the store
      onRender();
    }
  }, [onRender, homeWasRendered]);

  // ---------------------------------------------------------

  const images = [laptop, study, fight];

  // get the website language
  let language = useSelector((state) => state.websiteLanguage.language);
  let langData =
    language === "en" ? enData : language === "ja" ? jaData : roData;

  return (
    <Container id={aboutSectionId} ref={aboutSectionRef}>
      <SingleColumn>
        <HeadingInfoContainer>
          <HeadingTitle>{langData.CoursesSection.title}</HeadingTitle>
        </HeadingInfoContainer>

        <Content>
          {langData.CoursesSection.description.map((paragraph, i) => (
            <Card key={i} reversed={i % 2 === 0}>
              <Image imageSrc={images[i]} />
              <Details><Description>{paragraph}</Description></Details>
            </Card>
          ))}
        </Content>
      </SingleColumn>
      <SvgDotPattern1 />
      <SvgDotPattern2 />
      <SvgDotPattern3 />
      <SvgDotPattern4 />
    </Container>
  );
}
