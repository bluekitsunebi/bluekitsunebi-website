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
// import usePreloadImages from 'hooks/usePreloadImages';

const Container = tw.div`relative mx-8`;

const SingleColumn = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

const HeadingInfoContainer = tw.div`flex flex-col items-center text-gray-300`;

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

  const cards = [
    {
      imageSrc: laptop,
      description:
        (<Description>Aplicații de mobil? Site-uri web? Sau poate vrei să înveți pentru BAC și examenul de admitere? Oricare ar fi motivul, suntem mai mult decât pregătiți să-ți venim în ajutor. Programarea este des văzută ca fiind un domeniu accesibil doar celor supradotați, dar în realitate oricine are un nivel mediu de inteligență are toate șansele să devină programator dacă depune efortul necesar. Majoritatea sarcinilor unui software developer implică refolosirea și innădirea unor părți de cod deja existente sau respectarea unei structuri prestabilite, lucru care se poate învăța cu destul antrenament.</Description>),
    },

    {
      imageSrc: study,
      description:
        (<Description>Lecțiile noastre sunt concepute de programatori cu experiență reală în domeniu și care au cunoștințe într-o varietate mare de limbaje și tehnologii folosite în prezent de majoritatea companiilor din întreaga lume. Limbajele predate în cursurile noastre depind de țelul fiecăruia: celor care vor să învețe pentru examenele de bacalaureat și de admitere li se va preda C++, pe când celor care vor o carieră în domeniu li se vor preda HTML, CSS, JavaScript și ulterior React. Motivul pentru care am ales JavaScript ca și limbaj pe care să-l predăm este versatilitatea acestuia. Acesta se folosește atât pentru partea de server și comunicare cu baza de date cât și pentru partea de interfață, cu care interacționează userul. Știind JavaScript ai cele mai multe porți deschise pentru a obține primul tău job în domeniul IT.</Description>),
    },

    {
      imageSrc: fight,
      description:
        (<Description>O mare parte din timpul unui software developer este ocupată de remedierea diverselor erori apărute în urma procesului de dezvoltare. Odată cu experiența, depistarea părții de cod care produce eroarea devine ceva instinctiv, dar la început este ușor să te pierzi neștiind cum să continui. Suntem aici să-ți dăm o mână de ajutor în lupta contra oricăror erori întâmpini de-a lungul procesului de învățare, deci stai fără griji!</Description>),
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
            <Card key={i} reversed={i % 2 === 0}>
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
