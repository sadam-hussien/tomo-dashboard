import { Table } from "components";

import { useFetch } from "hooks";

import { apiGetCoaches } from "../server";

import { coaches_columns } from "../columns";

import { useTranslation } from "react-i18next";

export default function Coaches() {
  // translation
  const { t } = useTranslation("common");

  // fetch users using react-query library
  const { isLoading, data } = useFetch({
    queryKey: "get-coaches",
    queryFn: apiGetCoaches,
  });

  return (
    <section className="coaches-page">
      <Table
        data={data?.data}
        columns={coaches_columns}
        isLoading={isLoading}
        search
        searchPlaceholder={t("search_about_coach")}
      />
    </section>
  );
}
