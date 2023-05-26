import React from "react";

import { useTranslation } from "react-i18next";

import DateInput from "./dateInput";

import DynamicFileUploaderInput from "./dynamicFileUploaderInput";

import InputWithIcon from "./inputWithIcon";

import SelectBox from "./selectBox";

import Textarea from "./textarea";

import CheckBoxInput from "./checkboxInput";

import SwitchInput from "./switchInput";

import RadioBoxInput from "./radioboxInput";

export default function InputsHandler({ item, translation = "common" }) {
  const { t } = useTranslation(translation);

  if (item.type === "file") {
    return (
      <DynamicFileUploaderInput item={item}>
        {item.children}
      </DynamicFileUploaderInput>
    );
  }

  if (item.type === "select") {
    return (
      <SelectBox
        item={item}
        placeholder={t(item.placeholder)}
        label={t(item.label)}
      />
    );
  }

  if (item.type === "textarea") {
    return (
      <Textarea
        {...item}
        placeholder={t(item.placeholder)}
        label={t(item.label)}
      />
    );
  }

  if (item.type === "date") {
    return (
      <DateInput
        {...item}
        placeholder={t(item.placeholder)}
        label={item.label && t(item.label)}
      />
    );
  }

  if (item.type === "checkbox") {
    return (
      <CheckBoxInput
        {...item}
        placeholder={t(item.placeholder)}
        label={item.label && t(item.label)}
      />
    );
  }

  if (item.type === "radiobox") {
    return <RadioBoxInput {...item} label={item.label && t(item.label)} />;
  }

  if (item.type === "switch") {
    return (
      <SwitchInput
        {...item}
        label={item.label && t(item.label)}
        labelInner={item.labelInner && t(item.labelInner)}
      />
    );
  }

  return (
    <InputWithIcon
      {...item}
      placeholder={t(item.placeholder)}
      label={item.label && t(item.label)}
    />
  );
}
