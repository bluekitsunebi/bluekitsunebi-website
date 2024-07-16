import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./HeroSection.module.css";
import bgHeroSectionSrc from "images/original/backgroundRight.webp";
import bgLeftSrc from "images/original/backgroundLeft.webp";
import kanjiDrawing from "videos/kanjiAnimation.mp4";
import Button from "./Button";
import {
  setHeroSection__entered,
  setBackgroundLeft__entered,
  setTitleLeft__entered,
  setDescriptionLeft__entered,
  setVideosLoaded,
  setHalfAnimation,
} from "store/heroSectionSlice";
import { BsGearFill as SettingsRoundedIcon } from "react-icons/bs";
import enData from "helpers/data/lang/en/japanese.json";
import jaData from "helpers/data/lang/ja/japanese.json";
import roData from "helpers/data/lang/ro/japanese.json";

import tw from "twin.macro";
import styled from "styled-components";

const Container = styled.div`
  ${tw`w-screen h-screen`};
`;

export default function HeroSection({ onRender }) {
  const dispatch = useDispatch();

  // references
  const heroSectionRef = useRef(null);
  const halfBackgroundLeftRef = useRef(null);
  const videoRef = useRef(null);
  const videoRef2 = useRef(null);
  const titleImageContainer__leftRef = useRef(null);
  const titleImageContainer__rightRef = useRef(null);
  const titleLeftRef = useRef(null);

  // state
  const [imageHeroSectionLoaded, setImageHeroSectionLoaded] = useState(false);
  const [imageLeftLoaded, setImageLeftLoaded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [video2Loaded, setVideo2Loaded] = useState(false);

  // selectors
  const videosLoaded = useSelector((state) => state.heroSection.videosLoaded);
  const isEntered__hero = useSelector(
    (state) => state.heroSection.heroSection__entered
  );
  const isEntered__backgroundLeft = useSelector(
    (state) => state.heroSection.backgroundLeft__entered
  );
  const isEntered__titleLeft = useSelector(
    (state) => state.heroSection.titleLeft__entered
  );
  const isEntered__descriptionLeft = useSelector(
    (state) => state.heroSection.descriptionLeft__entered
  );
  const halfAnimation = useSelector(
    (state) => state.heroSection.halfAnimation
  );
  const language = useSelector((state) => state.websiteLanguage.language);
  const langData =
    language === "en" ? enData : language === "ja" ? jaData : roData;
  const titleLeft = [...langData.HeroSection.title.left];
  const titleRight = [...langData.HeroSection.title.right];
  const descriptionLeft = [...langData.HeroSection.description.left];
  const descriptionRight = [...langData.HeroSection.description.right];

  // image loading effect
  useEffect(() => {
    const bgHeroSectionImage = new Image();
    const bgLeftImage = new Image();
    bgHeroSectionImage.src = bgHeroSectionSrc;
    bgLeftImage.src = bgLeftSrc;

    const handleImageHeroSectionLoad = () => setImageHeroSectionLoaded(true);
    const handleImageLeftLoad = () => setImageLeftLoaded(true);

    bgHeroSectionImage.addEventListener("load", handleImageHeroSectionLoad);
    bgLeftImage.addEventListener("load", handleImageLeftLoad);

    return () => {
      bgHeroSectionImage.removeEventListener("load", handleImageHeroSectionLoad);
      bgLeftImage.removeEventListener("load", handleImageLeftLoad);
    };
  }, []);

  useEffect(() => {
    if (imageHeroSectionLoaded && imageLeftLoaded) {
      heroSectionRef.current.setAttribute("data-bg-loaded", "true");
      heroSectionRef.current.style.setProperty(
        "--hero-bg",
        `url(${bgHeroSectionSrc})`
      );
      halfBackgroundLeftRef.current.setAttribute("data-bg-loaded", "true");
      halfBackgroundLeftRef.current.style.setProperty(
        "--half-left-bg",
        `url(${bgLeftSrc})`
      );
    }
  }, [imageHeroSectionLoaded, imageLeftLoaded]);

  // video loading effect
  useEffect(() => {
    const handleVideoLoad = () => setVideoLoaded(true);
    const handleVideo2Load = () => setVideo2Loaded(true);

    if (videoRef.current) {
      videoRef.current.addEventListener("canplay", handleVideoLoad);
    }
    if (videoRef2.current) {
      videoRef2.current.addEventListener("canplay", handleVideo2Load);
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("canplay", handleVideoLoad);
      }
      if (videoRef2.current) {
        videoRef2.current.removeEventListener("canplay", handleVideo2Load);
      }
    };
  }, [videoLoaded, video2Loaded]);

  useEffect(() => {
    if (videoLoaded && video2Loaded) {
      dispatch(setVideosLoaded(true));
      heroSectionRef.current.setAttribute("data-video-loaded", "true");
      heroSectionRef.current.setAttribute("data-video2-loaded", "true");
    }
  }, [videoLoaded, video2Loaded]);

  // dispatch actions on mouse events
  const handleMouseEnter__hero = () => dispatch(setHeroSection__entered(true));
  const handleMouseLeave__hero = () => dispatch(setHeroSection__entered(false));
  const handleMouseEnter__left = () => dispatch(setBackgroundLeft__entered(true));
  const handleMouseLeave__left = () => dispatch(setBackgroundLeft__entered(false));
  const handleMouseEnter__titleLeft = () => dispatch(setTitleLeft__entered(true));
  const handleMouseLeave__titleLeft = () => dispatch(setTitleLeft__entered(false));
  const handleMouseEnter__descriptionLeft = () => dispatch(setDescriptionLeft__entered(true));
  const handleMouseLeave__descriptionLeft = () => dispatch(setDescriptionLeft__entered(false));

  // animation state management
  useEffect(() => {
    if (
      isEntered__backgroundLeft ||
      isEntered__titleLeft ||
      isEntered__descriptionLeft
    ) {
      dispatch(setHalfAnimation("expand"));
    } else if (
      isEntered__hero &&
      !isEntered__backgroundLeft &&
      !isEntered__titleLeft &&
      !isEntered__descriptionLeft
    ) {
      dispatch(setHalfAnimation("contract"));
    } else {
      dispatch(setHalfAnimation("middle"));
    }
  }, [
    isEntered__hero,
    isEntered__backgroundLeft,
    isEntered__titleLeft,
    isEntered__descriptionLeft,
  ]);

  useEffect(() => {
    if (typeof onRender === "function") {
      onRender();
    }
  }, [onRender]);

  return (
    <section
      id="heroSection"
      ref={heroSectionRef}
      className={styles.heroSection}
      onMouseEnter={handleMouseEnter__hero}
      onMouseLeave={handleMouseLeave__hero}
    >
      <div
        id="halfBackgroundLeft"
        ref={halfBackgroundLeftRef}
        className={`
          ${styles.halfBackground} ${styles.halfBackgroundLeft}
          ${halfAnimation === "middle" && styles.middle}
          ${halfAnimation === "expand" && styles.expandLeft}
          ${halfAnimation === "contract" && styles.contractLeft}
        `}
        onMouseEnter={handleMouseEnter__left}
        onMouseLeave={handleMouseLeave__left}
      ></div>
      <div
        className={`
          ${styles.titleImageContainer}
          ${styles.titleImageContainer__left}
          ${
            (isEntered__hero && (
              isEntered__backgroundLeft ||
              isEntered__titleLeft ||
              isEntered__descriptionLeft))
            ? styles.pushTitleLeft
            : ((isEntered__hero &&
              (!isEntered__backgroundLeft &&
                !isEntered__titleLeft &&
                !isEntered__descriptionLeft))
              ? styles.pushTitleLeft
              : '')
          }
        `}
        ref={titleImageContainer__leftRef}
        onMouseEnter={handleMouseEnter__titleLeft}
        onMouseLeave={handleMouseLeave__titleLeft}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          ref={videoRef}
          className={styles.kanjiDrawing}
        >
          <source src={kanjiDrawing} type="video/mp4" />
          Video
        </video>
        <div id="titleLeft" ref={titleLeftRef} className={styles.title}>
          <div>{titleLeft[0]}</div>
          <div>{titleLeft[1]}</div>
          <div>{titleLeft[2]}</div>
        </div>
        <div className={`${styles.button} ${styles.button__top}`}>
          <Button
            name="find out more"
            text={langData.HeroSection.mainButton}
            type="empty"
            position="left"
            underlinedButton=""
            transform="capitalizeFirstLetter"
            section="aboutSection"
            behavior="smooth"
            link="/"
            resetAnimation={true}
          />
        </div>
      </div>
      <ul
        id="descriptionLeft"
        className={`
          ${styles.description} ${styles.description__left}
          ${
            isEntered__backgroundLeft ||
            isEntered__titleLeft ||
            isEntered__descriptionLeft
              ? styles.show
              : styles.hide
          }
        `}
        onMouseEnter={handleMouseEnter__descriptionLeft}
        onMouseLeave={handleMouseLeave__descriptionLeft}
      >
        <li>• {descriptionLeft[0]}</li>
        <li>• {descriptionLeft[1]}</li>
        <li>• {descriptionLeft[2]}</li>
        <li>• {descriptionLeft[3]}</li>
        <li>• {descriptionLeft[4]}</li>
      </ul>

      {/* Right Section */}
      <div
        className={`
          ${styles.titleImageContainer}
          ${styles.titleImageContainer__right}
          ${
            (isEntered__hero &&
            !isEntered__backgroundLeft &&
            !isEntered__titleLeft &&
            !isEntered__descriptionLeft)
            ? styles.pushTitleRight
            : ((isEntered__hero &&
              (isEntered__backgroundLeft ||
                isEntered__titleLeft ||
                isEntered__descriptionLeft))
              ? styles.pushTitleRight
              : styles.pullTitleRight)
          }
        `}
        ref={titleImageContainer__rightRef}
      >
        <div className={styles.container__bottom}>
          <div className={`${styles.coverContainer} ${styles.coverRight}`}>
            <SettingsRoundedIcon
              className={`${styles.iconRight} ${styles.gear1} ${styles.icon}`}
            />
            <SettingsRoundedIcon
              className={`${styles.iconRight} ${styles.gear2} ${styles.icon}`}
            />
            <SettingsRoundedIcon
              className={`${styles.iconRight} ${styles.gear3} ${styles.icon}`}
            />
          </div>
        </div>
        <div
          id="titleRight"
          className={`
            ${styles.title}
            ${styles.title__right}
          `}
        >
          <div>{titleRight[0]}</div>
          <div>{titleRight[1]}</div>
          <div>{titleRight[2]}</div>
        </div>
        <div className={`${styles.button} ${styles.button__bottom}`}>
          <Button
            name="find out more"
            text={langData.HeroSection.mainButton}
            type="empty"
            position="right"
            underlinedButton=""
            transform="capitalizeFirstLetter"
            section="aboutSection"
            behavior="smooth"
            link="/programming"
            resetAnimation={true}
          />
        </div>
      </div>

      {/* Mobile Version */}
      <div className={styles.coverTop}>
        <div className={styles.coverTop__mobile}>
          <div>
            <div
              className={`
                ${styles.titleImageContainer__mobile}
                ${styles.titleImageContainer__left}
                ${
                  (isEntered__hero && (
                  isEntered__backgroundLeft ||
                  isEntered__titleLeft ||
                  isEntered__descriptionLeft))
                  ? styles.pushTitleLeft
                  : ((isEntered__hero &&
                    (!isEntered__backgroundLeft &&
                      !isEntered__titleLeft &&
                      !isEntered__descriptionLeft))
                    ? styles.pushTitleLeft
                    : '')
                }
              `}
              ref={titleImageContainer__leftRef}
              onMouseEnter={handleMouseEnter__titleLeft}
              onMouseLeave={handleMouseLeave__titleLeft}
            >
              <div className={`${styles.iconLeft} ${styles.icon}`}>
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  ref={videoRef2}
                  className={styles.kanjiDrawing}
                >
                  <source src={kanjiDrawing} type="video/mp4" />
                  Video
                </video>
              </div>
              <div id="titleLeft" ref={titleLeftRef} className={styles.title}>
                <div>{titleLeft[0]}</div>
                <div>{titleLeft[1]}</div>
                <div>{titleLeft[2]}</div>
              </div>
            </div>
          </div>
          <div
            className={`${styles.button__mobile} ${styles.button__mobile__top} ${styles.buttonMobile__top}`}
          >
            <Button
              name="find out more"
              text={langData.HeroSection.mainButton}
              type="empty"
              position="left"
              underlinedButton=""
              transform="capitalizeFirstLetter"
              section="aboutSection"
              behavior="smooth"
              link="/"
              resetAnimation={true}
            />
          </div>
        </div>
      </div>
      <div className={styles.coverBottom__mobile}>
        <div
          className={`
            ${styles.titleImageContainer__mobile}
            ${styles.titleImageContainer__right}
            ${
              (isEntered__hero &&
              !isEntered__backgroundLeft &&
              !isEntered__titleLeft &&
              !isEntered__descriptionLeft)
              ? styles.pushTitleRight
              : ((isEntered__hero &&
                (isEntered__backgroundLeft ||
                  isEntered__titleLeft ||
                  isEntered__descriptionLeft))
                ? styles.pullTitleRight
                : '')
            }
          `}
          ref={titleImageContainer__rightRef}
        >
          <div className={styles.container__bottom}>
            <div className={`${styles.coverContainer} ${styles.coverRight}`}>
              <SettingsRoundedIcon
                className={`${styles.iconRight} ${styles.gear1} ${styles.icon}`}
              />
              <SettingsRoundedIcon
                className={`${styles.iconRight} ${styles.gear2} ${styles.icon}`}
              />
              <SettingsRoundedIcon
                className={`${styles.iconRight} ${styles.gear3} ${styles.icon}`}
              />
            </div>
          </div>
          <div
            id="titleRight"
            className={`
              ${styles.title}
              ${styles.title__right}
            `}
          >
            <div>{titleRight[0]}</div>
            <div>{titleRight[1]}</div>
            <div>{titleRight[2]}</div>
          </div>
        </div>
        <div
          className={`${styles.button__mobile} ${styles.button__mobile__bottom} ${styles.buttonMobile__bottom}`}
        >
          <Button
            name="find out more"
            text={langData.HeroSection.mainButton}
            type="empty"
            position="right"
            underlinedButton=""
            transform="capitalizeFirstLetter"
            section="aboutSection"
            behavior="smooth"
            link="/programming"
            resetAnimation={true}
          />
        </div>
      </div>
      <ul
        id="descriptionRight"
        className={`
          ${styles.description}  ${styles.description__right}
          ${
            isEntered__hero &&
            (!isEntered__backgroundLeft &&
            !isEntered__titleLeft &&
            !isEntered__descriptionLeft)
              ? styles.show
              : styles.hide
          }
        `}
      >
        <li>• {descriptionRight[0]}</li>
        <li>• {descriptionRight[1]}</li>
        <li>• {descriptionRight[2]}</li>
        <li>• {descriptionRight[3]}</li>
        <li>• {descriptionRight[4]}</li>
      </ul>
    </section>
  );
}
