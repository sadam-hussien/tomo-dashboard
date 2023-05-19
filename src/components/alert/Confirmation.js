import Btn from "../core/buttons/Btn";

import { useTranslation } from "react-i18next";

export default function Confirmation({ swal, mutate, id, isLoading }) {
  const { t } = useTranslation("common");
  return (
    <div>
      <div className="d-flex flex-column gap-3">
        <Btn
          type="submit"
          title={t("save")}
          loading={isLoading}
          style={{
            height: "48px",
            fontSize: "var(--font-size-md)",
            fontWeight: 500,
          }}
          onClick={() => {
            mutate(id);
          }}
        />
        <Btn
          type="button"
          title={t("no_back")}
          onClick={() => swal.clickCancel()}
          classes="transparent"
          style={{
            height: "48px",
            fontSize: "var(--font-size-md)",
            fontWeight: 500,
          }}
          disabled={isLoading}
        />
      </div>
    </div>
  );
}
