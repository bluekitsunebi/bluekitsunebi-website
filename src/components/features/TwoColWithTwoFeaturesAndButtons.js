import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading } from "components/misc/Headings.js";

// icons
import { FaRegComments } from "react-icons/fa6";
import { PiAirplaneTiltLight } from "react-icons/pi";
import { PiPenNibLight } from "react-icons/pi";
import { PiCodeLight } from "react-icons/pi";
import { PiChalkboardTeacherLight } from "react-icons/pi";

//img
import teacher from "../../images/original/teacher.jpg";

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;

const ImageColumn = styled(Column)`
  ${tw`flex-shrink-0 size-fit relative w-2/3 pl-8 pb-8 min-w-64
  md:w-5/12 
  sm:pl-16 sm:pb-16 sm:pt-0 sm:pr-0`}`;

const TextColumn = styled(Column)(props => [
  tw`md:w-7/12 mt-16 md:mt-0`,
  props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`
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
  top: '15%',
  height: '80%',
  right: '0',
  width: '110%',
  position: 'absolute',
  zIndex: '-1',
  border: '3px solid #2b7db3',
  borderRadius: '10%',
};
const customStyleInnerDiv = {
  top: '15%',
  height: '100%',
  right: '2rem',
  width: '75%',
  position: 'absolute',
  zIndex: '-1',
  border: '3px solid #2b7db3',
  borderRadius: '10%',
};

const TextContent = tw.div`lg:py-8 text-center md:text-left`;

const Heading = tw(
  SectionHeading
)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight text-secondary-500`;

const Features = tw.div`mt-8 max-w-sm mx-auto md:mx-0`;
const Feature = tw.div`mt-8 flex items-start flex-col md:flex-row`;

const FeatureIconContainer = styled.div`
  ${props => props.isFirst ? tw`bg-primary-900` : tw`border border-primary-900`};
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


export default ({
  heading = (<>Profesorul de japoneză <Highlight>Cheșca Vicențiu</Highlight>.</>
  ),
  features = null,
  textOnLeft = true
}) => {
  // The textOnLeft boolean prop can be used to display either the text on left or right side of the image.

  /*
   * Change the features variable as you like, add or delete objects
   * `icon` must be a React SVG component. See how BriefcaseIcon is imported above. For a full list of available icons, see Feather Icons.
   */
  const defaultFeatures = [
    {
      Icon: FaRegComments,
      description: "Vorbitor fluent de japoneză"
    },
    {
      Icon: PiAirplaneTiltLight,
      description: "Experiență ca ghid turistic și interpret pentru grupuri de turisti japonezi"
    },
    {
      Icon: PiPenNibLight,
      description: "Experienta de traducere online de documente si scrieri din limba japoneza in engleza si vice-versa"
    },
    {
      Icon: PiCodeLight,
      description: "Experienta de colaborare cu japonezi nativi pe proiecte de dezvoltare software"
    },
    {
      Icon: PiChalkboardTeacherLight,
      description: "Experienta de predare a limbii japoneze de peste 5 ani"
    },
  ];

  if (!features) features = defaultFeatures;

  return (
    <Container>
      <TwoColumn>
        <ImageColumn>
          <div>
            <div style={{ 
              position: 'relative',
            }}>
              <FrameStyled></FrameStyled>
              <div style={customStyleOuterDiv}></div>
              <div style={customStyleInnerDiv}></div>
              <img 
              src={teacher} 
              alt="teacher photo" 
              style={{ 
                borderRadius: '10%',
                boxShadow: '-1rem 1rem 1.5rem rgba(0, 0, 0, 0.4)' 
              }}/>
            </div>
          </div>
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
                    <FeatureDescription>{feature.description}</FeatureDescription>
                  </FeatureText>
                </Feature>
              ))}
            </Features>
          </TextContent>
        </TextColumn>
      </TwoColumn>
    </Container>
  );
};
