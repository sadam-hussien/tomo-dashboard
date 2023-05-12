import { Modal, Table } from "components";

import { useFetch } from "hooks";

import { apiGetSubscriptions } from "../server";

import { subscription_columns } from "../columns";

import { useTranslation } from "react-i18next";
import { Add, Edit } from "../components";

// import { Add, Edit } from "../components";

export default function Subscriptions() {
  // translation
  const { t } = useTranslation("common");

  // fetch users using react-query library
  const { isLoading, data } = useFetch({
    queryKey: "get-subscriptions",
    queryFn: apiGetSubscriptions,
  });

  return (
    <section className="subscription-page">
      <Table
        data={data?.data}
        columns={subscription_columns}
        isLoading={isLoading}
        search
        searchPlaceholder={t("search_about_subscription")}
        actions={{
          addAction: true,
          addActionTitle: t("add_subscription"),
          addActionModalTitle: t("add_new_subscription"),
          addActionModalBtnTitle: t("save"),
          selectAction: true,
          selectActionProps: {
            id: "subcriptions-filter",
            name: "subscription_type",
            placeholder: t("subscription_type"),
            noBorder: true,
            options: [
              { label: t("all"), value: "all" },
              { label: t("most_used_program"), value: "most_used_program" },
              { label: t("less_used_program"), value: "less_used_program" },
              {
                label: t("highest_subscriptions"),
                value: "highest_subscriptions",
              },
              { label: t("highest_sales"), value: "highest_sales" },
              { label: t("less_sales"), value: "less_sales" },
            ],
          },
          selectActionPlaceholder: t("subscription_type"),
          selectActionOnChange: (name, value) => console.log(name, value),
        }}
        grid={{
          rows: {
            xl: 4,
            lg: 3,
            md: 2,
            xs: 1,
            className: "g-5",
          },
        }}
      />
      <Modal edit={<Edit />} add={<Add />} />
    </section>
  );
}
