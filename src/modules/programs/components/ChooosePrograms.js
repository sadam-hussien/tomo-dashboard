import { Btn, CheckBoxInput, InputWithIcon } from "components";
import { useFetch, usePost } from "hooks";
import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import { apiGetPrograms } from "../server";
import { ErrorMessage, Form, Formik } from "formik";
import { modalTypes } from "constants";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { openModal } from "store/global";

import ChooseProgramInfo from "./ChooseProgramInfo";

import { programTypes } from "constants";

import * as Yup from "yup";

const schema = Yup.object().shape({
  programId: Yup.array()
    .min(1, "please_select_one_program")
    .required("please_select_one_program"), // You can customize the error message
});

export default function ChooosePrograms({ handleClose, selectedPrograms }) {
  const { t } = useTranslation("common");

  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  const [programType, setProgramType] = useState(programTypes.nutrition);

  const { isLoading, data } = useFetch({
    queryKey: ["get-programs-and-assign", search, programType],
    queryFn: () => apiGetPrograms({ search, program_type: programType }),
  });

  const programsData = data?.data?.programs;

  const [isLoadingMutate, setIsLoadingMutate] = useState(false);

  function handleSubmit(values) {
    setIsLoadingMutate(true);
    setTimeout(() => {
      setIsLoadingMutate(false);
      dispatch(
        openModal({
          modal_type: modalTypes.message,
          title: t("send_program"),
          id: true,
          programs: [...values.programId],
        })
      );
    }, 1000);
  }

  return (
    <div className="assign-program-to-user">
      <InputWithIcon
        name="search-program"
        id="search-program"
        basic={{ onChange: (value) => setSearch(value) }}
        type="search"
        placeholder={t("search_about_global_program")}
        noBorder
        containerStyle={{
          backgroundColor: "#F0F0F0",
          flexDirection: "row-reverse",
        }}
        icon="las la-search"
      />

      <div className="list-of-users">
        <Formik
          initialValues={{
            programId: selectedPrograms || [],
          }}
          onSubmit={handleSubmit}
          validationSchema={schema}
        >
          {({ errors }) => (
            <Form>
              <ChooseProgramInfo
                programType={programType}
                changeTab={setProgramType}
              />
              {isLoading ? (
                <div className="d-flex justify-content-center">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              ) : (
                <>
                  <ErrorMessage name="programId">
                    {(msg) => <div className="input-error-msg">{t(msg)}</div>}
                  </ErrorMessage>
                  <div className="list-of-users-inner">
                    {programsData && programsData.length
                      ? programsData.map((item) => (
                          <div
                            className="d-flex align-items-center justify-content-between list-of-users-user"
                            key={item.id}
                          >
                            <div className="d-flex align-items-center gap-2">
                              <span className="list-of-users-user-name">
                                {item.name}
                              </span>
                            </div>

                            <CheckBoxInput
                              id={item?.id}
                              name="programId"
                              value={item?.id}
                              noError={true}
                            />
                          </div>
                        ))
                      : null}
                  </div>
                  <div className="mt-lg d-flex justify-content-end">
                    <Btn
                      type="submit"
                      classes="list-of-users-submit-btn"
                      style={{
                        width: "100px",
                        height: "40px",
                        borderRadius: "15px",
                        minWidth: "150px",
                        padding: 0,
                      }}
                      loading={isLoadingMutate}
                    >
                      <div className="d-flex justify-content-center align-items-center gap-2">
                        <span>اختيار العميل</span>
                        <i className="las la-paper-plane icon"></i>
                      </div>
                    </Btn>
                  </div>
                </>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
