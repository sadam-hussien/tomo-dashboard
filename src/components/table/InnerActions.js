import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";

import { useDispatch } from "react-redux";

import { openModal } from "store/global";

import { modalTypes } from "constants";

export default function InnerActions({
  data,
  actions,
  // view = false,
  // editing = false,
  // editingModalTitle,
  // editingModalBtnTitle,
  // deleting = false,
  // deletingFn,
  // message = false,
  // messageModalTitle,
  // messageModalBtnTitle,
}) {
  const dispatch = useDispatch();
  const { t } = useTranslation("common");
  return (
    <div className="d-flex align-items-center main-table-inner-actions gap-4">
      {actions.view ? (
        actions.view.btn ? (
          <button
            type="button"
            className="main-table-inner-actions-view"
            onClick={() =>
              dispatch(
                openModal({
                  modal_type: modalTypes.view,
                  title: actions.view.title,
                  btnTitle: actions.view.modalBtnTitle,
                  ...data,
                })
              )
            }
          >
            <i className="las la-eye"></i>
            <span>{t("view")}</span>
          </button>
        ) : (
          <Link to={`${data.id}`} className="main-table-inner-actions-view">
            <i className="las la-eye"></i>
            <span>{t("view")}</span>
          </Link>
        )
      ) : null}
      {actions.editing && (
        <button
          type="button"
          className="main-table-inner-actions-edit"
          onClick={() =>
            dispatch(
              openModal({
                modal_type: modalTypes.edit,
                title: actions.editingModalTitle,
                btnTitle: actions.editingModalBtnTitle,
                ...data,
              })
            )
          }
        >
          <img
            src="/assets/images/edit-pen-icon.svg"
            alt="edit pen icon"
            className="img-fluid"
          />
          <span>{t("edit")}</span>
        </button>
      )}
      {actions.message && (
        <button
          type="button"
          className="main-table-inner-actions-edit"
          onClick={() =>
            dispatch(
              openModal({
                modal_type: modalTypes.message,
                title: actions.messageModalTitle,
                btnTitle: actions.messageModalBtnTitle,
                ...data,
              })
            )
          }
        >
          <img
            src="/assets/images/message-icon.svg"
            alt="message"
            className="img-fluid"
          />
          <span>{actions?.messageBtn || t("message")}</span>
        </button>
      )}
      {actions.deleting && (
        <button
          type="button"
          className="main-table-inner-actions-delete border-0 p-0 rounded-circle"
          onClick={() => {
            actions.deletingFn();
          }}
        >
          <i className="las la-times"></i>
          <span>{t("delete")}</span>
        </button>
      )}
    </div>
  );
}
