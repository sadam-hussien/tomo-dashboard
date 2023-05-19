import { Modal, Table, alertConfirmation } from "components";

import { useFetch, usePost } from "hooks";

import { apiGetCoaches, apiDeleteCoache } from "../server";

import { coaches_columns } from "../columns";

import { useTranslation } from "react-i18next";

import { Add, Edit } from "../components";

export default function Coaches() {
  // translation
  const { t } = useTranslation("common");

  // fetch users using react-query library
  const { isLoading, data } = useFetch({
    queryKey: "get-coaches",
    queryFn: apiGetCoaches,
  });

  // delete coach
  const { mutate, isLoading: isLoadingDelete } = usePost({
    queryFn: apiDeleteCoache,
    queryKey: "get-coaches",
  });

  return (
    <section className="coaches-page">
      <Table
        data={data?.data}
        columns={coaches_columns}
        isLoading={isLoading}
        search
        searchPlaceholder={t("search_about_coach")}
        actions={{
          addAction: true,
          addActionTitle: t("add_coach"),
          addActionModalTitle: t("add_new_coach"),
          addActionModalBtnTitle: t("save"),
          selectAction: false,
        }}
        innerActions={{
          editing: true,
          editingModalTitle: t("edit_coach"),
          editingModalBtnTitle: t("save"),
          deleting: true,
          deletingFn: (id) =>
            alertConfirmation({ mutate, id, isLoading: isLoadingDelete }),
        }}
        tableHeaderClass="d-flex flex-row-reverse justify-content-between align-items-center"
      />

      <Modal edit={<Edit />} add={<Add />} />
    </section>
  );
}
