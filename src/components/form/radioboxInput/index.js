import { useTranslation } from "react-i18next";

import { ErrorMessage, Field, useFormikContext } from "formik";

import { Form } from "react-bootstrap";

export default function RadioBoxInput({
  containerStyle,
  id,
  name,
  label,
  style,
  basic,
  value,
  onChange,
  options,
  checked
}) {
  const { t } = useTranslation("validation");

  const { setFieldValue } = useFormikContext();
  return (
    <Form.Group className="form-group input-radiobox" style={containerStyle}>
      {label && (
        <div>
          <Form.Label className="text-capitalize input-radiobox-label">
            {label}
          </Form.Label>
        </div>
      )}
      <div className="d-flex align-items-center flex-wrap gap-5">
        {options.map((opt) => (
          <div key={opt}>
            {basic ? (
              <input
                value={opt}
                checked = {checked === opt}
                type="radio"
                name={name}
                id={id + opt}
                className="d-none"
                onChange={(e) => {
                  setFieldValue(name, e.target.value);
                  if (onChange) {
                    onChange(name,e.target.value);
                  }
                }}
              />
            ) : (
              <Field
                type="radio"
                name={name}
                id={id + opt}
                className="d-none"
                value={opt}
              />
            )}
            <Form.Label
              htmlFor={id + opt}
              className="radiobox-label text-capitalize d-flex align-items-center gap-2 m-0"
              style={style}
            >
              <div className="position-relative radiobox-circle"></div>
              <div className="radiobox-label-label text-capitalize">{opt}</div>
            </Form.Label>
          </div>
        ))}
      </div>
      <ErrorMessage name={name}>
        {(msg) => <div className="input-error-msg">{t(msg)}</div>}
      </ErrorMessage>
    </Form.Group>
  );
}
