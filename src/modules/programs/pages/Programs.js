import { Modal, Table, alertConfirmation } from "components";

import { useFetch, usePost } from "hooks";

import { apiGetPrograms, apiDeleteProgram } from "../server";

import { programs_columns } from "../columns";

import { useTranslation } from "react-i18next";

import { Add, Edit, ProgramToUser } from "../components";

export default function Programs() {
  // translation
  const { t } = useTranslation("common");

  // fetch users using react-query library
  const { isLoading, data } = useFetch({
    queryKey: "get-programs",
    queryFn: apiGetPrograms,
  });

  // delete one program
  const { mutate } = usePost({
    queryFn: apiDeleteProgram,
    queryKey: "get-programs",
  });
  return (
    <section className="programs-page">
      <Table
        data={data?.data}
        columns={programs_columns}
        isLoading={isLoading}
        search
        searchPlaceholder={t("search_about_program")}
        selection
        actions={{
          addAction: true,
          addActionTitle: t("add_program"),
          addActionModalTitle: t("add_new_program"),
          addActionModalBtnTitle: t("save"),
          selectAction: true,
          selectActionProps: {
            id: "program-filter",
            name: "program_type",
            placeholder: t("program_type"),
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
          selectActionPlaceholder: t("program_type"),
          selectActionOnChange: (name, value) => console.log(name, value),
        }}
        innerActions={{
          message: true,
          messageModalTitle: t("send_program"),
          messageModalBtnTitle: t("send"),
          editing: true,
          editingModalTitle: t("edit_program"),
          editingModalBtnTitle: t("save"),

          deleting: true,
          deletingFn: (id) => alertConfirmation({ mutate, id }),
        }}
      />
      <Modal edit={<Edit />} add={<Add />} message={<ProgramToUser />} />
    </section>
  );
}
