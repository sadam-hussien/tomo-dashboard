import { Modal, Table } from "components";

import { useFetch } from "hooks";

import { apiGetSubscriptions } from "../server";

import { news_columns } from "../columns";

import { useTranslation } from "react-i18next";

import { Add, Edit } from "../components";

// import { Add, Edit } from "../components";

export default function News() {
  // translation
  const { t } = useTranslation("common");

  // fetch users using react-query library
  const { isLoading, data } = useFetch({
    queryKey: "get-subscriptions",
    queryFn: apiGetSubscriptions,
  });


  return (
    <section className="news-page">
      <Table
        data={data?.data}
        columns={news_columns}
        isLoading={isLoading}
        search
        searchPlaceholder={t("search_about_subscription")}
        filter={true}
        actions={{
          addAction: true,
          addActionTitle: t("add_blog"),
          addActionModalTitle: t("add_new_subscription"),
          addActionModalBtnTitle: t("save"),
          selectAction: false,
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
