import React from "react";

import { ErrorMessage, useFormikContext } from "formik";

import { useTranslation } from "react-i18next";

import Select from "react-select";

import { Form } from "react-bootstrap";

export default function SelectBox({
  item,
  containerStyle,
  placeholder,
  label,
  onChange,
}) {
  const { setFieldValue, values } = useFormikContext();

  const currentValue = values[item.name];

  const {
    t,
    i18n: { language },
  } = useTranslation(["validation"]);

  return (
    <>
      {label && (
        <Form.Label
          htmlFor={item.id + "select"}
          className="input-with-icon-label text-capitalize"
        >
          {label}
        </Form.Label>
      )}
      <Form.Group
        className="d-flex align-items-center border position-relative form-group select-withicon-group"
        style={containerStyle}
      >
        <Form.Label htmlFor={item.id + "select"} className="m-0">
          <i className={item.icon}></i>
        </Form.Label>
        <Select
          className="select-box w-100"
          classNamePrefix="select"
          options={item.options}
          isRtl={language === "ar"}
          name={item.name + "select"}
          id={item.id + "select"}
          aria-labelledby={item.id + "select"}
          aria-label={item.id + "select"}
          onChange={(option) => {
            setFieldValue(item.name, option.value);
            if (onChange) {
              onChange(item.name, option.value);
            }
          }}
          placeholder={placeholder}
          defaultValue={
            currentValue &&
            item.options.find((item) => item.value === currentValue)
          }
          styles={{
            placeholder: (styles) => ({
              ...styles,
              textTransform: "capitalize",
            }),
          }}
          {...item.props}
        />
      </Form.Group>
      <ErrorMessage
        name={item.name}
        component="div"
        className="input-error-msg"
      >
        {(msg) => <div className="input-error-msg">{t(msg)}</div>}
      </ErrorMessage>
    </>
  );
}
