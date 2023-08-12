import React from "react";

import { useTranslation } from "react-i18next";

import CustomDropdown from "../customDropdown";

export default function LangController() {
  const { i18n } = useTranslation("auth");
  const { language, changeLanguage, options } = i18n;

  return (
    <>
      <div className="lang-controller">
        <CustomDropdown
          toggleChildren={<Lang lang={language} icon />}
          toggleClasses="gap-2 d-flex align-items-center w-100"
          menuChildren={
            <>
              {options.whitelist
                .filter((item) => item !== language)
                .map((lang, index) => (
                  <button
                    className="bg-transparent border-0 w-100 lang-option"
                    key={index}
                    onClick={() => changeLanguage(lang)}
                  >
                    <Lang lang={lang} />
                  </button>
                ))}
            </>
          }
          menuStyle={{ minWidth: "150px", right: 0, left: "auto" }}
          menuClasses=""
        />
      </div>
    </>
  );
}

const Lang = ({ lang, icon }) => {
  return (
    <>
      <span className="flex-fill d-inline-flex align-items-center ">
        <span className="text-uppercase text">
          {lang === "en" ? "english" : "العربية"}
        </span>
        {icon && <i className="las la-angle-down icon"></i>}
      </span>
    </>
  );
};
