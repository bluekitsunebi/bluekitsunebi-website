import React, { useEffect, useRef } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import EmailIllustrationSrc from "images/original/chibiMiyabi/contact.png";
import { useSelector, useDispatch } from "react-redux";
import {
  setHeight,
  setYaxisPosition,
} from "store/contactSectionSlice";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-8.svg";
import emailjs from "@emailjs/browser";
import {
  setIsSend,
  setIsSending,
  setAccord,
} from "../../store/formSlice";
import { FaCheckCircle } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
import { ImSpinner9 as SpinIcon } from "react-icons/im";
import { BsFillSendCheckFill as SendIcon } from "react-icons/bs";

const Container = tw.div`relative mx-8`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-5/12 flex-shrink-0 h-80 md:h-auto`;
const TextColumn = styled(Column)(props => [
  tw`md:w-7/12 mt-16 md:mt-0`,
  props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`
]);

const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded bg-contain bg-no-repeat bg-center h-full`,
]);
const TextContent = tw.div`lg:py-8 text-center md:text-left`;

const Heading = tw(SectionHeading)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight text-primary-900`;

const Form = tw.form`mt-8 md:mt-10 text-sm flex flex-col max-w-sm mx-auto md:mx-0`
const Input = tw.input`mt-6 first:mt-0 border-b-2 py-3 px-2 focus:outline-none font-medium transition duration-300 hocus:border-primary-500 text-primary-500`
const Textarea = styled(Input).attrs({as: "textarea"})`
  ${tw`h-24`}
`
const Checkbox = tw.p`text-base text-gray-600 mt-5 whitespace-normal`;
const Icon = tw.span`text-lg mr-2 w-fit h-fit text-blue-500 inline-block`;
const Link = tw.span`hover:text-blue-500 transition duration-300 cursor-pointer`;


const Highlight = tw.span`text-primary-500`;

const SubmitButton = tw(PrimaryButtonBase)` mt-8 bg-primary-500`;

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
const contactSectionRef = useRef(null);
const dispatch = useDispatch();
let paddingBottom = 0;
let paddingTop = 0;

const handleAccord = () => {
  dispatch(setAccord(!accord));
}

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
    dispatch(setYaxisPosition(yPosition));
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
      return;
    }
    dispatch(setIsSending(true));

    let templateParams = {
      firstName: e.target.elements.firstname.value,
      lastName: e.target.elements.lastname.value,
      email: e.target.elements.email.value,
      message: e.target.elements.message.value,
      checkbox: accord ? 'Sunt de acord' : 'Nu sunt de acord',
    };
    const templateId = `contactForm_ro`;

    emailjs
      .send(
        "BlueKitsunebiForm",
        templateId,
        templateParams,
        "2kpClbJCkav0Qd87S"
      )
      .then(
        (result) => {
          console.log(result.text);
          dispatch(setIsSend(true));
          dispatch(setIsSending(false));
          e.target.reset();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <Container ref={contactSectionRef}>
      <TwoColumn>
        <ImageColumn>
          <Image imageSrc={EmailIllustrationSrc} />
        </ImageColumn>
        <TextColumn textOnLeft={textOnLeft}>
          <TextContent>
            <Heading>
               <Highlight>Contactează-ne </Highlight>
               și vom reveni cu un mail cât de curând.
              </Heading>
            <Form onSubmit={sendEmail} action={formAction} method={formMethod}>

              <Input required type="text" autoComplete="given-name" name="firstname" placeholder="Prenume" />

              <Input required type="text" autoComplete="family-name" name="lastname" placeholder="Nume de familie" />

              <Input required type="email" autoComplete="email" name="email" placeholder="Email" />

              <Textarea required name="message" placeholder="Mesaj" />

              <Checkbox onClick={() => handleAccord()}>
                <Icon>{!accord ? 
                <FaRegCircle></FaRegCircle> : 
                <FaCheckCircle></FaCheckCircle>
                }</Icon>
                Sunt de acord cu <Link href="#">Termenii și condițiile</Link> și <Link href="#">Politica de confidentialitate</Link>
              </Checkbox>
              <SubmitButton type="submit">{isSend ? `${<SendIcon/>} Trimis` : isSending ? `${<SpinIcon />} Se trimite` : 'Trimite' }</SubmitButton>
            </Form>
          </TextContent>
        </TextColumn>
      </TwoColumn>
      <DecoratorBlob2/>
    </Container>
  );
};
