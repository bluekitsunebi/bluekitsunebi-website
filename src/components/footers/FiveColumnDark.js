import React, { useEffect, useRef } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { IoLogoFacebook as FacebookIcon } from "react-icons/io5";
import { IoMail as GmailIcon } from "react-icons/io5";
import { IoLogoWhatsapp as WhatsAppIcon } from "react-icons/io";
import { useSelector, 
  // useDispatch 
} from "react-redux";
// import {
//   setHeight,
//   setYaxisPosition,
// } from "store/footerSlice";

const Container = tw.div`relative bg-gray-900 text-gray-100 mx-0 mb-0 px-8`;
const Content = tw.div`max-w-screen-xl mx-auto pt-8 pb-8
sm:pt-8 
md:pt-0
xl:pt-8
`
const FiveColumns = tw.div`flex flex-wrap justify-between`;

const Column = tw.div`
w-full mb-8 text-base
sm:w-1/2
md:w-1/3 md:mb-0
xl:mb-0 xl:w-1/5
`;

const FirstColumn = tw.div`
w-full mb-8 text-base
sm:w-1/2
md:w-full md:flex md:justify-center md:mb-4
xl:mb-0 xl:w-1/5
`;

const LinkList = tw.ul`mt-4 text-sm font-medium`;
const LinkListItem = tw.li`mt-3 flex flex-wrap gap-2 sm:justify-start justify-center`;
const FirstLinkListItem = tw.li`mt-3 flex flex-wrap gap-2 sm:justify-start justify-center xl:mt-0`;
const UnderlinedText = tw.div`border-b-2 border-transparent hocus:text-gray-300 hocus:border-gray-100 pb-1 transition duration-300 flex gap-2 text-center sm:text-left cursor-pointer`;
const Text = tw.span`pb-1 flex flex-wrap gap-2 cursor-default inline-block justify-center text-center sm:text-left sm:justify-normal`;

const SocialIcon = tw.span`text-xl inline-block`;
const Facebook = tw.a`hover:text-blue-600 transition duration-300 flex flex-wrap gap-2 justify-center cursor-pointer`;

const CopyrightAndCompanyInfoRow = tw.div`pb-0 text-sm font-normal flex flex-col items-center 
sm:flex-row sm:justify-between`;
const CopyrightNotice = tw.div`w-fit text-center sm:text-left`;
const CompanyInfo = tw.div`w-fit text-center sm:text-left`;

const Divider = tw.div`mb-8 border-b-2 border-gray-800
md:mt-8`;
const Breakable = tw.span`break-all text-center sm:text-left`;

export default function Footer(onRender) {
  // SET SECTION Y AXIS POSITION

const homeWasRendered = useSelector((state) => state.home.wasRendered);
const footerRef = useRef(null);
// const dispatch = useDispatch();
// let paddingBottom = 0;
// let paddingTop = 0;

useEffect(() => {
  // if (homeWasRendered === "true") {
  //   const computedStyle = getComputedStyle(footerRef.current);
  //   paddingTop = parseFloat(computedStyle.paddingTop);
  //   paddingBottom = parseFloat(computedStyle.paddingBottom);
  //   const totalHeight =
  //   footerRef.current.offsetHeight + paddingTop + paddingBottom;
  //   dispatch(setHeight(totalHeight));
  //   const rect = footerRef.current.getBoundingClientRect();
  //   const yOffset = window.pageYOffset || document.documentElement.scrollTop;
  //   const yPosition = rect.top + yOffset;
  //   dispatch(setYaxisPosition(yPosition));
  // }
  if (typeof onRender === "function") {
    onRender();
  }
}, [onRender, homeWasRendered]);

// ---------------------------------------------------------

  const headerHeight = useSelector((state) => state.header.height);
  const aboutSectionPosition = useSelector(
    (state) => state.aboutSection.yAxisPosition
  );
  const FAQsectionPosition = useSelector(
    (state) => state.FAQsection.yAxisPosition
  );

  const handleClick = (section) => {
    console.log('click')
    const sectionPosition = section - headerHeight + 1;
    window.scroll({
      top: sectionPosition,
      left: 0,
      behavior: 'instant',
    });
  };

  return (
    <Container ref={footerRef}>
      <Content>
        <FiveColumns>    

          <FirstColumn>
            <LinkList>
              <FirstLinkListItem>
                  <Text><SocialIcon><WhatsAppIcon/></SocialIcon>WhatsApp</Text>
              </FirstLinkListItem>
              <LinkListItem>
                <Text>+40 745 984 726</Text>
              </LinkListItem>
            </LinkList>
          </FirstColumn>

          <Column>
            <LinkList>
              <LinkListItem>
                <Text>
                  <SocialIcon><GmailIcon/></SocialIcon> 
                  <Breakable>bluekitsunebi@gmail.com</Breakable>
                </Text>
              </LinkListItem>
              <LinkListItem>
                <Facebook href="https://www.facebook.com/vicentiu.chesca" target="_blank">
                  <SocialIcon>
                    <FacebookIcon />
                  </SocialIcon>
                  Facebook
                </Facebook>                 
              </LinkListItem>
            </LinkList>
          </Column>

          <Column>
            <LinkList>
              <LinkListItem>
                <UnderlinedText onClick={() => handleClick(aboutSectionPosition)}>Cursuri de japoneză</UnderlinedText>
              </LinkListItem>
              <LinkListItem>
                <UnderlinedText onClick={() => handleClick(FAQsectionPosition)}>Întrebări frecvente</UnderlinedText>
              </LinkListItem>
            </LinkList>
          </Column>
          
          <Column>
            <LinkList>
              <LinkListItem>
                <Text>Termenii și condițiile</Text>
              </LinkListItem>
              <LinkListItem>
                <Text>Politica de confidențialitate</Text>
              </LinkListItem>
            </LinkList>
          </Column>

        </FiveColumns>
        <Divider/>
        <CopyrightAndCompanyInfoRow>
          <CopyrightNotice>&copy; Copyright 2024, Kitsunebi Miyabi SRL</CopyrightNotice>
          <CompanyInfo>Cursuri Online de limba japoneză.</CompanyInfo>
        </CopyrightAndCompanyInfoRow>
      </Content>
    </Container>
  );
};
