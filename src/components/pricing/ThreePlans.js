import React, {useState} from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { SectionDescription } from "components/misc/Typography.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { ReactComponent as SvgDecoratorBlob } from "images/svg-decorator-blob-6.svg";

const HeaderContainer = tw.div`mt-10 w-full flex flex-col items-center`;

const Heading = tw(SectionHeading)`w-full text-primary-900`;

const LanguageSwitcher = tw.div`flex flex-col gap-2 w-auto border-2 rounded-3xl px-1 py-1 mt-8 border-primary-900 sm:flex-row sm:rounded-full`;

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


export default ({
  heading = "Cursuri cu predare în limba:",
  plans = null,
  primaryButtonText = "Înscrie-te",
  primaryButtonText__disabled = "În curând",
  languages = [
    {switcherText: "Română"},
    {switcherText: "Engleză"},
    {switcherText: "Japoneză"},
  ],
  durations = [
    {selectorText: "1 oră"},
    {selectorText: "1 oră și 30 de minute"},
    {selectorText: "2 ore"},
  ]
}) => {
  const defaultPlans = [
    {
      name: ["Japoneză individual", "Japoneză individual", "Engleză individual"],
      price: [
        // ro
        ["90 RON", "130 RON", "170 RON",], 
        // eng
        ["$40", "$50", "$60",], 
        // ja
        ["$35", "$45", "$55",],
      ],
      duration: [
        // ro
        ["1 oră", "1 oră și 30 de minute", "2 ore"], 
        // eng
        ["1 oră", "1 oră și 30 de minute", "2 ore"], 
        // ja
        ["1 oră", "1 oră și 30 de minute", "2 ore"],
      ],
      mainFeature: "Prima lecție gratis",
      features: [
        ["Elevul alege o zi și o oră și începem imediat", 
        "Materiale personalizate pe nivelul elevului", 
        "Profesor cu nivel avansat de japoneză", 
        "Asistență chiar și în afara orelor de curs, cu răspuns în decurs de 24 de ore",
        "(plata o dată la 6 lecții)",],

        ["Elevul alege o zi și o oră și începem imediat", 
        "Materiale personalizate pe nivelul elevului", 
        "Profesor cu nivel avansat de japoneză", 
        "Asistență chiar și în afara orelor de curs, cu răspuns în decurs de 24 de ore",
        "(plata o dată la 6 lecții)",],

        ["Elevul alege o zi și o oră și începem imediat", 
        "Materiale personalizate pe nivelul elevului", 
        "Profesor cu nivel avansat de engleză",
        "Asistență chiar și în afara orelor de curs, cu răspuns în decurs de 24 de ore",
        "(plata o dată la 6 lecții)",],
      ],
    },
    
    {
      name: ["Japoneză grup", "Japoneză grup", "Engleză grup"],
      price: ["85 RON", "$35", "$30",],
      duration: ["1 oră", "1 oră", "1 oră",],
      mainFeature: "Prima lecție gratis",
      features: [
        ["Adu-ți prietenii și formează un grup sau așteaptă să-ți găsim noi", 
        "Materiale personalizate pe nivelul grupului", 
        "Profesor cu nivel avansat de japoneză", 
        "Asistență chiar și în afara orelor de curs, cu răspuns în decurs de 24 de ore",
        "(plata o dată la 6 lecții)",],

        ["Adu-ți prietenii și formează un grup sau așteaptă să-ți găsim noi", 
        "Materiale personalizate pe nivelul grupului", 
        "Profesor cu nivel avansat de japoneză", 
        "Asistență chiar și în afara orelor de curs, cu răspuns în decurs de 24 de ore",
        "(plata o dată la 6 lecții)",],

        ["Adu-ți prietenii și formează un grup sau așteaptă să-ți găsim noi", 
        "Materiale personalizate pe nivelul grupului", 
        "Profesor cu nivel avansat de engleză", 
        "Asistență chiar și în afara orelor de curs, cu răspuns în decurs de 24 de ore",
        "(plata o dată la 6 lecții)",]
      ],
      featured: true,
    },
    
    {
      name: ["Japoneză anime", "Japoneză anime", ""],
      price: ["", "", ""],
      duration: ["", "", ""],
      mainFeature: "Prima lecție gratis",
      features: [
        ["Curs special axat pe japoneză vorbită în anime", 
        "Pentru înscrierea la acest curs extra se cere participarea la oricare alt curs oferit de noi.",],
        ["Curs special axat pe japoneză vorbită în anime", 
        "Pentru înscrierea la acest curs extra se cere participarea la oricare alt curs oferit de noi.",],
        [],
      ],
      disabled: true,
    },
  ];

  if (!plans) plans = defaultPlans;

  const [activeLanguageIndex, setActiveLanguageIndex] = useState(0);
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

  return (
    <Container>
      <ContentWithPaddingXl>
        <HeaderContainer>
          <Heading>{heading}</Heading>
          <LanguageSwitcher>
            {languages.map((language, index) => (
              <SwitchButton active={activeLanguageIndex === index} key={index} onClick={() => setActiveLanguageIndex(index)}>{language.switcherText}</SwitchButton>
            ))}
          </LanguageSwitcher>
        </HeaderContainer>
        <PlansContainer>
          {plans.map((plan, index) => (
            (activeLanguageIndex == defaultPlans.length-1 && index == defaultPlans.length-1) ? "" :
            <Plan key={index} featured={plan.featured}>
              {!plan.featured && <div className="planHighlight" css={highlightGradientsCss[index % highlightGradientsCss.length]} />}
              <PlanHeader>
                <span className={`name ${plan.disabled &&'disabled'}`}>{plan.name[activeLanguageIndex]}</span>
                {
                plan.price[activeLanguageIndex] && 
                <span className="price">{
                  (index !== 0)
                  ? plan.price[activeLanguageIndex] 
                  : plan.price[activeLanguageIndex][activeDurationIndex]
                }</span>
                }
                {plan.duration[activeLanguageIndex] &&
                  ((index !== 0) ? <span className="duration">{plan.duration[activeLanguageIndex]}</span>
                  : <DurationSelector>
                    {durations.map((duration, durationIndex) => (
                      <span 
                        style={{display:'flex',flexDirection:'row', gap: '0.5rem', alignItems: 'center', width:'100%'}}
                        onClick={() => setActiveDurationIndex(durationIndex)}
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
                {plan.features[activeLanguageIndex].map((feature, index) => (
                  <span key={index} className="feature">
                    {feature}
                  </span>
                ))}
              </PlanFeatures>
              <PlanAction>
                {
                  !plan.disabled ? 
                  <BuyNowButton
                  css={!plan.featured && highlightGradientsCss[index]}
                  disabled={plan.disabled}
                  >{primaryButtonText}
                </BuyNowButton>
                : 
                <BuyNowButton__disabled
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
