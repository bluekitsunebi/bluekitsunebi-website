import React, { useState, useEffect, useRef } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { ContentWithPaddingXl } from "components/misc/Layouts.js";
import { ReactComponent as SvgDecoratorBlob } from "images/svg-decorator-blob-6.svg";
import { useSelector, useDispatch } from "react-redux";
import {
  setHeight,
  setYaxisPosition,
} from "store/coursesSectionSlice";
import enData from "helpers/data/lang/en/japanese.json";
import jaData from "helpers/data/lang/ja/japanese.json";
import roData from "helpers/data/lang/ro/japanese.json";

const Container = tw.div`relative mx-8`;
const HeaderContainer = tw.div`mt-10 w-full flex flex-col items-center`;

const Heading = tw(SectionHeading)`w-full text-primary-900`;

const Switcher = tw.div`flex flex-col gap-2 w-auto border-2 rounded-3xl px-1 py-1 mt-8 border-primary-900 sm:flex-row sm:rounded-full`;

const SwitchButton = styled.button`
  ${tw`sm:w-32 px-4 sm:px-8 py-3 rounded-3xl sm:rounded-full focus:outline-none text-sm font-bold text-gray-700 transition duration-300`}
  ${props => props.active && tw`bg-primary-900 text-gray-100`}
`;

const PlansContainer = tw.div`flex justify-evenly flex-col lg:flex-row items-center lg:items-stretch relative lg:gap-8 xl:gap-16`;

const Plan = styled.div`
  ${tw`w-full max-w-sm mt-16 text-center px-8 rounded-lg shadow relative pt-2 text-gray-900 bg-white flex flex-col`}
  .planHighlight {
    ${tw`rounded-t-lg absolute top-0 inset-x-0 h-2`}
  }

  ${props =>
    props.featured &&
    css`
      background: rgb(100,21,255);
      background: linear-gradient(135deg, rgba(100,21,255,1) 0%, rgba(128,64,252,1) 100%);
      background: rgb(85,60,154);
      background: linear-gradient(135deg, rgba(85,60,154,1) 0%, rgba(128,90,213,1) 100%);
      background: rgb(76,81,191);
      background: linear-gradient(135deg, rgba(76,81,191,1) 0%, rgba(102,126,234,1) 100%);
      ${tw`bg-primary-500 text-gray-100`}
      .planHighlight {
        ${tw`hidden`}
      }
      .duration {
        ${tw`text-gray-200!`}
      }
      ${PlanFeatures} {
        ${tw`border-indigo-500`}
      }
      .feature:not(.mainFeature) {
        ${tw`text-gray-300!`}
      }
      ${BuyNowButton} {
        ${tw`bg-gray-100 text-primary-500 hocus:bg-gray-300 hocus:text-primary-800`}
    `}
`;

const PlanHeader = styled.div`
  ${tw`flex flex-col uppercase leading-relaxed py-8`}
  .name {
    ${tw`font-bold text-xl`}
  }
  .disabled {
    ${tw`lg:my-12 lg:py-2`}
  }
  .price {
    ${tw`font-bold text-4xl sm:text-5xl my-1`}
  }
  .duration {
    ${tw`text-gray-500 font-bold tracking-widest`}
  }
`;

const DurationSelector = tw.div`
  flex flex-col text-gray-500 font-bold tracking-widest items-start gap-1
`;
const SelectButton = styled.div`

  ${tw`
    p-2 rounded-full transition duration-300 border-solid border-2 border-gray-500
  `}

  ${props => props.active && tw`
    bg-primary-900 border-primary-900
  `}
`;

const PlanFeatures = styled.div`
  ${tw`flex flex-col -mx-8 px-8 py-8 border-t-2 border-b-2 flex-1`}
  .feature {
    ${tw`mt-5 first:mt-0 font-medium`}
    &:not(.mainFeature) {
      ${tw`text-gray-600`}
    }
  }
  .mainFeature {
    ${tw`text-xl font-bold tracking-wide`}
  }
`;

const PlanAction = tw.div`px-4 sm:px-8 xl:px-16 py-8`;
const BuyNowButton = styled(PrimaryButtonBase)`
  ${tw`rounded-full uppercase tracking-wider py-4 w-full text-sm hover:shadow-xl transform hocus:translate-x-px hocus:-translate-y-px focus:shadow-outline`}
`;

const BuyNowButton__disabled = styled(PrimaryButtonBase)`
  ${tw`rounded-full uppercase tracking-wider py-4 w-full text-sm
  bg-gray-400`}
`;

const DecoratorBlob = styled(SvgDecoratorBlob)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-64 w-64 opacity-25 transform -translate-x-1/2 translate-y-1/2`}
`;


export default function CoursesSection({
  onRender,
}) {
  // ------------------------------------------------------------
  // SET SECTION Y AXIS POSITION

const homeWasRendered = useSelector((state) => state.home.wasRendered);
const coursesSectionRef = useRef(null);
const dispatch = useDispatch();
let paddingBottom = 0;
let paddingTop = 0;

useEffect(() => {
  if (homeWasRendered === "true") {
    const computedStyle = getComputedStyle(coursesSectionRef.current);
    paddingTop = parseFloat(computedStyle.paddingTop);
    paddingBottom = parseFloat(computedStyle.paddingBottom);
    const totalHeight =
    coursesSectionRef.current.offsetHeight + paddingTop + paddingBottom;
    dispatch(setHeight(totalHeight));
    const rect = coursesSectionRef.current.getBoundingClientRect();
    const yOffset = window.pageYOffset || document.documentElement.scrollTop;
    const yPosition = rect.top + yOffset;
    dispatch(setYaxisPosition(yPosition + 90));
  }
  if (typeof onRender === "function") {
    onRender();
  }
}, [onRender, homeWasRendered]);

  // ---------------------------------------------------------
  // scroll to contact section on register
  const contactSectionId = useSelector(state => state.contactSection.id);
  const register = () => {
    const element = document.getElementById(contactSectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [activeDurationIndex, setActiveDurationIndex] = useState(1);

  const highlightGradientsCss = [
    css`
      background: rgb(56, 178, 172);
      background: linear-gradient(115deg, rgba(56, 178, 172, 1) 0%, rgba(129, 230, 217, 1) 100%);
    `,
    css`
      background: rgb(56, 178, 172);
      background-image: linear-gradient(115deg, #6415ff, #7431ff, #8244ff, #8e56ff, #9a66ff);
    `,
    css`
      background: rgb(245, 101, 101);
      background: linear-gradient(115deg, rgba(245, 101, 101, 1) 0%, rgba(254, 178, 178, 1) 100%);
    `
  ];

  const highlightGradientsCss__disabled = css`
    background: rgb(160, 174, 192);
    background: linear-gradient(115deg, rgba(160, 174, 192, 1) 0%, rgba(203, 213, 224, 1) 100%);
  `;

  // get the website language
  let language = useSelector((state) => state.websiteLanguage.language);
  let langData =
    language === "en" ? enData : language === "ja" ? jaData : roData;

  const plans = langData.PricesSection.plans;

  return (
    <Container ref={coursesSectionRef}>
      <ContentWithPaddingXl>
        <HeaderContainer>
          <Heading>{langData.PricesSection.title}</Heading>
          <Switcher>
            {langData.PricesSection.categories.map((category, index) => (
              <SwitchButton active={activeCategoryIndex === index} key={index} onClick={() => setActiveCategoryIndex(index)}>{category.switcherText}</SwitchButton>
            ))}
          </Switcher>
        </HeaderContainer>
        <PlansContainer>
          {plans.map((plan, index) => (
            (activeCategoryIndex == plans.length-1 && index === plans.length-1) ? "" :
            <Plan key={index} featured={plan.featured}>
              {!plan.featured && <div className="planHighlight" css={highlightGradientsCss[index % highlightGradientsCss.length]} />}
              <PlanHeader>
                <span className={`name ${plan.disabled &&'disabled'}`}>{plan.name[activeCategoryIndex]}</span>
                {
                plan.price[activeCategoryIndex] && 
                <span className="price">{
                  (index !== 0)
                  ? plan.price[activeCategoryIndex] 
                  : plan.price[activeCategoryIndex][activeDurationIndex]
                }</span>
                }
                {plan.duration[activeCategoryIndex] &&
                  ((index !== 0) ? <span className="duration">{plan.duration[activeCategoryIndex]}</span>
                  : <DurationSelector>
                    {langData.PricesSection.durations.map((duration, durationIndex) => (
                      <span 
                        style={{display:'flex',flexDirection:'row', gap: '0.5rem', alignItems: 'center', width:'100%'}}
                        onClick={() => setActiveDurationIndex(durationIndex)}
                        key={durationIndex}
                      >
                        <SelectButton 
                          active={activeDurationIndex === durationIndex} 
                          key={durationIndex}
                          >
                        </SelectButton>
                        <span style={{textAlign:'start', width:'100%'}}>{duration.selectorText}</span>
                      </span>

                    ))}
                  </DurationSelector>)
                }
              </PlanHeader>
              <PlanFeatures>
                <span className="feature mainFeature">{plan.mainFeature}</span>
                {plan.features[activeCategoryIndex].map((feature, index) => (
                  <span key={index} className="feature">
                    {feature}
                  </span>
                ))}
              </PlanFeatures>
              <PlanAction>
                {
                  !plan.disabled
                  ? <BuyNowButton
                    onClick={() => {
                      register();
                    }}
                    css={!plan.featured && highlightGradientsCss[index]}
                    disabled={plan.disabled}
                  >{langData.PricesSection.button}
                  </BuyNowButton>
                  : <BuyNowButton__disabled
                    css={!plan.featured && highlightGradientsCss__disabled}
                    disabled={plan.disabled}
                  >{langData.PricesSection.disabled}
                  </BuyNowButton__disabled>
                }
              </PlanAction>
            </Plan>
          ))}
          <DecoratorBlob/>
        </PlansContainer>
      </ContentWithPaddingXl>
    </Container>
  );
};
