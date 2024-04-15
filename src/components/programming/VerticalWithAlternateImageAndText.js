import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { ReactComponent as SvgDotPatternIcon } from "../../images/dot-pattern.svg";
import { SectionHeading as HeadingTitle } from "../misc/Headings.js";
import talismans from "../../images/original/chibiMiyabi/talismans.png";
import read from "../../images/original/chibiMiyabi/reading.png";
import write from "../../images/original/chibiMiyabi/writeing.png";
import { useSelector, useDispatch } from "react-redux";
import {
  setAboutSectionId,
  setHeight,
  setYaxisPosition,
} from "store/aboutSectionSlice";

const Container = tw.div`relative mx-8`;

const SingleColumn = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

const HeadingInfoContainer = tw.div`flex flex-col items-center`;

const Content = tw.div`mt-12`;

const Card = styled.div(props => [
  tw`mt-16 md:mt-8 md:flex justify-between items-center gap-x-10`,
  props.reversed ? tw`flex-row-reverse` : "flex-row"
]);
const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded md:w-1/2 lg:w-5/12 xl:w-1/3 flex-shrink-0 h-80 md:h-144 bg-contain bg-center bg-no-repeat mx-4 sm:mx-8 md:mx-4 lg:mx-8`
]);
const Details = tw.div`mt-4 md:mt-0 md:max-w-2xl mx-4 sm:mx-8 md:mx-4 lg:mx-8`;
const Description = tw.p`mt-2 text-base sm:text-xl leading-loose text-gray-800`;
const Kaomoji = tw.span`inline-block whitespace-nowrap w-fit`;

const SvgDotPattern1 = tw(
  SvgDotPatternIcon
)`absolute top-0 left-0 transform -translate-x-20 rotate-90 translate-y-8 -z-10 opacity-50 text-secondary-500 fill-current w-24`;
const SvgDotPattern2 = tw(
  SvgDotPatternIcon
)`absolute top-0 right-0 transform translate-x-20 rotate-45 translate-y-24 -z-10 opacity-50 text-secondary-500 fill-current w-24`;
const SvgDotPattern3 = tw(
  SvgDotPatternIcon
)`absolute bottom-0 left-0 transform -translate-x-20 rotate-45 -translate-y-8 -z-10 opacity-50 text-secondary-500 fill-current w-24`;
const SvgDotPattern4 = tw(
  SvgDotPatternIcon
)`absolute bottom-0 right-0 transform translate-x-20 rotate-90 -translate-y-24 -z-10 opacity-50 text-secondary-500 fill-current w-24`;


export default function AboutSection({ onRender }) {
// SET SECTION Y AXIS POSITION

const dispatch = useDispatch();
const homeWasRendered = useSelector((state) => state.home.wasRendered);
const aboutSectionId = "about-section";
const aboutSectionRef = useRef(null);
let paddingBottom = 0;
let paddingTop = 0;

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

  const cards = [
    {
      imageSrc: talismans,
      description:
        (<Description>Aplicatii de mobil? Site-uri web? Sau poate vrei sa inveti pentru BAC si examenul de admitere? Oricare ar fi motivul, suntem mai mult decat pregatiti sa-ti venim in ajutor. Programarea este des vazuta ca fiind un domeniu accesibil doar celor supradotati, dar in realitate oricine are un nivel mediu de inteligenta are toate sansele sa devina programator daca depune efortul necesar. Majoritatea sarcinilor unui software developer implica refolosirea si innadirea unor parti de cod deja existente sau respectarea unei structuri prestabilite, lucru care se poate invata cu destul antrenament.</Description>),
    },

    {
      imageSrc: read,
      description:
        (<Description>Lectiile noastre sunt concepute de programatori cu experienta reala in domeniu si care au cunostinte intr-o varietate mare de limbaje si tehnologii folosite in prezent de majoritatea companiilor din intreaga lume. Limbajele predate in cursurile noastre depind de telul fiecaruia: celor care vor sa invete pentru examenele de bacalaureat si de admitere li se va preda C++, pe cand celor care vor o cariera in domeniu li se vor preda HTML, CSS, Javascript si ulterior React. Motivul pentru care am ales Javascript ca si limbaj pe care sa-l predam este versatilitatea acestuia. Acesta se foloseste atat pentru partea de server si comunicare cu baza de date cat si pentru partea de interfata, cu care interactioneaza userul. Stiind Javasctipt ai cele mai multe porti deschise pentru a obtine primul tau job in domeniul IT.</Description>),
    },

    {
      imageSrc: write,
      description:
        (<Description>O mare parte din timpul unui software developer este ocupata de remedierea diverselor erori aparute in urma procesului de dezvoltare. Odata cu experienta, depistarea partii de cod care produce eroarea devine ceva instinctiv, dar la inceput este usor sa te pierzi nestiind cum sa continui. Suntem aici sa-ti dam o mana de ajutor in lupta contra oricaror erori intampini de-a lungul procesului de invatare, deci stai fara griji!</Description>),
    }
  ];

  return (
    <Container id={aboutSectionId} ref={aboutSectionRef}>
      <SingleColumn>
        <HeadingInfoContainer>
          <HeadingTitle>Cursuri online de programare</HeadingTitle>
        </HeadingInfoContainer>

        <Content>
          {cards.map((card, i) => (
            <Card key={i} reversed={i % 2 === 1}>
              <Image imageSrc={card.imageSrc} />
              <Details>
                {card.description}
              </Details>
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
};
