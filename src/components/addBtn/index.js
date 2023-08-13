import { Btn } from "components";

import { modalTypes } from "constants";

import { useTranslation } from "react-i18next";

import { useDispatch } from "react-redux";

import { openModal } from "store/global";

export default function AddBtn({ title, modalBtnTitle, modalTitle }) {
  // translation
  const { t } = useTranslation("common");
  // store
  const dispatch = useDispatch();

  return (
    <Btn
      loading={false}
      icon="las la-plus"
      style={{ minWidth: "159px", height: "48px" }}
      onClick={() =>
        dispatch(
          openModal({
            modal_type: modalTypes.add,
            title: modalTitle,
            btnTitle: modalBtnTitle,
          })
        )
      }
    >
      <i className="las la-plus icon" style={{ fontSize: "20px" }}></i>
      <span>{title || t("add")}</span>
    </Btn>
  );
}
