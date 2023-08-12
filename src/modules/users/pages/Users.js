import { Modal, Table, alertConfirmation } from "components";

import { useFetch, usePost } from "hooks";

import { apiDeleteUser, apiGetUsers } from "../server";

import { users_columns } from "../columns";

import { useTranslation } from "react-i18next";

import { Add, Edit } from "../components";

export default function Users() {
  // translation
  const { t } = useTranslation("common");

  // fetch users using react-query library
  const { isLoading, data } = useFetch({
    queryKey: "get-users",
    queryFn: apiGetUsers,
  });

  // delete one program
  const { mutate } = usePost({
    queryFn: apiDeleteUser,
    queryKey: "get-users",
  });

  return (
    <section className="programs-page">
      <Table
        data={data?.data}
        columns={users_columns}
        isLoading={isLoading}
        search
        searchPlaceholder={t("search_about_users_user")}
        selection
        actions={{
          addAction: true,
          addActionModalTitle: t("add_new_user"),
          addActionTitle: t("add_user"),
          selectAction: true,
          selectActionProps: {
            id: "users-filter",
            name: "users_type",
            placeholder: t("user_type"),
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
          selectActionPlaceholder: t("user_type"),
          selectActionOnChange: (name, value) => console.log(name, value),
        }}
        innerActions={{
          editing: true,
          editingModalTitle: t("edit_user"),
          editingModalBtnTitle: t("save"),
          deleting: true,
          deletingFn: (id) => alertConfirmation({ mutate, id }),
        }}
      />
      <Modal edit={<Edit />} add={<Add />} />
    </section>
  );
}
