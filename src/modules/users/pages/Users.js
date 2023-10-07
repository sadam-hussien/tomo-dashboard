import {
  AddBtn,
  DefaultActions,
  Modal,
  Pagination,
  Search,
  Table,
  Table2,
  alertConfirmation,
} from "components";

import { useFetch, usePost } from "hooks";

import { apiDeleteUser, apiGetUsers } from "../server";

import { users_columns } from "../columns";

import { useTranslation } from "react-i18next";

import { Add, Edit } from "../components";

import { useSearchParams } from "react-router-dom";

export function Actions({ col }) {
  // delete coach
  // delete one program
  const { mutate } = usePost({
    queryFn: apiDeleteUser,
    queryKey: "get-users",
  });

  return (
    <DefaultActions
      data={col}
      edit
      remove={{ removeFn: (id) => alertConfirmation({ mutate, id }) }}
    />
  );
}

export default function Users() {
  // translation
  const { t } = useTranslation("common");

  const [searchParams] = useSearchParams();

  const searchParam = searchParams.get("search");

  const pageParam = searchParams.get("page");

  // fetch users using react-query library
  const { isLoading, data } = useFetch({
    queryKey: ["get-users", pageParam, searchParam],
    queryFn: () =>
      apiGetUsers({
        page: pageParam,
        search: searchParam,
      }),
  });

  const usersData = data?.data?.coaches;

  const meta = data?.data?.meta;

  return (
    <section className="users-page">
      <div className="d-flex justify-content-end mb-5">
        <Search placeholder={t("search_about_users_user")} />
      </div>

      <div className="d-flex align-items-center justify-content-between mb-4">
        <AddBtn
          title={t("add_user")}
          modalBtnTitle={t("save")}
          modalTitle={t("add_new_user")}
        />
      </div>

      <Table2
        data={usersData}
        columns={users_columns}
        isLoading={isLoading}
        selection
      />

      <Pagination
        page={meta?.page}
        total={meta?.pageCount}
        hasPreviousPage={meta?.hasPreviousPage}
        hasNextPage={meta?.hasNextPage}
      />
      {/* <Table
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
      /> */}
      <Modal edit={<Edit />} add={<Add />} />
    </section>
  );
}
