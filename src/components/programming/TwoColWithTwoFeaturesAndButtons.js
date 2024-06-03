import React, { useEffect, useRef } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading } from "components/misc/Headings.js";

// icons
import { PiCube } from "react-icons/pi";
import { FaReact } from "react-icons/fa";
import { PiShareNetwork } from "react-icons/pi";
import { PiCloudArrowUp } from "react-icons/pi";
import { PiCode } from "react-icons/pi";

//img
import teacher from "../../images/original/teacher-programming.webp";

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
  ${() =>
    tw`border border-2 border-lightPurple-500`};
  ${tw`mx-auto inline-block text-center rounded-full p-2 flex-shrink-0 md:ml-0 md:mr-0`}
  svg {
    ${tw`w-5 h-5 text-lightPurple-500`}
  }
`;

const FeatureText = tw.div`mt-4 md:mt-0 md:mr-4 text-center md:text-left mx-auto`;
const FeatureDescription = tw.div`mt-1 text-sm text-gray-100`;

export default function ProfesorSection({
  onRender,
  heading = (
    <>
      Profesorul de informatică <Highlight>Teodorescu Cezara</Highlight>.
    </>
  ),
  features = null,
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
  const defaultFeatures = [
    {
      Icon: PiCube,
      description:
        "experiență de lucru ca programator pe 5+ proiecte reale (dintre care 2 de lungă durată)",
    },
    {
      Icon: FaReact,
      description:
        "experiență de lucru cu cele mai utilizate tehnologii front-end (React, Angular, Redux, Tailwind CSS etc.)",
    },
    {
      Icon: PiShareNetwork,
      description:
        "experiență de lucru în medii de dezvoltare bazate pe microservicii",
    },
    {
      Icon: PiCloudArrowUp,
      description: "experiență în lansare de site-uri în regim serverless",
    },
    {
      Icon: PiCode,
      description: "studii în domeniul pedagogiei și al informaticii",
    },
  ];

  if (!features) features = defaultFeatures;

  return (
    <Container ref={profesorSectionRef}>
      <TwoColumn>
        <ImageColumn>
          <Image>
            <FrameStyled></FrameStyled>
            <div style={customStyleOuterDiv}></div>
            <div style={customStyleInnerDiv}></div>
            <ProfilePhoto>
              <img src={teacher} alt="teacher photo" />
            </ProfilePhoto>
          </Image>
        </ImageColumn>
        <TextColumn textOnLeft={textOnLeft}>
          <TextContent>
            <Heading>{heading}</Heading>
            <Features>
              {features.map((feature, index) => (
                <Feature key={index}>
                  <FeatureIconContainer>
                    {React.cloneElement(<feature.Icon />, {
                      style: { width: "24px", height: "24px" },
                    })}
                  </FeatureIconContainer>
                  <FeatureText>
                    <FeatureDescription>
                      {feature.description}
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
