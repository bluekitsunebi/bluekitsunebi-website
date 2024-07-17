import React, { useEffect, useRef } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading } from "components/misc/Headings.js";
import enData from "helpers/data/lang/en/programming.json";
import jaData from "helpers/data/lang/ja/programming.json";
import roData from "helpers/data/lang/ro/programming.json";
// icons
import { PiCube } from "react-icons/pi";
import { FaReact } from "react-icons/fa";
import { PiShareNetwork } from "react-icons/pi";
import { PiCloudArrowUp } from "react-icons/pi";
import { PiCode } from "react-icons/pi";

//img
import teacher from "../../images/original/teacher-programming.webp";
import teacherEng from "../../images/original/teacher-programming-eng.webp";

import { useSelector, useDispatch } from "react-redux";
import { setHeight, setYaxisPosition } from "store/profesorSectionSlice";

const Container = tw.div`relative mx-8`;
const TwoColumn = tw.div`flex flex-wrap flex-col justify-between max-w-screen-xl mx-auto py-20 
sm:flex-row-reverse
md:py-24 md:items-center`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;

const ImageColumn = styled(Column)`
  ${tw`flex-shrink-0 size-fit relative w-2/3 pl-8 pb-8 min-w-64
  md:w-5/12 
  sm:pr-16 sm:pb-16 sm:pt-0 sm:pl-0`}
`;

const Image = tw.div`relative flex`;

const TextColumn = styled(Column)((props) => [
  tw`md:w-7/12 mt-16 md:mt-0`,
  props.textOnLeft
    ? tw`md:order-first md:pl-12 lg:pl-16`
    : tw`md:ml-12 lg:ml-16 md:order-last`,
]);

const FrameStyled = styled.div`
  ${tw`absolute  bg-darkBlue-500 h-10 rounded-3xl`};
  height: 100%;
  width: 100%;
  z-index: -2;
  top: 10%;
  left: 15%;
`;

const ProfilePhoto = styled.div`
  ${tw`overflow-hidden rounded-3xl p-8 bg-lightBlue-500`};
  box-shadow: 1rem 1rem 1.5rem rgba(0, 0, 0, 0.4);
`;
const ProfilePhotoP0 = styled.div`
  ${tw`overflow-hidden rounded-3xl bg-lightBlue-500`};
  box-shadow: 1rem 1rem 1.5rem rgba(0, 0, 0, 0.4);
`;

const customStyleOuterDiv = {
  top: "15%",
  height: "80%",
  left: "0",
  width: "110%",
  position: "absolute",
  zIndex: "-1",
  border: "3px solid",
  borderRadius: "1.5rem",
  borderColor: "#9372b3",
};
const customStyleInnerDiv = {
  top: "15%",
  height: "100%",
  left: "2rem",
  width: "75%",
  position: "absolute",
  zIndex: "-1",
  border: "3px solid",
  borderRadius: "1.5rem",
  borderColor: "#bd93e6",
};

const TextContent = tw.div`lg:py-8 flex flex-col md:items-end text-center md:text-left`;

const Heading = tw(
  SectionHeading
)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-right leading-tight text-lightBlue-400`;

const Highlight = styled.span`
  ${tw`text-gray-200`}
`;

const Features = tw.div`mt-8 max-w-sm mx-auto md:mx-0`;
const Feature = tw.div`mt-8 flex items-start flex-col md:flex-row-reverse`;

const FeatureIconContainer = styled.div`
  ${() => tw`border border-2 border-lightPurple-500`};
  ${tw`mx-auto inline-block text-center rounded-full p-2 flex-shrink-0 md:ml-0 md:mr-0`}
  svg {
    ${tw`w-5 h-5 text-lightPurple-500`}
  }
`;

const FeatureText = tw.div`mt-4 md:mt-0 md:mr-4 text-center md:text-left mx-auto w-full`;
const FeatureDescription = tw.div`mt-1 text-sm text-gray-100`;

export default function ProfesorSection({ onRender, textOnLeft = true }) {
  // SET SECTION Y AXIS POSITION

  const homeWasRendered = useSelector((state) => state.home.wasRendered);
  const profesorSectionRef = useRef(null);
  const dispatch = useDispatch();
  let paddingBottom = 0;
  let paddingTop = 0;

  useEffect(() => {
    if (homeWasRendered === "true") {
      const computedStyle = getComputedStyle(profesorSectionRef.current);
      paddingTop = parseFloat(computedStyle.paddingTop);
      paddingBottom = parseFloat(computedStyle.paddingBottom);
      const totalHeight =
        profesorSectionRef.current.offsetHeight + paddingTop + paddingBottom;
      dispatch(setHeight(totalHeight));
      const rect = profesorSectionRef.current.getBoundingClientRect();
      const yOffset = window.pageYOffset || document.documentElement.scrollTop;
      const yPosition = rect.top + yOffset;
      dispatch(setYaxisPosition(yPosition));
    }
    if (typeof onRender === "function") {
      onRender();
    }
  }, [onRender, homeWasRendered]);

  // ---------------------------------------------------------

  // get the website language
  let language = useSelector((state) => state.websiteLanguage.language);
  let langData =
    language === "en" ? enData : language === "ja" ? jaData : roData;

  return (
    <Container ref={profesorSectionRef}>
      <TwoColumn>
        <ImageColumn>
          <Image>
            <FrameStyled></FrameStyled>
            <div style={customStyleOuterDiv}></div>
            <div style={customStyleInnerDiv}></div>
            {language === "ro" ? 
            
            <ProfilePhoto>
              <img src={teacher} alt="teacher" />
            </ProfilePhoto>
            : 
            <ProfilePhotoP0>
              <img src={teacherEng} alt="teacher" />
            </ProfilePhotoP0>
            }
          </Image>
        </ImageColumn>
        <TextColumn textOnLeft={textOnLeft}>
          <TextContent>
            <Heading>
              <Highlight>{langData.TeacherSection.title[0]}</Highlight>
              {langData.TeacherSection.title[1]}
            </Heading>
            <Features>
              {langData.TeacherSection.description.map((feature, index) => (
                <Feature key={index}>
                  <FeatureIconContainer>

                  {index === 0 ? (
                      <PiCube />
                    ) : index === 1 ? (
                      <FaReact />
                    ) : index === 2 ? (
                      <PiShareNetwork />
                    ) : index === 3 ? (
                      <PiCloudArrowUp />
                    ) : (
                      <PiCode />
                    )}
                    
                  </FeatureIconContainer>
                  <FeatureText>
                    <FeatureDescription>
                      {feature}
                    </FeatureDescription>
                  </FeatureText>
                </Feature>
              ))}
            </Features>
          </TextContent>
        </TextColumn>
      </TwoColumn>
    </Container>
  );
}
