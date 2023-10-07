import React, { forwardRef } from "react";

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
        <Form.Label htmlFor={id} className="m-0 form-label-icon">
          <i className={icon}></i>
        </Form.Label>
        <Field name={name}>
          {({ form, field }) => {
            const { setFieldValue } = form;
            const { value } = field;
            const selValue = value ? new Date(value) : new Date();
            return (
              <DatePicker
                shouldCloseOnSelect={false}
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

export function CustomDateInput({
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

  const InputField = forwardRef(({ value, onClick }, ref) => (
    <div className="custom-date-input">
      <button
        className="custom-date-input-field d-flex align-items-center justify-content-between"
        onClick={onClick}
        ref={ref}
        type="button"
      >
        <span>{value}</span>
        <span className="custom-date-input-icon">
          <i className={icon}></i>
        </span>
      </button>
    </div>
  ));

  return (
    <div className="position-relative">
      {label && (
        <Form.Label
          htmlFor={id}
          className="date-input-label text-capitalize"
          style={labelStyle}
        >
          {label}
        </Form.Label>
      )}
      <Field name={name}>
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;
          const selValue = value ? new Date(value) : new Date();
          return (
            <DatePicker
              customInput={<InputField />}
              shouldCloseOnSelect={false}
              {...field}
              selected={selValue}
              id={id}
              onChange={(date) => setFieldValue(name, date)}
              placeholderText={placeholder}
              className={`form-control input-withicon ${
                noBorder ? "border-0" : ""
              }`}
              {...props}
            />
          );
        }}
      </Field>

      <ErrorMessage name={name} component="div" className="input-error-msg">
        {(msg) => <div className="input-error-msg">{t(msg)}</div>}
      </ErrorMessage>
    </div>
  );
}
