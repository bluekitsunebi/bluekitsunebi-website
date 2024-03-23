import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line

import Header, { NavLink, NavLinks, PrimaryLink, LogoLink, NavToggle, DesktopNavLinks } from "../headers/light.js";
import ResponsiveVideoEmbed from "../../helpers/ResponsiveVideoEmbed.js";

// background
import background from "images/original/background.webp";

// icons
import { RiTranslate2 } from "react-icons/ri";


const StyledHeader = styled(Header)`
  ${tw`pt-8 max-w-none`}
  ${DesktopNavLinks} ${NavLink}, ${LogoLink} {
    ${tw`text-gray-100 hover:border-gray-300 hover:text-gray-300`}
  }
  ${NavToggle}.closed {
    ${tw`text-gray-100 hover:text-primary-500`}
  }
`;
const Container = styled.div`
  ${tw`relative -mx-8 -mt-8 bg-center bg-cover`}
  background-image: url(${background});
`;

const OpacityOverlay = tw.div`z-10 absolute inset-0 bg-black opacity-50`;

const HeroContainer = tw.div`z-20 relative px-4 sm:px-8 max-w-screen-xl mx-auto`;
const TwoColumn = tw.div`pt-24 pb-32 px-4 flex justify-between items-center flex-col lg:flex-row`;
const LeftColumn = tw.div`flex flex-col items-center lg:block`;
const RightColumn = tw.div`flex flex-col w-full sm:w-5/6 lg:w-1/2 mt-16 lg:mt-0 lg:pl-8`;

const Heading = styled.h1`
  ${tw`text-3xl text-center lg:text-left sm:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-100 leading-none`}
  span {
    ${tw`inline-block mt-2`}
  }
`;

const SlantedBackground = styled.span`
  ${tw`relative text-primary-500 px-4 -mx-4 py-2`}
  &::before {
    content: "";
    ${tw`absolute inset-0 bg-gray-100 transform -skew-x-12 -z-10`}
  }
`;

const Notification = tw.span`inline-block my-4 pl-3 py-1 text-gray-100 border-l-4 border-primary-500 font-medium text-sm`;

const PrimaryAction = tw.button`px-8 py-3 mt-10 text-sm sm:text-base sm:mt-16 sm:px-8 sm:py-4 bg-gray-200 text-primary-500 font-bold rounded shadow transition duration-300 hocus:bg-primary-500 hocus:text-gray-100 focus:shadow-outline`;

export default () => {
  const navLinks = [
    <NavLinks key={1}>
      <NavLink href="#">
        Acasa
      </NavLink>
      <NavLink href="#">
        Despre
      </NavLink>
      <NavLink href="#">
        <div>Cursuri japoneză</div>
      </NavLink>
      <NavLink href="#">
        <div>Dezvoltare software</div>
      </NavLink>
      <NavLink href="#">
        FAQ
      </NavLink>
      <NavLink href="#" icon={<RiTranslate2 />}>
        RO
      </NavLink>
    </NavLinks>,
    <NavLinks key={2}>
      <PrimaryLink href="/#">
        Contact
      </PrimaryLink>
    </NavLinks>
  ];

  return (
    <Container>
      <OpacityOverlay />
      <HeroContainer>
        <StyledHeader links={navLinks} />
        <TwoColumn>
          <LeftColumn>
            {/* <Notification>We have now launched operations in Europe.</Notification> */}
            <Heading>
              <span>Cursuri online</span>
              <br />
              <SlantedBackground>de japoneză.</SlantedBackground>
            </Heading>
            <PrimaryAction>Află mai multe</PrimaryAction>
          </LeftColumn>
          <RightColumn>
            <Notification>disponibile pentru toate nivelurile</Notification>
            <Notification>ședințe individuale sau de grup</Notification>
            <Notification>personalizate pe nivelul și ritmul de studiu al cursanților</Notification>
            <Notification>răspuns la orice întrabare chiar și în afara orelor de curs, în decurs de 24 de ore</Notification>
            <Notification>materiale de studiu personalizate</Notification>
          </RightColumn>
        </TwoColumn>
      </HeroContainer>
    </Container>
  );
};
