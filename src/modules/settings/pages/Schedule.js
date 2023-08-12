import { FieldArray, Form, Formik } from "formik";

import { Col, Row } from "react-bootstrap";

import { useTranslation } from "react-i18next";

import * as Yup from "yup";

import { change_password_fields } from "../constants";

import { Btn, InputsHandler } from "components";

import { usePost } from "hooks";

import { apiUpdatePassword } from "../server";

export default function Schedule() {
  const { t } = useTranslation("common");

  const { mutate, isLoading } = usePost({
    queryFn: apiUpdatePassword,
  });

  const schema = Yup.object().shape({
    // oldPassword: Yup.string().required("current_password_is_required"),
    // password: Yup.string().required("new_password_is_required"),
    // confirmPassword: Yup.string()
    //   .required("password_confirm")
    //   .oneOf([Yup.ref("password"), null], "password_match"),
  });

  function handleSubmit(values) {
    mutate(values);
  }

  return (
    <div className="">
      <Formik
        validationSchema={schema}
        onSubmit={handleSubmit}
        initialValues={{
          schedule: [
            {
              day: "",
              number: "",
            },
          ],
        }}
      >
        {({ handleReset, values }) => (
          <Form>
            <FieldArray 
            
              name="schedule"
              render={arrayHelpers => (
                <div>
                  {
                    values.schedule.map((item, index) => (
                     <div key={index}>
                      
                     </div> 
                    ))
                  }
                </div>
              )}
            />
            <div className="mt-3 d-flex align-items-center justify-content-end gap-4">
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
