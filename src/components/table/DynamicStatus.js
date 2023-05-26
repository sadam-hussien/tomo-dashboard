import { useTranslation } from "react-i18next";

export default function DynamicStatus({ status = {} }) {
  const {
    i18n: { language },
  } = useTranslation();

  return (
    <div className="d-flex align-items-center gap-2 main-table-status">
      <img
        src={`/assets/images/${status?.img}`}
        alt={status[language]}
        className="img-fluid"
      />
      <span>{status[language]}</span>
    </div>
  );
}
