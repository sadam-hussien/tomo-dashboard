import React, { useState } from "react";

import { useTranslation } from "react-i18next";

import { useNavigate } from "react-router-dom";

import { Form, Formik } from "formik";

import * as Yup from "yup";

import { FormHeader, FormSubmit } from "../components";

import { InputsHandler, Toast } from "components";

import { login_fields } from "../constants";

import { useDispatch } from "react-redux";

import { saveUserData } from "../store";

import { usePost } from "hooks";

import { apiLogin } from "../server";

export default function Login() {
  // translation
  const { t } = useTranslation("auth");

  // navigate
  const navigate = useNavigate();

  // state for loading state
  const [loading, setLoading] = useState(false);

  // dispatch for store -> redux toolkit
  const dispatch = useDispatch();

  // react-query mutation
  const { mutate } = usePost({ queryFn: (data) => apiLogin(data) });

  // submit function
  const handleSubmit = (values) => {
    setLoading(true);
    mutate(values, {
      onError: (error) => {
        Toast({
          title: error.data.errors[0],
          icon: "error",
        });
      },
      onSuccess: (data) => {
        // dispatch
        dispatch(saveUserData(data.data));
        navigate("/", { replace: true });
      },
      onSettled: () => {
        setLoading(false);
      },
    });
  };

  // error validation
  const schema = Yup.object().shape({
    email: Yup.string()
      .email("enter_valid_email")
      .required("email_is_required"),
    password: Yup.string().required("password_is_required"),
  });

  return (
    <section className="login">
      <FormHeader title={t("welcome_back")} subtitle={t("login_to_tomom")} />
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        {() => (
          <Form>
            {login_fields.map((item, index) => (
              <InputsHandler key={index} item={item} translation="auth" />
            ))}
            <FormSubmit title={t("sign_in")} loading={loading} />
          </Form>
        )}
      </Formik>
    </section>
  );
}
