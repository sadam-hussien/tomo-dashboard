import { Form, Formik } from "formik";

import { Col, Row } from "react-bootstrap";

import { useTranslation } from "react-i18next";

import * as Yup from "yup";

import { change_password_fields } from "../constants";

import { Btn, InputWithIcon, InputsHandler } from "components";

import { usePost } from "hooks";

import { apiUpdatePassword } from "../server";

export default function SecurityForm() {
  const { t } = useTranslation("common");

  const { mutate, isLoading } = usePost({
    queryFn: apiUpdatePassword,
  });

  const schema = Yup.object().shape({
    oldPassword: Yup.string().required("current_password_is_required"),
    password: Yup.string().required("new_password_is_required"),
    confirmPassword: Yup.string()
      .required("password_confirm")
      .oneOf([Yup.ref("password"), null], "password_match"),
  });

  function handleSubmit(values) {
    mutate(values);
  }
  return (
    <div className="">
      <h5 className="profile-title mb-5 ">{t("change_password")}</h5>
      <Formik
        validationSchema={schema}
        onSubmit={handleSubmit}
        initialValues={{
          oldPassword: "",
          password: "",
          confirmPassword: "",
        }}
      >
        {({ handleReset }) => (
          <Form>
            <Row className="gx-5">
              <Col md={6}>
                <div className="setting-input-container">
                  <InputWithIcon
                    label={t("type_your_current_password")}
                    type="password"
                    name="oldPassword"
                    id="current-password-inp"
                    noBorder
                    placeholder={t("type_your_current_password")}
                  />
                </div>
              </Col>
              <Col></Col>
              <Col md={6}>
                <div className="setting-input-container">
                  <InputWithIcon
                    label={t("type_your_new_password")}
                    type="password"
                    name="password"
                    id="new-password-inp"
                    noBorder
                    placeholder={t("type_your_new_password")}
                  />
                </div>
              </Col>
              <Col md={6}>
                <div className="setting-input-container">
                  <InputWithIcon
                    label={t("type_your_confirm_new_password")}
                    type="password"
                    name="confirmPassword"
                    id="confirm-new-password-inp"
                    noBorder
                    placeholder={t("type_your_confirm_new_password")}
                  />
                </div>
              </Col>
            </Row>

            <div className="mt-3 d-flex align-items-center justify-content-end gap-4 flex-wrap">
              <Btn
                title={t("save")}
                type="submit"
                style={{
                  height: "50px",
                  width: "133px",
                  fontSize: "var(--font-size-md)",
                }}
                loading={isLoading}
              />
              <Btn
                title={t("reset")}
                type="button"
                onClick={handleReset}
                classes="transparent"
                style={{
                  height: "50px",
                  width: "133px",
                  fontSize: "var(--font-size-md)",
                }}
                disabled={isLoading}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
