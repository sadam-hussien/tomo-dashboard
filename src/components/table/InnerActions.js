import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";

import { useDispatch } from "react-redux";

import { openModal } from "store/global";

import { modalTypes } from "constants";

export default function InnerActions({ data, actions }) {
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
          className="main-table-inner-actions-edit main-table-inner-actions-delete"
          onClick={() => {
            actions.deletingFn(data.id);
          }}
        >
          <img
            src="/assets/images/trash-icon.svg"
            alt="delete"
            className="img-fluid"
          />
          <span>{actions?.deleteBtn || t("delete")}</span>
        </button>
      )}
    </div>
  );
}
