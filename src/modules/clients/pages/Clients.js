import { Modal, Table, Message } from "components";

import { useFetch } from "hooks";

import { apiGetUsers } from "../server";

import { clients_columns } from "../columns";

import { useTranslation } from "react-i18next";

export default function Clients() {
  // translation
  const { t } = useTranslation("common");

  // fetch users using react-query library
  const { isLoading, data } = useFetch({
    queryKey: "get-clients",
    queryFn: apiGetUsers,
  });
  console.log(data)
  console.log(data?.data?.leaders)

  return (
    <section className="programs-page">
      <Table
        data={data?.data?.leaders}
        columns={clients_columns}
        isLoading={isLoading}
        search
        searchPlaceholder={t("search_about_users")}
        selection
        filter
        tableHeaderClass="d-flex flex-row-reverse justify-content-between flex-wrap"
        actions={{
          addAction: false,
          selectAction: true,
          selectActionProps: {
            id: "users-filter",
            name: "users_type",
            placeholder: t("search_about_users"),
            noBorder: true,
            options: [
              { label: t("all"), value: "all" },
              { label: t("active"), value: "active" },
              { label: t("pending"), value: "pending" },
              {
                label: t("terminate"),
                value: "terminate",
              },
              { label: t("latest_subscription"), value: "latest_subscription" },
            ],
          },
          selectActionPlaceholder: t("subscription_type"),
          selectActionOnChange: (name, value) => console.log(name, value),
        }}
      />
      <Modal message={<Message />} />
    </section>
  );
}
