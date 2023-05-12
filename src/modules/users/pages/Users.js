import { Modal, Table, Message } from "components";

import { useFetch } from "hooks";

import { apiGetUsers } from "../server";

import { users_columns } from "../columns";

import { useTranslation } from "react-i18next";

export default function Users() {
  // translation
  const { t } = useTranslation("common");

  // fetch users using react-query library
  const { isLoading, data } = useFetch({
    queryKey: "get-users",
    queryFn: apiGetUsers,
  });

  return (
    <section className="programs-page">
      <Table
        data={data?.data?.leaders}
        columns={users_columns}
        isLoading={isLoading}
        search
        searchPlaceholder={t("search_about_users")}
        selection
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
        innerActions={{
          message: true,
          messageModalTitle: t("send_program"),
          messageModalBtnTitle: t("send"),
        }}
      />
      <Modal message={<Message />} />
    </section>
  );
}
