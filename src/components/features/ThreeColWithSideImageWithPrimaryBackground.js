import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
//eslint-disable-next-line
import { SectionHeading } from "components/misc/Headings.js";

// icons
import { IoHeart } from "react-icons/io5";
import { FaUserGroup } from "react-icons/fa6";
import { FaHandSparkles } from "react-icons/fa";
import { FaComments } from "react-icons/fa";
import { FaLightbulb } from "react-icons/fa";

const Container = tw.div`relative bg-primary-900 -mx-8 px-8 text-gray-100`;

const ThreeColumnContainer = styled.div`
  ${tw`flex flex-col items-center md:items-stretch md:flex-row flex-wrap md:justify-center max-w-screen-xl mx-auto py-20 md:py-24 xl:grid xl:grid-cols-6 md:gap-x-8 xl:gap-y-4`}
`;

const Heading = tw(SectionHeading)`w-full col-start-1 col-end-7 row-start-2 row-end-3 mb-10 md:mb-20`;

const Column = styled.div.attrs(props => ({
  style: {
    gridRow: props.gridRow,
    gridColumn: props.gridColumn,
  },
}))`
  ${tw`md:w-1/2 lg:w-1/3 xl:w-2/3 max-w-xs xl:p-0 xl:justify-self-center`}
`;

const Card = styled.div`
  ${tw`flex flex-col items-center md:items-start text-center sm:text-left h-full mx-4 px-2 py-8 w-full xl:ml-0`}
  
  .iconContainer {
    ${tw`bg-gray-100 text-center rounded-full p-5 flex-shrink-0 
      text-primary-500`}
  }

  .textContainer {
    ${tw`mt-6`}
  }

  .title {
    ${tw`tracking-wider font-bold text-xl leading-none`}
  }

  // 
`;


export default ({
  cards = null,
  heading = "De ce să alegi lecțiile noastre?",
}) => {
  /*
   * This componets has an array of object denoting the cards defined below. Each object in the cards array can have the key (Change it according to your need, you can also add more objects to have more cards in this feature component) or you can directly pass this using the cards prop:
   *  1) imageSrc - the image shown at the top of the card
   *  2) title - the title of the card
   *  3) description - the description of the card
   *  If a key for a particular card is not provided, a default value is used
   */

  const defaultCards = [
    { icon: <IoHeart style={{ fontSize: '32px' }} />, 
      title: ["disponibile pentru ", "toate nivelurile"], 
      highlightIndex: "1",
      gridColumn: "1 / span 2", 
      gridRow: "3 / span 1" 
    },
    { icon: <FaUserGroup 
      style={{ fontSize: '32px' }} />, 
      title: ["ședințe ", "individuale sau de grup"],
      gridColumn: "3 / span 2", 
      gridRow: "3 / span 1"
    },
    { icon: <FaLightbulb 
      style={{ fontSize: '32px' }} />, 
      title: ["personalizate pe ", "nivelul și ritmul de studiu", " al cursanților"],
      gridColumn: "5 / span 2", 
      gridRow: "3 / span 1"
    },
    { icon: <FaComments 
      style={{ fontSize: '32px' }} />, 
      title: ["", "răspuns la orice întrabare", " chiar și în afara orelor de curs, în decurs de 24 de ore"],
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
    <Container>
      <ThreeColumnContainer>
        <Heading>{heading}</Heading>
        {cards.map((card, i) => (
          <Column key={i} gridColumn={card.gridColumn} gridRow={card.gridRow}>
            <Card>
              <div className="iconContainer">{card.icon}</div>
              <span className="textContainer">
                <span className="title">
                  <span>{card.title[0]}</span>
                  <span 
                    style={{
                      backgroundImage: 'linear-gradient(to bottom, transparent 50%, #1a4b6b 50%)',
                      backgroundColor: 'transparent',
                      padding: '0 0.2rem 0 0.2rem'
                    }}
                  >{card.title[1]}</span>
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
