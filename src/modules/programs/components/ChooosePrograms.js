import { Btn, CheckBoxInput, InputWithIcon } from "components";
import { useFetch, usePost } from "hooks";
import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import { apiAssignProgramToUser, apiGetPrograms } from "../server";
import { Form, Formik } from "formik";
import { modalTypes } from "constants";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { openModal } from "store/global";

export default function ChooosePrograms({ handleClose }) {
  const { t } = useTranslation("common");

  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  const { isLoading, data } = useFetch({
    queryKey: ["get-programs", search],
    queryFn: () => apiGetPrograms({ search: search }),
  });

  const { mutate, isLoading: isLoadingMutate } = usePost({
    queryFn: apiAssignProgramToUser,
    onSuccess: () => handleClose(),
  });

  function handleSubmit(values) {
    dispatch(
      openModal({
        modal_type: modalTypes.message,
        title: t("send_program"),
        // btnTitle: t("choose_clienr"),
        programs: [...values.programId],
      })
    );
    // mutate({
    //   programId: data.data.id,
    //   ...values,
    // }, {
    //   onSuccess: () => {
    //     dispatch(
    //       openModal({
    //         modal_type: modalTypes.message,
    //         title: t("send_program"),
    //         // btnTitle: t("choose_clienr"),
    //         programs: [...valuesprogramId]
    //       })
    //     )
    //   }
    // });
  }

  return (
    <div className="assign-program-to-user">
      <InputWithIcon
        name="search-program"
        id="search-program"
        basic={{ onChange: (value) => setSearch(value) }}
        type="search"
        placeholder="أبحث عن عميل"
        noBorder
        containerStyle={{
          backgroundColor: "#F0F0F0",
          flexDirection: "row-reverse",
        }}
        icon="las la-search"
      />

      {isLoading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <div className="list-of-users">
          <Formik
            initialValues={{
              programId: [],
            }}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
                <div className="list-of-users-inner">
                  {data?.data && data.data.length
                    ? data.data.map((item) => (
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
                            // containerStyle,
                            // style,
                            id={item?.id}
                            name="programId"
                            value={item?.id}
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
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
}
