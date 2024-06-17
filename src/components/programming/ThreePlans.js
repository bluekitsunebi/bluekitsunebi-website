import React, { useState, useEffect, useRef } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { SectionDescription } from "components/misc/Typography.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { ContentWithPaddingXl } from "components/misc/Layouts.js";
import { ReactComponent as SvgDecoratorBlob } from "images/svg-decorator-blob-6.svg";
import { useSelector, useDispatch } from "react-redux";
import {
  setHeight,
  setYaxisPosition,
} from "store/coursesSectionSlice";

const Container = tw.div`relative mx-8`;
const HeaderContainer = tw.div`mt-10 w-full flex flex-col items-center`;
const Heading = tw(SectionHeading)`w-full text-gray-200`;
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
  heading = "Cursuri de programare:",
  plans = null,
  primaryButtonText = "Înscrie-te",
  primaryButtonText__disabled = "În curând",
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
  // --------------------------------------------------------

  const defaultPlans = [
    {
      name: "Pregătire informatică",
      price: "85 RON",
      duration: "1 oră și 30 de minute",
      mainFeature: "Prima lecție gratis",
      features: [
        "Lecții de pregătire pentru examenul de bacalaureat la materia informatică", 
        "Învățarea limbajului C++ pentru nivelul clasei a 12-a", 
        "Profesor cu experiență de lucru în dezvoltarea software", 
        "Materiale personalizate pe nivelul grupului",
        "Asistență chiar și în afara orelor de curs, cu răspuns în decurs de 24 de ore",
        "(plata o dată la 6 lecții)"
      ],
    },
    
    {
      name: "Web development",
      price: "85 RON",
      duration: "1 oră și 30 de minute",
      mainFeature: "Prima lecție gratis",
      features: [
        "Cursuri pentru viitorii dezvoltatori web", 
        "Predate de un programator cu experiență", 
        "Vei învăța HTML, CSS, limbajul JavaScript și framework-urile React și Angular", 
        "Vei afla care sunt cele mai bune practici din industrie",
        "La finalul acestor cursuri, vei lansa propriul website și vei avea un portofoliu personal cu proiecte",
        "(plata o dată la 6 lecții)"
      ],
      featured: false,
    },
  ];

  if (!plans) plans = defaultPlans;

  const [activeLanguageIndex, setActiveLanguageIndex] = useState(0);
  const [activeDurationIndex, setActiveDurationIndex] = useState(1);

  const highlightGradientsCss = [
    css`
      background: rgb(19, 141, 222);
      background: linear-gradient(115deg, rgba(19, 141, 222, 1) 0%, rgba(137, 198, 239, 1) 100%);
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
    background: rgb(98, 52, 131);
    background: linear-gradient(115deg, rgba(98, 52, 131, 1) 0%, rgba(177, 154, 193, 1) 100%);
  `;

  return (
    <Container ref={coursesSectionRef}>
      <ContentWithPaddingXl>
        <HeaderContainer>
          <Heading>{heading}</Heading>
        </HeaderContainer>
        <PlansContainer>
          {plans.map((plan, index) => (
            
            
            <Plan key={index} featured={plan.featured}>
              {!plan.featured && <div className="planHighlight" css={highlightGradientsCss[index % highlightGradientsCss.length]} />}
              <PlanHeader>
                <span className={`name ${plan.disabled &&'disabled'}`}>{plan.name}</span>
                {
                plan.price && 
                <span className="price">{
                  (index !== 0)
                  ? plan.price 
                  : plan.price
                }</span>
                }
                {plan.duration &&
                  <span className="duration">{plan.duration}</span>
                }
              </PlanHeader>
              <PlanFeatures>
                <span className="feature mainFeature">{plan.mainFeature}</span>
                {plan.features.map((feature, index) => (
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
                  >{primaryButtonText}
                  </BuyNowButton>
                  : <BuyNowButton__disabled
                    css={!plan.featured && highlightGradientsCss__disabled}
                    disabled={plan.disabled}
                  >{primaryButtonText__disabled}
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
