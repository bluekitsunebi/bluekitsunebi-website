import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import cardSlice from "./cardSlice";
import formSlice from "./formSlice";
import routerSlice from "./routerSlice";
import websiteLanguageSlice from "./websiteLanguageSlice";

import homeReducer from "./homeSectionSlice";
import headerReducer from "./headerSlice";
// import footerReducer from "./footerSlice";

// SECTIONS
import heroSectionReducer from "./heroSectionSlice";
import aboutSectionReducer from "./aboutSectionSlice";
// import whySectionReducer from "./whySectionSlice";
import profesorSectionReducer from "./profesorSectionSlice";
import coursesSectionReducer from "./coursesSectionSlice";
import FAQsectionReducer from "./FAQsectionSlice";
import contactSectionReducer from "./contactSectionSlice";
import infoSectionReducer from "./infoSectionSlice";

// APP
import appReducer from './app/appSlice';
import authReducer from './app/authSlice';
import databaseReducer from './app/databaseSlice';
import studySettingsReducer from './app/studySettingsSlice';
import studyPageReducer from './app/studyPageSlice';
import quizPageReducer from './app/quizPageSlice';

export const store = configureStore({
  reducer: {
    card: cardSlice,
    form: formSlice,
    router: routerSlice,
    websiteLanguage: websiteLanguageSlice,

    home: homeReducer,
    header: headerReducer,
    // footer: footerReducer,

    // SECTIONS
    heroSection: heroSectionReducer,
    aboutSection: aboutSectionReducer,
    // whySection: whySectionReducer,
    profesorSection: profesorSectionReducer,
    coursesSection: coursesSectionReducer,
    FAQsection: FAQsectionReducer,
    contactSection: contactSectionReducer,
    infoSection: infoSectionReducer,

    // APP
    app: appReducer,
    auth: authReducer,
    database: databaseReducer,
    studySettings: studySettingsReducer,
    studyPage: studyPageReducer,
    quizPage: quizPageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});
