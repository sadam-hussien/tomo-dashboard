import { useTranslation } from "react-i18next";

const statuses = {
  active: {
    en: "active",
    ar: "نشط",
  },
  pending: {
    en: "pending",
    ar: "متوقف",
  },

  terminate: {
    en: "terminate",
    ar: "انتهى",
  },
};

export default function Status({ status }) {
  const {
    i18n: { language },
  } = useTranslation();
  return (
    <div className="d-flex align-items-center gap-2 main-table-status">
      {status === statuses.active[language] ? (
        <>
          <img
            src="/assets/images/active-icon.svg"
            alt="active"
            className="img-fluid"
          />
          <span>{status}</span>
        </>
      ) : status === statuses.pending[language] ? (
        <>
          <img
            src="/assets/images/pending-icon.svg"
            alt="active"
            className="img-fluid"
          />
          <span>{status}</span>
        </>
      ) : status === statuses.terminate[language] ? (
        <>
          <img
            src="/assets/images/terminate-icon.svg"
            alt="active"
            className="img-fluid"
          />
          <span>{status}</span>
        </>
      ) : (
        <>
          <img
            src="/assets/images/terminate-icon.svg"
            alt="active"
            className="img-fluid"
          />
          <span>{status || "انتهى"}</span>
        </>
      )}
    </div>
  );
}
