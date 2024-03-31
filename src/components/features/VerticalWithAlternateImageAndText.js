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
        (<Description>Dacă vrei să ajungi profesionist, să înțelegi anime fără subtitrări, plănuiești să vizitezi Japonia, sau pur și simplu vrei să înveți japoneza ca hobby, ai ajuns unde trebuie. Ne mândrim cu lecțiile noastre de calitate și cu ritmul în care avansează toți cursanții noștri, iar nivelul de cunoștințe pe care îl are profesorul nostru de japoneză este net superior multor altor opțiuni de pe piață. Ideea este simplă: îți place și dorești să aloci timpul necesar ➔ progresezi cum probabil nici tu nu îți imaginezi.</Description>),
    },

    {
      imageSrc: read,
      description:
        (<Description> Japoneza este o limbă accesibilă tuturor, cu foarte multe elemente logice și ușor de asimilat atunci când este predată cum trebuie. Gramatica de bază este simplistă, pronunția ușor de stăpânit nouă ca români, iar vocabularul și cele trei alfabete pot fi biruite cu destul devotament. Având în vedere că deja vorbești una dintre cele mai complexe limbi de pe planetă, sigur îi dai și japonezei de cap. <Kaomoji>(≧▽≦)</Kaomoji> Un profesor bun poate răspunde la orice întrebare, indiferent de gradul acesteia de dificultate. La noi lucrurile stau mai bine de atât - poți întreba orice chiar și în afara orelor de curs. Ai auzit ceva într-un anime sau ai citit un pasaj dificil undeva? Dă-i drumul și întreabă! <Kaomoji>( ￣▽￣)b</Kaomoji></Description>),
    },

    {
      imageSrc: write,
      description:
        (<Description>Poate îți dorești și să obții atestatele JLPT de limba japoneză dacă tot înveți, nu? Nu-ți face griji, noi predăm limba ca întreg, pentru a putea fi înțeleasă și folosită în deplinătatea ei, deci dacă te ții de treabă le vei trece și pe acelea cu brio. Transformă-ți visul în obiectiv și nu rata experiența unică pe care ți-o oferă învățarea limbii japoneze. Și cel mai important, ține minte: <br /><i><b>Efortul</b> depus <b>cum trebuie</b> transformă <b>pasiunea</b> în <b>abilități</b>.</i></Description>),
    }
  ];

  return (
    <Container id={aboutSectionId} ref={aboutSectionRef}>
      <SingleColumn>
        <HeadingInfoContainer>
          <HeadingTitle>Cursuri online de japoneză</HeadingTitle>
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
