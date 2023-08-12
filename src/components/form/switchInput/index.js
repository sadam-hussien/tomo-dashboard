import React from "react";

import { ErrorMessage, Field } from "formik";

import { Form } from "react-bootstrap";

export default function SwitchInput({
  containerStyle,
  style,
  id,
  name,
  label,
  labelInner,
}) {
  return (
    <>
      <Form.Group className="form-group input-switch" style={containerStyle}>
        {label && (
          <Form.Label className="switch-label d-block text-capitalize">
            {label}
          </Form.Label>
        )}
        <Field type="checkbox" className="d-none" id={id} name={name} />
        <label
          htmlFor={id}
          className="input-switch-labelinner d-flex align-items-center gap-3 position-relative"
          style={style}
        >
          <span>{labelInner}</span>
          <div className="position-relative input-switch-labelinner-box">
            <div className="inner d-flex align-items-center justify-content-center">
              <i className="las la-times icon icon-times"></i>
              <i className="las la-check icon icon-check"></i>
            </div>
          </div>
        </label>
      </Form.Group>
      <ErrorMessage name={name} component="div" className="input-error-msg" />
    </>
  );
}
