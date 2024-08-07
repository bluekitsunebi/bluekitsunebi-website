import React, { useEffect, useRef } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import EmailIllustrationSrc from "images/original/chibiMiyabi/contact-programming.png";
import { useSelector, useDispatch } from "react-redux";
import {
  setHeight,
  setYaxisPosition,
  setContactSectionId,
} from "store/contactSectionSlice";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-8.svg";
import emailjs from "@emailjs/browser";
import {
  setIsSend,
  setIsSending,
  setAccord,
  setAccordNeeded,
} from "../../store/formSlice";
import { FaCheckCircle } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
import { ImSpinner9 as SpinIcon } from "react-icons/im";
import { BsFillSendCheckFill as SendIcon } from "react-icons/bs";
import enData from "helpers/data/lang/en/japanese.json";
import jaData from "helpers/data/lang/ja/japanese.json";
import roData from "helpers/data/lang/ro/japanese.json";

const Container = tw.div`relative mx-8`;
const TwoColumn = tw.div`flex flex-col md:flex-row-reverse justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-4/12 flex-shrink-0 h-80 md:h-auto`;
const TextColumn = styled(Column)((props) => [
  tw`md:w-8/12 mt-16 md:mt-0`,
  props.textOnLeft
    ? tw`md:ml-12 lg:ml-16 md:order-first`
    : tw`md:ml-12 lg:ml-16 md:order-last`,
]);

const Image = styled.div((props) => [
  tw`rounded bg-contain bg-no-repeat bg-center h-full max-w-96`,
  `background-image: url("${props.imageSrc}");`,
]);
const TextContent = tw.div`lg:py-8 md:text-left flex flex-col md:items-end `;

const Heading = tw(
  SectionHeading
)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-right leading-tight text-gray-100`;

const Form = tw.form`mt-8 md:mt-5 text-sm flex flex-col max-w-sm mx-auto md:mx-0`;

const Variants = tw.div`w-full text-white text-lg mt-10 flex flex-col gap-10 mx-auto md:mx-0 max-w-96`;

const Phone = tw.div`flex gap-2 text-lg justify-center md:justify-start`;

const Divider = tw.div`w-full h-1 bg-gray-600 rounded`;

const Input = tw.input`mt-6 first:mt-0 border-b-2 py-3 px-2 focus:outline-none font-medium transition duration-300 hocus:border-lightBlue-500 text-lightBlue-500`;

const Textarea = styled(Input).attrs({ as: "textarea" })`
  ${tw`h-24`}
`;

const Checkbox = tw.p`text-base text-white mt-5 whitespace-normal select-none`;
const Icon = tw.span`text-lg mr-2 w-fit h-fit text-lightBlue-500 inline-block cursor-pointer select-none`;
const Link = tw.span`hover:text-lightBlue-500 transition duration-300 cursor-pointer underline`;
const PolicyText = tw.span``;

const AccordNeeded = tw.span`block text-red-500`;
const Show = tw.span``;
const Hide = tw.span`text-transparent select-none`;

const Highlight = tw.span`text-lightBlue-500`;

const SubmitButton = tw(
  PrimaryButtonBase
)` mt-8 bg-lightBlue-500 hover:bg-lightBlue-600 flex justify-center`;
const SendingText = tw.span`text-lg flex flex-row gap-2`;
const SendIconButton = tw.span`w-fit h-fit flex gap-2 `;
const Spin = tw.span`animate-spin text-lg w-fit h-fit inline-block`;

const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  transform: scale(-1, -1) translateX(60%);
  bottom: -15%;
  ${tw`pointer-events-none -z-20 absolute left-0 h-64 w-64 opacity-15 text-pink-500`}
`;

export default function ContactSection({
  onRender,
  formAction = "#",
  formMethod = "get",
  textOnLeft = true,
}) {
  // SET SECTION Y AXIS POSITION

  const homeWasRendered = useSelector((state) => state.home.wasRendered);
  const accord = useSelector((state) => state.form.accord);
  const accordNeeded = useSelector((state) => state.form.accordNeeded);
  const contactSectionRef = useRef(null);
  const dispatch = useDispatch();
  let paddingBottom = 0;
  let paddingTop = 0;

  // ---------------------------------------------------------
  // set contact section id

  const contactSectionId = "contact-section";
  useEffect(() => {
    if (homeWasRendered === "true") {
      // send section id to store
      dispatch(setContactSectionId(contactSectionId));
    }
    if (typeof onRender === "function") {
      // signals the end of rendering the section to the store
      onRender();
    }
  }, [onRender, homeWasRendered]);

  // ---------------------------------------------------------

  const handleAccord = () => {
    dispatch(setAccord(!accord));
    if (!accord) dispatch(setAccordNeeded(false));
  };

  const handleInputFocus = () => {
    if (isSend) {
      dispatch(setIsSend(false));
      dispatch(setIsSending(false));
    }
  };

  useEffect(() => {
    if (homeWasRendered === "true") {
      const computedStyle = getComputedStyle(contactSectionRef.current);
      paddingTop = parseFloat(computedStyle.paddingTop);
      paddingBottom = parseFloat(computedStyle.paddingBottom);
      const totalHeight =
        contactSectionRef.current.offsetHeight + paddingTop + paddingBottom;
      dispatch(setHeight(totalHeight));
      const rect = contactSectionRef.current.getBoundingClientRect();
      const yOffset = window.pageYOffset || document.documentElement.scrollTop;
      const yPosition = rect.top + yOffset;
      dispatch(setYaxisPosition(yPosition + 80));
    }
    if (typeof onRender === "function") {
      onRender();
    }
  }, [onRender, homeWasRendered]);

  // -------------------------------------------------------

  // The textOnLeft boolean prop can be used to display either the text on left or right side of the image.

  // -------------------------------------------------------
  const isSend = useSelector((state) => state.form.isSend);
  const isSending = useSelector((state) => state.form.isSending);

  const sendEmail = (e) => {
    e.preventDefault();
    if (!accord) {
      dispatch(setAccordNeeded(true));
      return;
    } else {
      dispatch(setAccordNeeded(false));
    }
    dispatch(setIsSending(true));

    let templateParams = {
      name: e.target.elements.name.value,
      email: e.target.elements.email.value,
      phone: e.target.elements.phone.value,
      message: e.target.elements.message.value,
      checkbox: accord
        ? langData.ContactSection.checkbox.agree
        : langData.ContactSection.checkbox.disagree,
    };
    const templateId = `contactForm`;

    emailjs
      .send(
        "BlueKitsunebiForm",
        templateId,
        templateParams,
        "2kpClbJCkav0Qd87S"
      )
      .then(
        (result) => {
          dispatch(setIsSend(true));
          dispatch(setIsSending(false));
          e.target.reset();
        },
        (error) => {}
      );
  };

  // get the website language
  let language = useSelector((state) => state.websiteLanguage.language);
  let langData =
    language === "en" ? enData : language === "ja" ? jaData : roData;

  return (
    <Container ref={contactSectionRef} id={contactSectionId}>
      <TwoColumn>
        <ImageColumn>
          <Image imageSrc={EmailIllustrationSrc} />
        </ImageColumn>
        <TextColumn textOnLeft={textOnLeft}>
          <TextContent>
            <Heading>
              <Highlight>{langData.ContactSection.title[0]}</Highlight>
              {langData.ContactSection.title[1]}
            </Heading>
            <Variants>
              <Phone>
              {langData.ContactSection.phone[0]}
                <Highlight>{langData.ContactSection.phone[1]}</Highlight>
              </Phone>
              <Divider></Divider>
              <span>{langData.ContactSection.formTitle}</span>
            </Variants>
            <Form onSubmit={sendEmail} action={formAction} method={formMethod}>
              <Input
                required
                onFocus={handleInputFocus}
                type="text"
                autoComplete="given-name"
                name="name"
                placeholder={langData.ContactSection.formFields[0]}
              />

              <Input
                required
                onFocus={handleInputFocus}
                type="email"
                autoComplete="email"
                name="email"
                placeholder={langData.ContactSection.formFields[1]}
              />

              <Input
                onFocus={handleInputFocus}
                type="text"
                autoComplete="phone"
                name="phone"
                placeholder={langData.ContactSection.formFields[2]}
                onKeyPress={(event) => {
                  if (!/[0-9+]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />

              <Textarea
                required
                onFocus={handleInputFocus}
                type="text"
                name="message"
                placeholder={langData.ContactSection.formFields[3]}
              />

              <Checkbox>
                <Icon onClick={() => handleAccord()}>
                  {!accord ? (
                    <FaRegCircle></FaRegCircle>
                  ) : (
                    <FaCheckCircle></FaCheckCircle>
                  )}
                </Icon>
                <PolicyText>
                {langData.ContactSection.checkbox.message[0]}<Link href="#">{langData.ContactSection.checkbox.message[1]}</Link>{" "}
                {langData.ContactSection.checkbox.message[2]}<Link href="#">{langData.ContactSection.checkbox.message[3]}</Link>
                </PolicyText>
                <AccordNeeded>
                  {accordNeeded ? (
                    <Show>({langData.ContactSection.requiredErrorMessage})</Show>
                  ) : (
                    <Hide>{langData.ContactSection.requiredErrorMessage}</Hide>
                  )}
                </AccordNeeded>
              </Checkbox>
              <SubmitButton type="submit">
                {isSend ? (
                  <SendIconButton>
                    <SendIcon />
                    {langData.ContactSection.button.sent}
                  </SendIconButton>
                ) : isSending ? (
                  <SendingText>
                    <Spin>
                      <SpinIcon />
                    </Spin>
                    {langData.ContactSection.button.sending}
                  </SendingText>
                ) : (
                  langData.ContactSection.button.send
                )}
              </SubmitButton>
            </Form>
          </TextContent>
        </TextColumn>
      </TwoColumn>
      <DecoratorBlob2 />
    </Container>
  );
}
