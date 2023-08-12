import React from "react";

import { ErrorMessage, Field } from "formik";

import DatePicker from "react-datepicker";

import { Form } from "react-bootstrap";

import { useTranslation } from "react-i18next";

import "react-datepicker/dist/react-datepicker.css";

export default function DateInput({
  label,
  placeholder,
  name,
  id,
  labelStyle,
  containerStyle,
  icon = "las la-calendar",
  noBorder,
  ...props
}) {
  const { t } = useTranslation("validation");
  return (
    <div className="date-input">
      {label && (
        <Form.Label
          htmlFor={id}
          className="date-input-label text-capitalize"
          style={labelStyle}
        >
          {label}
        </Form.Label>
      )}

      <Form.Group
        className="d-flex align-items-center border position-relative form-group input-withicon-group"
        style={containerStyle}
      >
        <Form.Label htmlFor={id} className="m-0 ">
          <i className={icon}></i>
        </Form.Label>
        <Field name={name}>
          {({ form, field }) => {
            const { setFieldValue } = form;
            const { value } = field;
            const selValue = value ? new Date(value) : new Date();
            return (
              <DatePicker
                {...field}
                {...props}
                selected={selValue}
                id={id}
                onChange={(date) => setFieldValue(name, date)}
                placeholderText={placeholder}
                className={`form-control input-withicon ${
                  noBorder ? "border-0" : ""
                }`}
              />
            );
          }}
        </Field>
      </Form.Group>
      <ErrorMessage name={name} component="div" className="input-error-msg">
        {(msg) => <div className="input-error-msg">{t(msg)}</div>}
      </ErrorMessage>
    </div>
  );
}
