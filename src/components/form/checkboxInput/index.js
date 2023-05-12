import React from "react";

import { useTranslation } from "react-i18next";

import { ErrorMessage, Field, useFormikContext } from "formik";

import { Form } from "react-bootstrap";

export default function CheckBoxInput({
  containerStyle,
  id,
  name,
  label,
  style,
  basic,
  value,
  onChange,
}) {
  const { t } = useTranslation("validation");

  const { setFieldValue } = useFormikContext();

  return (
    <Form.Group className="form-group input-checkbox" style={containerStyle}>
      {basic ? (
        <input
          value={value}
          type="checkbox"
          name={name}
          id={id}
          style={style}
          className="d-none"
          onChange={(e) => {
            setFieldValue(name, e.target.value);
            if (onChange) {
              onChange(e.target.value);
            }
          }}
        />
      ) : (
        <Field
          type="checkbox"
          name={name}
          id={id}
          style={style}
          className="d-none"
          value={value}
        />
      )}
      <Form.Label
        htmlFor={id}
        className="checkbox-label d-block text-capitalize d-flex align-items-center gap-2 m-0"
      >
        <div className="input-checkbox-custom d-flex align-items-center justify-content-center">
          <i className="las la-check icon"></i>
        </div>
        <div className="checkbox-label-label text-capitalize">{label}</div>
      </Form.Label>
      <ErrorMessage name={name}>
        {(msg) => <div className="input-error-msg">{t(msg)}</div>}
      </ErrorMessage>
    </Form.Group>
  );
}
