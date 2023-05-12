import { modalTypes } from "constants";

import { useTranslation } from "react-i18next";

import { useDispatch } from "react-redux";

import { openModal } from "store/global";

export default function SubscriptItem(props) {
  const { t } = useTranslation("common");

  const dispatch = useDispatch();
  return (
    <div className="subscriptions__item h-100  d-flex flex-column">
      <img
        src={process.env.REACT_APP_BASE_URL + props.image}
        alt={props.name}
        className="img-fluid subscriptions__item__img"
      />
      <div className="subscriptions__item__info h-100  d-flex flex-column">
        <h6 className="subscriptions__item__info__name">{props.name}</h6>
        <p className="subscriptions__item__info__desc">{props.description}</p>
        <div className="d-flex align-items-end justify-content-between subscriptions__item__footer">
          <div>
            {props.discount_status && (
              <span className="subscriptions__item__info__discount">
                {props.discount}ر.س
              </span>
            )}
            <span className="subscriptions__item__info__price">
              {props.discount_status
                ? parseInt(props.price) - parseInt(props.discount)
                : props.price}
              ر.س
            </span>
          </div>

          <button
            type="button"
            className="subscriptions__item__edit bg-transparent border-0 p-0 d-flex flex-column justify-content-center align-items-center gap-1"
            onClick={() =>
              dispatch(
                openModal({
                  modal_type: modalTypes.edit,
                  title: t("edit"),
                  btnTitle: t("save"),
                  ...props,
                })
              )
            }
          >
            <img
              src="/assets/images/edit-pen-red-icon.svg"
              alt="edit"
              className="img-fluid"
            />
            <span>تعديل</span>
          </button>
        </div>
      </div>
    </div>
  );
}
