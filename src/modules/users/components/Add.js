import { usePost } from "hooks";

import { useTranslation } from "react-i18next";

import { apiAddUser } from "../server";

import * as Yup from "yup";

import { Form, Formik } from "formik";

import { Btn, InputsHandler } from "components";

import { Col, Row } from "react-bootstrap";
import { add_user_fields } from "../constants";

export default function Add({ handleClose }) {
  const { t } = useTranslation("common");

  const { mutate, isLoading } = usePost({
    queryFn: apiAddUser,
    onSuccess: () => handleClose(),
    queryKey: "get-users",
  });

  function handleSubmit(values) {
    mutate(values);
  }

  // schema
  const schema = Yup.object().shape({
    name: Yup.string().required("this_field_is_required"),
    email: Yup.string()
      .email("enter_valid_email")
      .required("this_field_is_required"),
    password: Yup.string().required("this_field_is_required"),
    confirm_password: Yup.string()
      .required("password_confirm")
      .oneOf([Yup.ref("password"), null], "password_match"),
  });

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        confirm_password: "",
        status: true,
        role: "supervisor",
      }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
          <Row>
            {add_user_fields.map((item) => (
              <Col key={item.id} xs={12} md={item.col}>
                <InputsHandler item={item} translation="common" />
              </Col>
            ))}
          </Row>

          <div className="d-flex flex-column gap-3">
            <Btn
              type="submit"
              title={t("save")}
              loading={isLoading}
              style={{
                height: "48px",
                fontSize: "var(--font-size-md)",
                fontWeight: 500,
              }}
            />
            <Btn
              type="button"
              title={t("close")}
              onClick={handleClose}
              classes="transparent"
              style={{
                height: "48px",
                fontSize: "var(--font-size-md)",
                fontWeight: 500,
              }}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}
