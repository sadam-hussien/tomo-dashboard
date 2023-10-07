import { useFetch } from "hooks";
import { useTranslation } from "react-i18next";
import { Link, Outlet, useLocation } from "react-router-dom";
import { apiGetProfile } from "../server";
import { Spinner } from "react-bootstrap";

const links = [
  {
    title: "profile",
    path: "profile",
  },
  {
    title: "subscription_dates",
    path: "subscriptions",
  },
  {
    title: "session_dates",
    path: "sessions",
  },
];

export default function Main() {
  const { pathname } = useLocation();

  const { t } = useTranslation("common");

  const { isLoading, data } = useFetch({
    queryFn: apiGetProfile,
    queryKey: "get-profile-data",
  });

  function activeClass(href) {
    if (pathname.includes(href)) {
      return "active";
    }
    return "";
  }

  return (
    <section className="settings-page">
      <nav className="settings-nav d-flex align-items-center gap-5 flex-wrap">
        {links.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            className={`settings-nav-item ${activeClass(link.path)} ${
              link.path === "profile" && pathname === "/settings"
                ? "active"
                : ""
            }`}
          >
            {t(link.title)}
          </Link>
        ))}
      </nav>
      {isLoading ? (
        <Spinner
          as="span"
          animation="border"
          role="status"
          aria-hidden="true"
        />
      ) : (
        <Outlet context={{ data: data?.data?.coach }} />
      )}
    </section>
  );
}
