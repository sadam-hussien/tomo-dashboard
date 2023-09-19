import React from "react";

import { InputWithIcon, LangController } from "components";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { coach } = useSelector(({ auth }) => auth.user);
  return (
    <header className="fixed-top header d-flex align-items-center justify-content-between gap-5">
      <div className="d-flex align-items-center gap-lg-3 gap-xl-5">
        <Link to="/" className="header__logo">
          <img
            src="/assets/images/dashboard-logo.svg"
            alt="dashboard"
            className="img-fluid"
          />
        </Link>
        <div className="d-none d-lg-block">
          <InputWithIcon
            type="search"
            basic={{
              onChange: (value) => console.log(value),
            }}
            noBorder
            icon="las la-search"
            placeholder="البحث..."
            containerStyle={{
              flexDirection: "row-reverse",
              margin: 0,
              backgroundColor: "#797979",
              height: "44px",
              borderRadius: "var(--border-radius-sm)",
              border: "none",
              width: "297px",
              minWidth: "auto",
            }}
          />
        </div>
      </div>
      <div className="d-none d-lg-flex align-items-center gap-lg-4 gap-xl-5">
        {/* lang controller  */}
        <LangController />
        {/* notification  */}
        <button
          type="button"
          className="bg-transparent border-0 p-0 header__notification position-relative"
        >
          <img
            src="/assets/images/notification-icon.svg"
            alt="notification"
            className="img-fluid"
          />
          <span className="header__badge">5</span>
        </button>
        <button
          type="button"
          className="bg-transparent border-0 p-0  header__messages position-relative"
        >
          <img
            src="/assets/images/messages-icon.svg"
            alt="messages"
            className="img-fluid"
          />
          <span className="header__badge">3</span>
        </button>

        <div className="header__profile d-flex align-items-center gap-3">
          {coach?.image && (
            <img src={coach.image} alt={coach.name} className="img-fluid" />
          )}
          <h5 className="header__profile__name m-0">{coach?.name}</h5>
        </div>
      </div>

      <button
        type="button"
        className="d-lg-none header__toggle bg-transparent border-0 p-0"
      >
        <i className="las la-bars icon"></i>
      </button>
    </header>
  );
}
