import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { SectionHeading } from "components/misc/Headings.js";

// icons
import { IoHeart } from "react-icons/io5";
import { FaUserGroup } from "react-icons/fa6";
import { FaHandSparkles } from "react-icons/fa";
import { FaLightbulb } from "react-icons/fa";
import { FaPenRuler } from "react-icons/fa6";
import { useSelector } from "react-redux";

const Container = tw.div`relative bg-darkPurple-700 mx-0 px-8 text-gray-300`;

const ThreeColumnContainer = styled.div`
  ${tw`flex flex-col items-center md:items-stretch md:flex-row sm:flex-wrap md:justify-center max-w-screen-xl mx-auto py-20 md:py-24 xl:grid xl:grid-cols-6 md:gap-x-8 xl:gap-y-4`}
`;

const Heading = tw(SectionHeading)`sm:w-full col-start-1 col-end-7 row-start-2 row-end-3 mb-10 md:mb-20`;

const Column = styled.div.attrs(props => ({
  style: {
    gridRow: props.gridRow,
    gridColumn: props.gridColumn,
  },
}))`
  ${tw`md:w-1/2 lg:w-1/3 xl:w-2/3 max-w-xs xl:p-0 xl:justify-self-center`}
`;

const Card = styled.div`
  ${tw`flex flex-col items-center md:items-start text-center sm:text-left h-full mx-4 px-2 py-8 sm:w-full xl:ml-0`}
  
  .iconContainer {
    ${tw`bg-gray-300 text-center rounded-full p-5 flex-shrink-0 
      text-darkPurple-500`}
  }

  .textContainer {
    ${tw`mt-6`}
  }

  .title {
    ${tw`tracking-wider font-bold text-xl leading-none`}
  }
`;

export default function WhySection({
  onRender,
  cards = null,
  heading = "De ce să alegi lecțiile noastre?",
}) {
// SET SECTION Y AXIS POSITION

const homeWasRendered = useSelector((state) => state.home.wasRendered);
const whySectionRef = useRef(null);

useEffect(() => {
  if (typeof onRender === "function") {
    onRender();
  }
}, [onRender, homeWasRendered]);

// ---------------------------------------------------------

  const defaultCards = [
    { icon: <IoHeart style={{ fontSize: '32px' }} />, 
      title: ["disponibile pentru ", "toate nivelurile"], 
      highlightIndex: "1",
      gridColumn: "1 / span 2", 
      gridRow: "3 / span 1" 
    },
    { icon: <FaUserGroup 
      style={{ fontSize: '32px' }} />, 
      title: ["ședințe ", "pentru BAC, admitere sau carieră"],
      gridColumn: "3 / span 2", 
      gridRow: "3 / span 1"
    },
    { icon: <FaPenRuler
      style={{ fontSize: '32px' }} />, 
      title: ["personalizate pe ", "nivelul și ritmul de studiu", " al cursanților"],
      gridColumn: "5 / span 2",
      gridRow: "3 / span 1"
    },
    { icon: <FaLightbulb 
      style={{ fontSize: '32px' }} />, 
      title: ["", "răspuns la orice întrebare", " chiar și în afara orelor de curs, în decurs de 24 de ore"],
      gridColumn: "2 / span 2", 
      gridRow: "4 / span 1"
    },
    { icon: <FaHandSparkles 
      style={{ fontSize: '32px' }} />, 
      title: ["materiale de studiu ", "personalizate"],
      gridColumn: "4 / span 2", 
      gridRow: "4 / span 1" 
    },
  ];

  if (!cards) cards = defaultCards;

  return (
    <Container ref={whySectionRef}>
      <ThreeColumnContainer>
        <Heading>{heading}</Heading>
        {cards.map((card, i) => (
          <Column key={i} gridColumn={card.gridColumn} gridRow={card.gridRow}>
            <Card>
              <div className="iconContainer">{card.icon}</div>
              <span className="textContainer">
                <span className="title">
                  <span>{card.title[0]}</span>
                  <span>{card.title[1]}</span>
                  <span>{card.title[2]}</span>
                </span>
              </span>
            </Card>
          </Column>
        ))}
      </ThreeColumnContainer>
    </Container>
  );
};
