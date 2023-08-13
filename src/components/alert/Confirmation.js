import { useState } from "react";
import Btn from "../core/buttons/Btn";

import { useTranslation } from "react-i18next";

export default function Confirmation({ swal, id, mutate, confirmTitle }) {
  const { t } = useTranslation("common");
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div>
      <h4 className="alert-title">{t("are_you_sure_you_want_delete")}</h4>
      <div className="d-flex flex-column gap-3">
        <Btn
          type="submit"
          title={confirmTitle ? t(confirmTitle) : t("save")}
          loading={isLoading}
          style={{
            height: "48px",
            fontSize: "var(--font-size-md)",
            fontWeight: 500,
          }}
          onClick={() => {
            setIsLoading(true);
            mutate(id, {
              onSuccess: () => {
                setIsLoading(false);
                swal.clickCancel();
              },
            });
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
