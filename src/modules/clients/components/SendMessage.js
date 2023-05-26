import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function SendMessage({ data }) {
  const { t } = useTranslation("common");
  return (
    <Link
      to={{ pathname: "/messages", search: `?user=${data?.user?.id}` }}
      className="users-message-link"
    >
      <img
        src="/assets/images/message-icon.svg"
        alt="message"
        className="img-fluid"
      />
      <span>{t("send_message")}</span>
    </Link>
  );
}
