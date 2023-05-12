import React from "react";

import { Btn, SelectBox } from "components";

import { useDispatch } from "react-redux";

import { openModal } from "store/global";

import { useTranslation } from "react-i18next";

import { modalTypes } from "constants";

import { Form, Formik } from "formik";

import { FilterOption } from "components";

export default function Actions({
  actions: {
    addAction = true,
    addActionTitle,
    addActionModalTitle,
    addActionModalBtnTitle,
    selectAction = true,
    selectActionProps,
    selectActionPlaceholder,
    selectActionLabel,
    selectActionOnChange,
  },
}) {
  // translation
  const { t } = useTranslation("common");
  // store
  const dispatch = useDispatch();

  const styles = { minWidth: "159px", height: "48px" };

  return (
    <div className="main-table-actions d-flex flex-wrap align-items-center justify-content-between gap-5">
      {addAction && (
        <Btn
          // title={addActionTitle || t("add")}
          loading={false}
          icon="las la-plus"
          style={{ ...styles }}
          onClick={() =>
            dispatch(
              openModal({
                modal_type: modalTypes.add,
                title: addActionModalTitle,
                btnTitle: addActionModalBtnTitle,
              })
            )
          }
        >
          <i className="las la-plus icon" style={{ fontSize: "20px" }}></i>
          <span>{addActionTitle || t("add")}</span>
        </Btn>
      )}

      {selectAction && (
        <Formik initialValues={{ [selectActionProps.name]: "" }}>
          {() => (
            <Form>
              <SelectBox
                item={{
                  ...selectActionProps,
                  
                  props: {
                    components: { Option: FilterOption },
                  },
                }}
                placeholder={selectActionPlaceholder}
                label={selectActionLabel}
                onChange={selectActionOnChange}
                containerStyle={{
                  marginBottom: 0,
                  boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)",
                }}
              />
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}
