import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Button.module.css";
import { setSection, switchWasClicked } from "store/routerSlice";
import {
  setHeroSection__entered,
  setBackgroundLeft__entered,
  setTitleLeft__entered,
  setDescriptionLeft__entered,
  setHalfAnimation,
} from "store/heroSectionSlice";
import { closeMenu } from "store/headerSlice";
import enData from "helpers/data/lang/en.json";
import jaData from "helpers/data/lang/ja.json";
import roData from "helpers/data/lang/ro.json";

function Button(props) {
  const location = useLocation().pathname;
  const dispatch = useDispatch();

  const headerHeight = useSelector((state) => state.header.height);

  const name = props.name;
  const text = props.text;
  const type = props.type;
  const position = props.position;
  const underlinedButton = props.underlinedButton;
  const transform = props.transform;
  const section = props.section;
  const link = props.link;
  const category = props.category;
  const behavior =
    props.behavior === "smooth"
      ? "smooth"
      : props.behavior === "instant"
      ? "instant"
      : "instant";
  const resetAnimation = props.resetAnimation;

  // get the website language
  let language = useSelector((state) => state.websiteLanguage.language);
  let langData =
    language === "en" ? enData : language === "ja" ? jaData : roData;

  let sectionPosition = undefined;

  const aboutSectionPosition = useSelector(
    (state) => state.aboutSection.yAxisPosition
  );
  const profesorSectionPosition = useSelector(
    (state) => state.profesorSection.yAxisPosition
  );
  const coursesSectionPosition = useSelector(
    (state) => state.coursesSection.yAxisPosition
  );
  const FAQsectionPosition = useSelector(
    (state) => state.FAQsection.yAxisPosition
  );
  const contactSectionPosition = useSelector(
    (state) => state.contactSection.yAxisPosition
  );

  if (section === "aboutSection") {
    sectionPosition = aboutSectionPosition - headerHeight + 1;
  } else if (section === "profesorSection") {
    sectionPosition = profesorSectionPosition - headerHeight + 1;
  } else if (section === "coursesSection") {
    sectionPosition = coursesSectionPosition - headerHeight + 1;
  } else if (section === "FAQsection") {
    sectionPosition = FAQsectionPosition - headerHeight + 1;
  } else if (section === "contactSection") {
    sectionPosition = contactSectionPosition - headerHeight + 1;
  } else if (section === "heroSection") {
    sectionPosition = 0;
  }

  const handleClick = () => {
    if (resetAnimation) {
      dispatch(setHeroSection__entered(false));
      dispatch(setBackgroundLeft__entered(false));
      dispatch(setTitleLeft__entered(false));
      dispatch(setDescriptionLeft__entered(false));
      dispatch(setHalfAnimation("middle"));
    }
    window.scroll({
      top: sectionPosition,
      left: 0,
      behavior: link && link !== location ? "instant" : behavior,
    });
    dispatch(setSection(section));
    dispatch(switchWasClicked());
    if (category === "header" && window.innerWidth <= 1540) {
      dispatch(closeMenu());
    }
  };

  return (
    <Link to={link ? link : "#"}>
      <button
        className={`
          ${styles.Button}
          ${type === "withoutBorder" && styles.button__withoutBorder}
          ${type === "empty" && styles.button__empty}
          ${type === "empty__colored" && styles.button__emptyColored}
          ${type === "full" && styles.button__full}
          ${type === "greyedOut" && styles.button__greyedOut}
          ${position === "left" && styles.left}
          ${position === "right" && styles.right}
          ${
            name === underlinedButton &&
            ((link && location === link) || !link) &&
            styles.underline
          }
          ${transform === "capitalize" && styles.capitalize}
          ${
            transform === "capitalizeFirstLetter" &&
            styles.capitalize__FirstLetter
          }
          ${transform === "uppercase" && styles.uppercase}
        `}
        disabled={type === "greyedOut"}
        onClick={handleClick}
      >
        {text}
      </button>
    </Link>
  );
}

export default Button;
