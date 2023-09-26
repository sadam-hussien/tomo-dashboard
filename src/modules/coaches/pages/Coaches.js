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

import { apiGetCoaches, apiDeleteCoache, apiGetPrograms } from "../server";

import { coaches_columns } from "../columns";

import { useTranslation } from "react-i18next";

import { Add, Edit } from "../components";

import { Link, useSearchParams } from "react-router-dom";

export function Actions({ col }) {
  // delete coach
  const { mutate } = usePost({
    queryFn: apiDeleteCoache,
    queryKey: "get-coaches",
  });

  return (
    <DefaultActions
      data={col}
      edit
      remove={{ removeFn: (id) => alertConfirmation({ mutate, id }) }}
    />
  );
}

export default function Coaches() {
  // translation
  const { t } = useTranslation("common");

  const [searchParams] = useSearchParams();

  const coachType = searchParams.get("type");
  // sport, food

  const searchParam = searchParams.get("search");

  const pageParam = searchParams.get("page");

  // fetch users using react-query library
  const { isLoading, data } = useFetch({
    queryKey: ["get-coaches", searchParam, pageParam, coachType],
    queryFn: () =>
      apiGetCoaches({
        page: pageParam,
        search: searchParam,
        type: coachType,
      }),
  });

  const meta = data?.data?.meta;

  const coachesData = data?.data?.coaches;

  return (
    <section className="coaches-page">
      <div className="d-flex align-items-center justify-content-between mb-5 gap-5 flex-wrap">
        <AddBtn
          title={t("add_coach")}
          modalBtnTitle={t("save")}
          modalTitle={t("add_new_coach")}
        />
        <Search placeholder={t("search_about_coach")} />
      </div>

      <div className="d-flex align-items-center mb-5 border-bottom">
        <Link
          to={{
            pathname: "",
            search: "?type=food",
          }}
          className={`d-flex gap-3 pb-4 px-4 program-type align-items-center ${
            coachType === "food" ? "active" : ""
          }`}
        >
          <img
            src="/assets/images/food-program.svg"
            alt="food"
            className="img-fluid"
          />
          <span>{t("food_program")}</span>
        </Link>
        <Link
          to={{
            pathname: "",
            search: "?type=sport",
          }}
          className={`d-flex gap-3 pb-4 px-4 program-type align-items-center ${
            coachType === "sport" ? "active" : ""
          }`}
        >
          <img
            src="/assets/images/sporting-program.svg"
            alt="food"
            className="img-fluid"
          />
          <span>{t("sporting_program")}</span>
        </Link>
      </div>
      <Table2
        data={coachesData}
        columns={coaches_columns}
        isLoading={isLoading}
        selection
      />

      <Pagination
        page={meta?.page}
        total={meta?.pageCount}
        hasPreviousPage={meta?.hasPreviousPage}
        hasNextPage={meta?.hasNextPage}
      />

      <Modal edit={<Edit />} add={<Add />} />
    </section>
  );
}
