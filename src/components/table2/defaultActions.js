import { useTranslation } from "react-i18next";

import { useDispatch } from "react-redux";

import { openModal } from "store/global";

import { modalTypes } from "constants";

import { Link } from "react-router-dom";

export default function DefaultActions({
  children,
  view,
  edit,
  remove,
  viewLink = null,
  message = null,
  data = {},
}) {
  return (
    <div className="d-flex align-items-center main-table-inner-actions gap-4">
      {view && <ViewBtn view={view} data={data} />}
      {viewLink && <ViewLink viewLink={viewLink} data={data} />}
      {edit && <EditBtn edit={edit} data={data} />}
      {message && <MessageBtn message={message} data={data} />}
      {remove && <RemoveBtn remove={remove} data={data} />}
      {children}
    </div>
  );
}

export function ViewBtn({ view, data }) {
  const dispatch = useDispatch();

  const { t } = useTranslation("common");

  return (
    <button
      type="button"
      className="main-table-inner-actions-btn main-table-inner-actions-view"
      onClick={() =>
        dispatch(
          openModal({
            modal_type: modalTypes.view,
            title: t(view?.title),
            btnTitle: t(view?.btnTitle),
            ...data,
          })
        )
      }
    >
      <i className="las la-eye"></i>
      <span>{t("view")}</span>
    </button>
  );
}

export function ViewLink({ data }) {
  const { t } = useTranslation("common");

  return (
    <Link
      to={`${data.id}`}
      className="main-table-inner-actions-btn main-table-inner-actions-view"
    >
      <i className="las la-eye"></i>
      <span>{t("view")}</span>
    </Link>
  );
}

export function EditBtn({ edit, data }) {
  const dispatch = useDispatch();

  const { t } = useTranslation("common");

  return (
    <button
      type="button"
      className="main-table-inner-actions-btn main-table-inner-actions-edit"
      onClick={() =>
        dispatch(
          openModal({
            modal_type: modalTypes.edit,
            title: t(edit?.title),
            btnTitle: t(edit?.btnTitle),
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
  );
}

export function RemoveBtn({ remove, data }) {
  const { t } = useTranslation("common");

  return (
    <button
      type="button"
      className="main-table-inner-actions-btn main-table-inner-actions-delete"
      onClick={() => {
        remove.removeFn(data.id);
      }}
    >
      <img
        src="/assets/images/trash-icon.svg"
        alt="delete"
        className="img-fluid"
      />
      <span>{t("delete")}</span>
    </button>
  );
}

export function MessageBtn({ message, data, style, label }) {
  const dispatch = useDispatch();

  const { t } = useTranslation("common");

  return (
    <button
      type="button"
      className="main-table-inner-actions-btn main-table-inner-actions-message"
      onClick={() =>
        dispatch(
          openModal({
            modal_type: modalTypes.message,
            title: t(message?.title),
            btnTitle: t(message?.btnTitle),
            ...data,
          })
        )
      }
      style={style}
    >
      <img
        src="/assets/images/message-icon.svg"
        alt="message"
        className="img-fluid"
      />
      {label ? label : <span>{t("message")}</span>}
    </button>
  );
}
