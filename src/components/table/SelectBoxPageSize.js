import React, { useState } from "react";

import { useTranslation } from "react-i18next";

import Select from "react-select";

const options = [
  { value: 8, label: 8 },
  { value: 12, label: 12 },
  { value: 16, label: 16 },
  { value: 20, label: 20 },
];

export default function SelectBoxPageSize({ setPageSize }) {
  const {
    t,
    i18n: { language },
  } = useTranslation("common");

  const [value, setValue] = useState(options[0]);

  const handleChange = (option) => {
    setValue(option);
    setPageSize(option.value);
  };

  return (
    <div className="d-flex align-items-center gap-2">
      <label className="mb-0  text-capitalize">{t("show")}:</label>
      <Select
        className="select-box"
        classNamePrefix="select"
        defaultValue={value}
        options={options}
        isRtl={language === "ar"}
        name="table-page-size"
        onChange={handleChange}
      />
      <span className="sublabel text-capitalize">{t("entries")}</span>
    </div>
  );
}
