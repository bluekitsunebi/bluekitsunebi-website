import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { IoLogoFacebook as FacebookIcon } from "react-icons/io5";
import { IoMail as GmailIcon } from "react-icons/io5";
import { IoLogoWhatsapp as WhatsAppIcon } from "react-icons/io";

const Container = tw.div`relative bg-gray-900 text-gray-100 mx-0 mb-0 px-8`;
const Content = tw.div`max-w-screen-xl mx-auto pt-16 pb-8`
const FiveColumns = tw.div`flex flex-wrap justify-between`;

const Column = tw.div`w-1/2 md:w-1/5 mb-8 md:mb-0 text-sm sm:text-base text-center md:text-left`;


const LinkList = tw.ul`mt-4 text-sm font-medium`;
const LinkListItem = tw.li`mt-3 flex flex-row gap-2`;
const Link = tw.a`border-b-2 border-transparent hocus:text-gray-300 hocus:border-gray-100 pb-1 transition duration-300 flex gap-2 items-center`;
const Text = tw.span`pb-1 flex gap-2 items-center cursor-default items-center`;

const SocialIcon = tw.a`text-xl`;
const Facebook = tw.span`hover:text-blue-600 transition duration-300 `;

const CopyrightAndCompanyInfoRow = tw.div`pb-0 text-sm font-normal flex flex-col sm:flex-row justify-between items-center`
const CopyrightNotice = tw.div``
const CompanyInfo = tw.div``

const Divider = tw.div`my-8 border-b-2 border-gray-800`
export default () => {
  return (
    <Container>
      <Content>
        <FiveColumns>    

          <Column>
            <LinkList>
              <LinkListItem>
                <Text><SocialIcon><WhatsAppIcon/></SocialIcon>WhatsApp</Text>
              </LinkListItem>
              <LinkListItem>
                <Text>+40 745 984 726</Text>
              </LinkListItem>
            </LinkList>
          </Column>

          <Column>
            <LinkList>
              <LinkListItem>
                <Text><SocialIcon><GmailIcon/></SocialIcon>bluekitsunebi@gmail.com</Text>
              </LinkListItem>
              <LinkListItem>
                <SocialIcon href="https://www.facebook.com/vicentiu.chesca">
                  <Facebook><FacebookIcon /></Facebook>
                </SocialIcon>
                Facebook
              </LinkListItem>
            </LinkList>
          </Column>

          <Column>
            <LinkList>
              <LinkListItem>
                <Link href="#">Cursuri de japoneză</Link>
              </LinkListItem>
              <LinkListItem>
                <Link href="#">Întrebări frecvente</Link>
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
