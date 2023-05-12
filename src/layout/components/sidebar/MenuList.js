import { NavLink } from "react-router-dom";

import { useTranslation } from "react-i18next";

import { menuListData as data } from "../../dashboardLayout/constants";

import { removeUserData } from "modules/auth/store";

import { useDispatch } from "react-redux";
import { usePost } from "hooks";
import { apiLogout } from "server";
import { Spinner } from "react-bootstrap";

const linkClass =
  "menu-item-link text-capitalize d-flex align-items-center justify-content-between gap-3";

export default function MenuList({ menuListData = data }) {
  const { t } = useTranslation("sidebar");
  // store
  const dispatch = useDispatch();

  // active link
  const checkIsActive = (isActive) => {
    return isActive ? `active-link ${linkClass}` : linkClass;
  };

  // logout api
  const { mutate, isLoading } = usePost({
    queryFn: apiLogout,
    onSuccess: () => {
      dispatch(removeUserData());
    },
  });

  return (
    <nav className="flex-fill d-flex flex-column sidebar__nav">
      {menuListData.map((item, index) =>
        item.type === "button" ? (
          <button
            key={index}
            onClick={() => mutate()}
            type="button"
            className={`${linkClass} bg-transparent border-0`}
          >
            <div className="d-flex align-items-center gap-3">
              <img src={item.image} alt="navbar" className="img-fluid" />
              <span>{t(item.title)}</span>
            </div>

            {isLoading ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              <i className="las la-angle-left icon"></i>
            )}
          </button>
        ) : (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) => checkIsActive(isActive)}
            style={item.style || null}
          >
            <div className="d-flex align-items-center gap-3">
              <img src={item.image} alt="navbar" className="img-fluid" />
              <span>{t(item.title)}</span>
            </div>

            <i className="las la-angle-left icon"></i>
          </NavLink>
        )
      )}
    </nav>
  );
}
