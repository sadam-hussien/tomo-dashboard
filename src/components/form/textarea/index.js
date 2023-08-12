import React from "react";

import { ErrorMessage, Field } from "formik";

import { Form } from "react-bootstrap";

import { useTranslation } from "react-i18next";

export default function Textarea({
  name,
  id,
  placeholder,
  style = {},
  containerStyle,
  label,
  labelStyle,
}) {
  const { t } = useTranslation("validation");

  return (
    <>
      <Form.Group className="textarea" style={containerStyle}>
        <Form.Label
          htmlFor={id}
          className="textarea-label text-capitalize"
          style={labelStyle}
        >
          {label}
        </Form.Label>
        <Field
          type="text"
          as="textarea"
          name={name}
          placeholder={placeholder}
          style={style}
          className={`form-control textarea-input`}
          id={id}
        />
      </Form.Group>

      <ErrorMessage name={name} component="div" className="input-error-msg">
        {(msg) => <div className="input-error-msg">{t(msg)}</div>}
      </ErrorMessage>
    </>
  );
}
