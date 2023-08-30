import { alertConfirmation } from "components";

import { modalTypes } from "constants";

import { useTranslation } from "react-i18next";

import { useDispatch } from "react-redux";

import { openModal } from "store/global";

export default function NewsItem(props) {

  // const { mutate } = usePost({
  //   queryFn: apiDeleteCoache,
  //   queryKey: "get-coaches",
  // });

  const { t } = useTranslation("common");

  const dispatch = useDispatch();
  return (
    <div className="news__item h-100 position-relative d-flex flex-column">
      <img className="news-cam" src="assets\images\camera-2.svg" alt="" />
      <img
        src={props.image}
        alt={props.name}
        className="img-fluid news__item__img"
      />
      <div className="news__item__info h-100  d-flex flex-column">
        <h6 className="news__item__info__name">{props.name}</h6>
        <div className="d-flex align-items-end justify-content-between news__item__footer">
          <div>
              <span className="news__item__info__discount">
                2/4/2023
              </span>
            <span className="news__item__info__price">
              المشاهدات 254
            </span>
          </div>
          <div className="d-flex gap-4">
            <button
              type="button"
              className="news__item__edit bg-transparent border-0 p-0 d-flex flex-column justify-content-center align-items-center gap-1"
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
            <button
            type="button"
            className="news__item__edit bg-transparent border-0 p-0 d-flex flex-column justify-content-center align-items-center gap-1"
            onClick={(id) => alertConfirmation({ id })}
          >
            <img
              src="/assets/images/trash-icon.svg"
              alt="edit"
              className="img-fluid"
            />
            <span>حذف</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
