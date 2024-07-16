import React, { useEffect, useRef } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading } from "components/misc/Headings.js";

// icons
import { FaRegComments } from "react-icons/fa6";
import { PiAirplaneTilt } from "react-icons/pi";
import { PiPenNib } from "react-icons/pi";
import { PiCode } from "react-icons/pi";
import { PiChalkboardTeacher } from "react-icons/pi";

import enData from "helpers/data/lang/en/japanese.json";
import jaData from "helpers/data/lang/ja/japanese.json";
import roData from "helpers/data/lang/ro/japanese.json";

//img
import teacher from "../../images/original/teacher.jpg";

import { useSelector, useDispatch } from "react-redux";
import { setHeight, setYaxisPosition } from "store/profesorSectionSlice";

const Container = tw.div`relative mx-8`;
const TwoColumn = tw.div`flex flex-wrap flex-col justify-between max-w-screen-xl mx-auto py-20 
sm:flex-row 
md:py-24 md:items-center`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;

const ImageColumn = styled(Column)`
  ${tw`flex-shrink-0 size-fit relative w-2/3 pl-8 pb-8 min-w-64
  md:w-5/12 
  sm:pl-16 sm:pb-16 sm:pt-0 sm:pr-0`}
`;

const Image = tw.div`relative flex`;

const TextColumn = styled(Column)((props) => [
  tw`md:w-7/12 mt-16 md:mt-0`,
  props.textOnLeft
    ? tw`md:order-first md:pr-12 lg:pr-16`
    : tw`md:ml-12 lg:ml-16 md:order-last`,
]);

const FrameStyled = styled.div`
  ${tw`absolute bg-blue-900 h-10`};
  height: 100%;
  width: 100%;
  z-index: -2;
  border-radius: 10%;
  top: 10%;
  right: 15%;
`;
const customStyleOuterDiv = {
  top: "15%",
  height: "80%",
  right: "0",
  width: "110%",
  position: "absolute",
  zIndex: "-1",
  border: "3px solid #2b7db3",
  borderRadius: "10%",
};
const customStyleInnerDiv = {
  top: "15%",
  height: "100%",
  right: "2rem",
  width: "75%",
  position: "absolute",
  zIndex: "-1",
  border: "3px solid #2b7db3",
  borderRadius: "10%",
};

const TextContent = tw.div`lg:py-8 text-center md:text-left`;

const Heading = tw(
  SectionHeading
)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight text-secondary-500`;

const Features = tw.div`mt-8 max-w-sm mx-auto md:mx-0`;
const Feature = tw.div`mt-8 flex items-start flex-col md:flex-row`;

const FeatureIconContainer = styled.div`
  ${tw`border border-2 border-primary-900`};
  ${tw`mx-auto inline-block text-center rounded-full p-2 flex-shrink-0 md:ml-0 md:mr-0`}
  svg {
    ${tw`w-5 h-5 text-primary-900`}
  }
`;

const FeatureText = tw.div`mt-4 md:mt-0 md:ml-4 text-center md:text-left mx-auto`;
const FeatureDescription = tw.div`mt-1 text-sm text-gray-900`;

const Highlight = styled.span`
  ${tw`text-primary-900`}
`;

export default function ProfesorSection({
  onRender,
  icons = null,
  textOnLeft = true,
}) {
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

  // The textOnLeft boolean prop can be used to display either the text on left or right side of the image.

  /*
   * Change the features variable as you like, add or delete objects
   * `icon` must be a React SVG component. See how BriefcaseIcon is imported above. For a full list of available icons, see Feather Icons.
   */
  const defaultIcons = {
    0: FaRegComments,
    1: PiAirplaneTilt,
    2: PiPenNib,
    3: PiCode,
    4: PiChalkboardTeacher,
  };

  if (!icons) icons = defaultIcons;

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
            <img
              src={teacher}
              alt="teacher photo"
              style={{
                borderRadius: "10%",
                boxShadow: "-1rem 1rem 1.5rem rgba(0, 0, 0, 0.4)",
              }}
            />
          </Image>
        </ImageColumn>
        <TextColumn textOnLeft={textOnLeft}>
          <TextContent>
            <Heading>
              {langData.TeacherSection.title[0]}
              <Highlight>{langData.TeacherSection.title[1]}</Highlight>
            </Heading>
            <Features>
              {langData.TeacherSection.description.map((feature, index) => (
                <Feature key={index}>
                  <FeatureIconContainer>
                    {/* TO DO - WEBSITE LANGUAGE */}
                    {/* {React.cloneElement(<icons.index />, {
                      style: { width: "24px", height: "24px" },
                    })} */}
                  </FeatureIconContainer>
                  <FeatureText>
                    <FeatureDescription>{feature}</FeatureDescription>
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
