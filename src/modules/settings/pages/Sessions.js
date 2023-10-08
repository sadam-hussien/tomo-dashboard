import { FieldArray, Form, Formik } from "formik";

import { Col, Row } from "react-bootstrap";

import { useTranslation } from "react-i18next";

import * as Yup from "yup";

import { change_password_fields } from "../constants";

import { Btn, CustomDateInput, InputWithIcon, InputsHandler } from "components";

import { usePost } from "hooks";

import { apiUpdateSessions } from "../server";

import { useOutletContext } from "react-router-dom";

const sessionsField = {
  date: "",
  number_of_seats: "",
};

export default function Sessions() {
  const { t } = useTranslation("common");

  const { data } = useOutletContext();

  const { mutate, isLoading } = usePost({
    queryFn: apiUpdateSessions,
  });

  function handleSubmit(values) {
    mutate({ items: values.sessions });
  }

  return (
    <div className="">
      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          sessions: data?.coachSessions || [sessionsField],
        }}
      >
        {({ handleReset, values }) => (
          <Form>
            <div className="setting-input-container">
              <FieldArray
                name="sessions"
                render={(arrayHelpers) => (
                  <div className="">
                    {values.sessions.map((item, index) => (
                      <div key={index} className="setting-input-container">
                        <Row className="g-5">
                          <Col lg={4}>
                            <CustomDateInput
                              name={`sessions[${index}].date`}
                              id={`sessions-${index}-date`}
                              // placeholder={t("profile_birth_of_date")}
                              label={t("the_day")}
                              noBorder
                              containerStyle={{
                                flexDirection: "row-reverse",
                              }}
                            />
                          </Col>
                          <Col sm={8} lg={4}>
                            <InputWithIcon
                              type="text"
                              name={`sessions[${index}].number_of_seats`}
                              label={t("number_of")}
                              placeholder={t("number_of")}
                              icon="las la-edit"
                              id="program-extra-meal-name"
                              noBorder
                              containerStyle={{
                                flexDirection: "row-reverse",
                              }}
                            />
                          </Col>
                          {values.sessions.length > 1 && (
                            <Col sm={4} className="d-flex align-items-end">
                              <button
                                type="button"
                                className="mb-1 cursor-pointer bg-transparent border-0 p-0 d-flex align-items-center gap-4"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                <span className="btn-icon setting-subscription-delete-item">
                                  <img
                                    src="/assets/images/trash-icon-2.svg"
                                    alt="camera"
                                    className="img-fluid"
                                  />
                                </span>
                                <h5 className="btn-text m-0">حذف</h5>
                              </button>
                            </Col>
                          )}
                        </Row>
                      </div>
                    ))}

                    <Btn
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "var(--secondary)",
                        fontSize: "20px",
                        marginTop: "32px",
                      }}
                      type="button"
                      onClick={() => arrayHelpers.push(sessionsField)}
                    >
                      <i className="las la-plus"></i>
                      <span>اضافة موعد جديد</span>
                    </Btn>
                  </div>
                )}
              />
            </div>

            <div className=" d-flex align-items-center gap-4 flex-wrap">
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
