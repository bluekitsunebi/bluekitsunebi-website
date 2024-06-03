import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setHeight,
  setUnderlined,
  setColor,
  setMenu,
  closeMenu,
  setSlideDown,
  setWasAnimated,
} from "store/headerSlice";
import styles from "./Header.module.css";
import Logo from "./Logo";
import Button from "../hero/Button";
import WebsiteLanguageSwitcher from "./WebsiteLanguageSwitcher";
import { CgMenu as MenuRoundedIcon } from "react-icons/cg";
import { CgClose as CloseRoundedIcon } from "react-icons/cg";

import enData from "helpers/data/lang/en.json";
import jaData from "helpers/data/lang/ja.json";
import roData from "helpers/data/lang/ro.json";

export default function Header({ onRender }) {
  const dispatch = useDispatch();
  const location = useLocation().pathname;

  // slide down animation
  let videosLoaded = useSelector((state) => state.heroSection.videosLoaded);
  let slideDown = useSelector((state) => state.header.slideDown);
  let wasAnimated = useSelector((state) => state.header.wasAnimated);
  let headerAnimation = true;

  useEffect(() => {
    if (!wasAnimated && videosLoaded) {
      dispatch(setWasAnimated(true));
      dispatch(setSlideDown(true));
    }
  }, [videosLoaded, wasAnimated, slideDown]);

  // ---------------------------------------------------------

  const homeWasRendered = useSelector((state) => state.home.wasRendered);
  const headerRef = useRef(null);
  let middle = 0;

  useEffect(() => {
    if (homeWasRendered === "true") {
      const style = window.getComputedStyle(headerRef.current);
      const height = parseInt(style.height);
      const totalHeight = height;
      dispatch(setHeight(totalHeight));
      middle = (window.innerHeight - totalHeight) / 2 + totalHeight;
    }
    if (typeof onRender === "function") {
      onRender();
    }
  }, [onRender, homeWasRendered]);

  const headerHeight = useSelector((state) => state.header.height);
  const color = useSelector((state) => state.header.color);
  let isOpen = useSelector((state) => state.header.isOpen);
  let headerColor = !isOpen ? color : "var(--navyShadow50)";

  let underlineButton = useSelector((state) => state.header.underlined);

  const aboutSectionPosition = useSelector(
    (state) => state.aboutSection.yAxisPosition
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

  const listenScrollEvent = () => {
    window.scrollY > 0
      ? dispatch(setColor("var(--navyShadow50)"))
      : dispatch(setColor("transparent"));

    if (
      window.scrollY + middle >= 0 &&
      window.scrollY + middle <
        aboutSectionPosition -
          headerHeight -
          (window.innerHeight - headerHeight) / 2
    ) {
      dispatch(setUnderlined("hero"));
    } else if (
      window.scrollY + middle >= aboutSectionPosition - headerHeight &&
      window.scrollY + middle <
        coursesSectionPosition -
          headerHeight -
          (window.innerHeight - headerHeight) / 2
    ) {
      dispatch(setUnderlined("about"));
    } else if (
      window.scrollY + middle >= coursesSectionPosition - headerHeight &&
      window.scrollY + middle <
        FAQsectionPosition -
          headerHeight -
          (window.innerHeight - headerHeight) / 2
    ) {
      dispatch(setUnderlined("courses"));
    } else if (
      window.scrollY + middle >= FAQsectionPosition - headerHeight &&
      window.scrollY + middle <
        contactSectionPosition -
          headerHeight -
          (window.innerHeight - headerHeight) / 2
    ) {
      dispatch(setUnderlined("faq"));
    } else if (
      window.scrollY + middle >=
      contactSectionPosition - headerHeight
    ) {
      dispatch(setUnderlined("contact"));
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
  });

  const handleLogoClick = () => {
    window.scrollTo(0, 0);
  };

  // STOP SCROLL WHEN MENU IS OPEN
  const yRef = useRef();

  useEffect(() => {
    if (isOpen) {
      // document.body.style.height = "100vh";
      document.body.style.overflow = "hidden";
    } else {
      // document.body.style.height = "auto";
      document.body.style.overflow = "visible";
    }
  }, [isOpen]);

  const handleMenu = () => {
    if (!isOpen) {
      yRef.current = window.scrollY;
    }
    dispatch(setMenu());
  };

  useEffect(() => {
    if (window.innerWidth > 1540 && isOpen === true) {
      dispatch(closeMenu());
    }
  }, [window.innerWidth > 1540]);

  // get the website language
  let language = useSelector((state) => state.websiteLanguage.language);
  let langData =
    language === "en" ? enData : language === "ja" ? jaData : roData;

  return (
    <header
      id="header"
      ref={headerRef}
      className={`
        ${styles.Header}
        ${headerAnimation && styles.headerAnimation}
        ${
          location !== "/"
            ? styles.slideDown
            : !slideDown
            ? styles.slideUp
            : styles.slideDown
        } 
        ${!isOpen && styles.Header__close}
      `}
      style={{ background: headerColor }}
    >
      <div className={styles.header_phone_close}>
        {isOpen ? (
          <div
            className={`${styles.menu} ${styles.menuIconClose}`}
            onClick={handleMenu}
          >
            <CloseRoundedIcon />
          </div>
        ) : (
          <div
            className={`${styles.menu} ${styles.menuIconOpen}`}
            onClick={handleMenu}
          >
            <MenuRoundedIcon />
          </div>
        )}
        <Link to={"/"} className={styles.Logo}>
          <div onClick={handleLogoClick}>
            <Logo />
          </div>
        </Link>
        <div></div>
        {/* <div
          className={`${styles.WebsiteLanguageSwitcher_phone} ${
            !isOpen ? styles.show : styles.hide
          }`}
        >
          <WebsiteLanguageSwitcher />
        </div>
        <div className={isOpen ? styles.show : styles.hide}></div> */}
      </div>

      <div className={styles.header__phone}>
        {isOpen ? (
          <div
            className={`${styles.menu__phone} ${styles.menuIconClose}`}
            onClick={handleMenu}
          >
            <CloseRoundedIcon />
          </div>
        ) : (
          <div
            className={`${styles.menu__phone} ${styles.menuIconOpen}`}
            onClick={handleMenu}
          >
            <MenuRoundedIcon />
          </div>
        )}
        <Link to={"/"} className={styles.Logo__phone}>
          <div onClick={handleLogoClick}>
            <Logo />
          </div>
        </Link>
      </div>

      <nav className={`${styles.navbar} ${!isOpen && styles.navbar__close}`}>
        <Button
          name="hero"
          category="header"
          text={langData.Header.hero}
          type="withoutBorder"
          position=""
          underlinedButton={underlineButton}
          transform="capitalizeFirstLetter"
          section="heroSection"
        />

        <Button
          name="about"
          category="header"
          text={langData.Header.japanese}
          type="withoutBorder"
          position=""
          underlinedButton={underlineButton}
          transform="capitalizeFirstLetter"
          section="aboutSection"
          behavior="instant"
          link="/"
        />

        <Button
          name="about"
          category="header"
          text={langData.Header.programming}
          type="withoutBorder"
          position=""
          underlinedButton={underlineButton}
          transform="capitalizeFirstLetter"
          section="aboutSection"
          behavior="instant"
          link="/programming"
        ></Button>

        <Button
          name="courses"
          category="header"
          text={langData.Header.courses}
          type="withoutBorder"
          position=""
          underlinedButton={underlineButton}
          transform="capitalizeFirstLetter"
          section="coursesSection"
        ></Button>

        <Button
          name="faq"
          category="header"
          text={langData.Header.faq}
          type="withoutBorder"
          position=""
          underlinedButton={underlineButton}
          transform="uppercase"
          section="FAQsection"
        ></Button>

        <Button
          name="contact"
          category="header"
          text={langData.Header.contact}
          type="withoutBorder"
          position=""
          underlinedButton={underlineButton}
          transform="capitalizeFirstLetter"
          section="contactSection"
        ></Button>
        {/* <div className={isOpen ? styles.show : styles.hide}>
          <WebsiteLanguageSwitcher />
        </div> */}
      </nav>
      <div></div>
      {/* <div
        className={`${styles.WebsiteLanguageSwitcher_pc} ${
          !isOpen ? styles.show : styles.hide
        }`}
      >
        <WebsiteLanguageSwitcher />
      </div> */}
    </header>
  );
}
