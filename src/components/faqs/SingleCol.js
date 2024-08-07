import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import tw from "twin.macro";
import { SectionHeading } from "components/misc/Headings.js";
import { ReactComponent as ChevronDownIcon } from "feather-icons/dist/icons/chevron-down.svg";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-7.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-8.svg";
import QuestionsImage from "images/original/chibiMiyabi/faq.png";
import { useSelector, useDispatch } from "react-redux";
import {
  setHeight,
  setYaxisPosition,
} from "store/FAQsectionSlice";
import { setIsResizing } from "store/homeSectionSlice";
import enData from "helpers/data/lang/en/japanese.json";
import jaData from "helpers/data/lang/ja/japanese.json";
import roData from "helpers/data/lang/ro/japanese.json";


const Container = tw.div`relative mx-8`;
const Heading = tw(SectionHeading)`w-full text-indigo-500`;

const TwoColumn = tw.div`flex flex-col gap-20 md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
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
const FAQ = tw.div`cursor-pointer select-none mt-5 px-8 sm:px-10 py-5 sm:py-4 rounded-lg text-gray-800 hover:text-gray-900 bg-indigo-200 hover:bg-indigo-300 transition duration-300`;
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

  // get the website language
  let language = useSelector((state) => state.websiteLanguage.language);
  let langData =
    language === "en" ? enData : language === "ja" ? jaData : roData;

  return (
    <Container ref={faqSectionRef}>
        <TwoColumn>
          <ImageColumn>
            <Image imageSrc={QuestionsImage}></Image>
          </ImageColumn>
          <TextColumn>
            <HeaderContent>
              <Heading>{langData.FAQSection.title}</Heading>
            </HeaderContent>
            <FAQSContainer >
              {langData.FAQSection.faqs.map((faq, index) => (
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
