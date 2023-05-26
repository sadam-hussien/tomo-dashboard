import { useTranslation } from "react-i18next";
import { Link, Outlet, useLocation } from "react-router-dom";

const links = [
  {
    title: "profile",
    path: "profile",
  },
  {
    title: "security",
    path: "security",
  },
  {
    title: "schedule",
    path: "schedule",
  },
];

export default function Main() {
  const { pathname } = useLocation();

  const { t } = useTranslation("common");

  function activeClass(href) {
    console.log(pathname);
    if (pathname.includes(href)) {
      return "active";
    }
    return "";
  }
  return (
    <section className="settings-page">
      <nav className="settings-nav d-flex align-items-center gap-5">
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
      <Outlet />
    </section>
  );
}
