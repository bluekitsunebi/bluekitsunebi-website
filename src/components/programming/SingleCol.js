import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import tw from "twin.macro";
import { SectionHeading } from "components/misc/Headings.js";
import { ReactComponent as ChevronDownIcon } from "feather-icons/dist/icons/chevron-down.svg";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-7.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-8.svg";
import QuestionsImage from "images/original/chibiMiyabi/faq-programming.png";
import { useSelector, useDispatch } from "react-redux";
import {
  setHeight,
  setYaxisPosition,
} from "store/FAQsectionSlice";
import { setIsResizing } from "store/homeSectionSlice";


const Container = tw.div`relative mx-0 px-8 bg-darkPurple-700`;
const Heading = tw(SectionHeading)`w-full text-gray-200`;

const TwoColumn = tw.div`flex flex-col gap-4 md:gap-20 md:flex-row-reverse justify-between max-w-screen-xl mx-auto py-16 md:py-24`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const TextColumn = styled(Column)(props => [
  tw`md:w-7/12 mt-16 md:mt-0`,
  props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`
]);

const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}"); max-height: 100%;`,
  tw`rounded bg-contain bg-no-repeat bg-center md:bg-top h-full md:h-96`,
]);
const ImageColumn = tw(Column)`md:w-5/12 flex-shrink-0 h-80 md:h-auto`;



const HeaderContent = tw.div``;

const FAQSContainer = tw.dl`mt-12 max-w-4xl relative`;
const FAQ = tw.div`cursor-pointer select-none mt-5 px-8 sm:px-10 py-5 sm:py-4 rounded-lg text-gray-800 hover:text-gray-900 
bg-gray-200 hover:bg-lightPurple-100 
transition duration-300`;
const Question = tw.dt`flex justify-between items-center`;
const QuestionText = tw.span`text-lg lg:text-xl font-semibold`;
const QuestionToggleIcon = motion(styled.span`
  ${tw`ml-2 transition duration-300`}
  svg {
    ${tw`w-6 h-6`}
  }
`);
const Answer = motion(tw.dd`pointer-events-none text-sm sm:text-base leading-relaxed`);

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute right-0 h-56 w-56 opacity-15 transform translate-x-2/3 -translate-y-12 text-teal-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute left-0 h-64 w-64 opacity-15 transform -translate-x-2/3 text-primary-500 top-1/2`}
`;



export default function FAQSection({
  onRender,
  heading = "Întrebări frecvente",
  faqs = [
    {
      question: "Cum se efectuează plata?",
      answer:
        "Plata se efectuează după ședința gratis de început, semnarea contractului și primirea facturii, în avans pentru un număr de 6 ședințe, prin transfer bancar (găsiți datele în rubrica contact), punând numele elevului în descriere."
    },
    {
      question: "Dacă nu pot intra într-o zi, ce se întâmplă cu ședința plătită?",
      answer:
        "Pentru cei ce au ales un program individual de studiu, este posibilă mutarea acesteia în altă zi din următoarele 4 săptămâni. Cei cărora li se predă în sistem grup vor pierde din păcate ședința plătită dacă motivul absentării nu este unul strict obiectiv."
    },
    {
      question: "Cum pot beneficia de asistența oferită în afara orelor de curs?",
      answer:
        "Ne puteți pune întrebări privind materia studiată prin mail sau prin chat pe orice rețea de socializare. Aveți dreptul la câte 4 întrebări deodată iar răspunsul va veni în decurs de 24 de ore."
    },
  ],
}) {
  // SET SECTION Y AXIS POSITION

const homeWasRendered = useSelector((state) => state.home.wasRendered);
const faqSectionRef = useRef(null);
const dispatch = useDispatch();
let paddingBottom = 0;
let paddingTop = 0;

useEffect(() => {
  if (homeWasRendered === "true") {
    const computedStyle = getComputedStyle(faqSectionRef.current);
    paddingTop = parseFloat(computedStyle.paddingTop);
    paddingBottom = parseFloat(computedStyle.paddingBottom);
    const totalHeight =
    faqSectionRef.current.offsetHeight + paddingTop + paddingBottom;
    dispatch(setHeight(totalHeight));
    const rect = faqSectionRef.current.getBoundingClientRect();
    const yOffset = window.pageYOffset || document.documentElement.scrollTop;
    const yPosition = rect.top + yOffset;
    dispatch(setYaxisPosition(yPosition + 40));
  }
  if (typeof onRender === "function") {
    onRender();
  }
}, [onRender, homeWasRendered]);

// ---------------------------------------------------------

  const [activeQuestionIndex, setActiveQuestionIndex] = useState(null);

  const toggleQuestion = questionIndex => {
    if (activeQuestionIndex === questionIndex) setActiveQuestionIndex(null);
    else setActiveQuestionIndex(questionIndex);
    dispatch(setIsResizing(true));
    dispatch(setIsResizing(false));
  };


  return (
    <Container ref={faqSectionRef}>
        <TwoColumn>
          <ImageColumn>
            <Image imageSrc={QuestionsImage}></Image>
          </ImageColumn>
          <TextColumn>
            <HeaderContent>
              <Heading>{heading}</Heading>
            </HeaderContent>
            <FAQSContainer >
              {faqs.map((faq, index) => (
                <FAQ
                  key={index}
                  onClick={() => {
                    toggleQuestion(index);
                  }}
                  className="group"
                >
                  <Question>
                    <QuestionText>{faq.question}</QuestionText>
                    <QuestionToggleIcon
                      variants={{
                        collapsed: { rotate: 0 },
                        open: { rotate: -180 }
                      }}
                      initial="collapsed"
                      animate={activeQuestionIndex === index ? "open" : "collapsed"}
                      transition={{ duration: 0.02, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <ChevronDownIcon />
                    </QuestionToggleIcon>
                  </Question>
                  <Answer
                    variants={{
                      open: { opacity: 1, height: "auto", marginTop: "16px" },
                      collapsed: { opacity: 0, height: 0, marginTop: "0px" }
                    }}
                    initial="collapsed"
                    animate={activeQuestionIndex === index ? "open" : "collapsed"}
                    transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    {faq.answer}
                  </Answer>
                </FAQ>
              ))}
            </FAQSContainer>
          </TextColumn>
        </TwoColumn>
      <DecoratorBlob1/>
      <DecoratorBlob2 />
    </Container>
  );
};
