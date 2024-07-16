import React, { useEffect, useRef } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import { IoLogoFacebook as FacebookIcon } from "react-icons/io5";
import { IoLogoInstagram as InstagramIcon} from "react-icons/io5";
import { IoLogoTiktok as TiktokIcon} from "react-icons/io5";
import { IoMail as GmailIcon } from "react-icons/io5";
import { IoLogoWhatsapp as WhatsAppIcon } from "react-icons/io";
import { useSelector } from "react-redux";
import sal from "images/original/anpc/sal.webp";
import sol from "images/original/anpc/sol.webp";

const Container = tw.div`relative bg-darkBlue-800 text-gray-500 mx-0 mb-0 px-8`;
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
const Utils = tw.div`flex flex-col w-fit gap-2 justify-end sm:flex-row sm:w-96`;

const Icon = tw.span`text-xl inline-block`;
const SocialIcon = tw.a`text-xl inline-block transition duration-300 cursor-pointer hover:text-beige-600`;

const CopyrightAndCompanyInfoRow = tw.div`pb-0 text-sm font-normal flex flex-col items-center gap-2
sm:flex-row-reverse sm:justify-between`;
const CopyrightNotice = tw.div`w-fit text-center sm:text-left`;
const CompanyInfo = tw.div`w-fit text-center sm:text-left`;

const Divider = tw.div`mb-8 border-b-2 border-gray-800
md:mt-8`;
const Breakable = tw.span`break-all text-center sm:text-left`;

export default function Footer(onRender) {

const homeWasRendered = useSelector((state) => state.home.wasRendered);
const footerRef = useRef(null);

useEffect(() => {
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
                  <Text><Icon><WhatsAppIcon/></Icon>WhatsApp</Text>
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
                  <Icon><GmailIcon/></Icon> 
                  <Breakable>bluekitsunebi@gmail.com</Breakable>
                </Text>
              </LinkListItem>
              <LinkListItem>
                <SocialIcon href="https://www.instagram.com/bluekitsunebi?utm_source=qr&igsh=MWo0eGE1aG5menIzZw==" target="_blank">
                  <InstagramIcon />
                </SocialIcon>
                <SocialIcon href="https://www.facebook.com/profile.php?id=100093026116129" target="_blank">
                  <FacebookIcon />
                </SocialIcon>
                <SocialIcon href="https://www.tiktok.com/@bluekitsunebi?is_from_webapp=1&sender_device=pc" target="_blank">
                  <TiktokIcon />
                </SocialIcon>                    
              </LinkListItem>
            </LinkList>
          </Column>

          <Column>
            <LinkList>
              <LinkListItem>
                <UnderlinedText onClick={() => handleClick(aboutSectionPosition)}>Meditații Informatică</UnderlinedText>
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
        <CompanyInfo>
          <Utils>
            <a href='https://anpc.ro/ce-este-sal/' target="_blank">
              <img src={sal} alt='Soluționarea Alternativă a Litigiilor'></img>
            </a>
            <a href='https://ec.europa.eu/consumers/odr' target="_blank">
              <img src={sol} alt='Soluționarea On-Line a Litigiilor'></img>
            </a>
          </Utils>
          </CompanyInfo>
          <CopyrightNotice>
            &copy; Copyright 2024, Kitsunebi Miyabi SRL
          </CopyrightNotice>
        </CopyrightAndCompanyInfoRow>
      </Content>
    </Container>
  );
};
