import { Modal, Table, alertConfirmation } from "components";

import { useFetch, usePost } from "hooks";

import { apiGetCoaches, apiDeleteCoache, apiGetPrograms } from "../server";

import { coaches_columns } from "../columns";

import { useTranslation } from "react-i18next";

import { Add, Edit } from "../components";

import { Link, useSearchParams } from "react-router-dom";

export default function Coaches() {
  // translation
  const { t } = useTranslation("common");

  // fetch users using react-query library
  const { isLoading: isLoadingCoaches, data: coachesData } = useFetch({
    queryKey: "get-coaches",
    queryFn: apiGetCoaches,
  });
  
  const [searchParams, setSearchParams] = useSearchParams();

  const programType = searchParams.get("program_type");

  const { isLoading: isLoadingPrograms, data: programsData } = useFetch({
    queryKey: ["get-programs", programType],
    queryFn: () =>
      apiGetPrograms({
        program_type: programType,
      }),
  });

  // delete coach
  const { mutate } = usePost({
    queryFn: apiDeleteCoache,
    queryKey: "get-coaches",
  });

  console.log(coachesData)

  return (
    <section className="coaches-page"> 
      <Table
        data={coachesData?.data}
        columns={coaches_columns}
        isLoading={isLoadingCoaches}
        programType = {programType}
        selector
        search
        selection
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
          deletingFn: (id) => alertConfirmation({ mutate, id }),
        }}
        tableHeaderClass="d-flex flex-row-reverse justify-content-between align-items-center"
      />

      <Modal edit={<Edit />} add={<Add />} />
    </section>
  );
}
