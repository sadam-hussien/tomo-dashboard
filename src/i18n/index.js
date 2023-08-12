import i18next from "i18next";

import { initReactI18next } from "react-i18next";

import LanguageDetector from "i18next-browser-languagedetector";

import HttpApi from "i18next-http-backend";

// translations
import common_en from "./locales/en/common.json";
import common_ar from "./locales/ar/common.json";
import auth_en from "./locales/en/auth.json";
import auth_ar from "./locales/ar/auth.json";
import sidebar_en from "./locales/en/sidebar.json";
import sidebar_ar from "./locales/ar/sidebar.json";
import header_en from "./locales/en/header.json";
import header_ar from "./locales/ar/header.json";
import footer_en from "./locales/en/footer.json";
import footer_ar from "./locales/ar/footer.json";
import validation_en from "./locales/en/validation.json";
import validation_ar from "./locales/ar/validation.json";

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    interpolation: { escapeValue: false },
    supportedLngs: ["en", "ar"],
    whitelist: ["en", "ar"],
    fallbackLng: ["ar"],
    detection: {
      order: ["localStorage", "htmlTag"],
      caches: ["localStorage"],
      lookupQuerystring: "lng",
      lookupFromPathIndex: 0,
      lookupFromSubdomainIndex: 0,
      checkWhitelist: true,
    },
    resources: {
      en: {
        common: common_en,
        auth: auth_en,
        sidebar: sidebar_en,
        header: header_en,
        footer: footer_en,
        validation: validation_en,
      },
      ar: {
        common: common_ar,
        auth: auth_ar,
        sidebar: sidebar_ar,
        header: header_ar,
        footer: footer_ar,
        validation: validation_ar,
      },
    },
  });

export default i18next;
