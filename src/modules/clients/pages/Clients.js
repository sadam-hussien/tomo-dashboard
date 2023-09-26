import {
  Modal,
  Table,
  Message,
  Table2,
  Pagination,
  Search,
  Filter,
} from "components";

import { useFetch, usePost } from "hooks";

import { apiDeleteClient, apiGetUsers } from "../server";

import { clients_columns } from "../columns";

import { useTranslation } from "react-i18next";

import { Link, useSearchParams } from "react-router-dom";

export default function Clients() {
  // translation
  const { t } = useTranslation("common");

  const [searchParams] = useSearchParams();

  const clientsType = searchParams.get("type");

  const searchParam = searchParams.get("search");

  const pageParam = searchParams.get("page");

  // fetch users using react-query library
  const { isLoading, data } = useFetch({
    queryKey: ["get-clients", clientsType, pageParam, searchParam],
    queryFn: () =>
      apiGetUsers({
        type: clientsType,
        page: pageParam,
        search: searchParam,
      }),
  });

  const meta = data?.data?.leaders?.meta;

  const clientsData = data?.data?.leaders?.users;

  // delete one user
  const { mutate } = usePost({
    queryFn: apiDeleteClient,
    queryKey: "get-clients",
  });

  return (
    <section className="clients-page">
      <div className="d-flex align-items-center justify-content-between mb-5 gap-5 flex-wrap">
        <Filter
          placeholder={t("search_about_users")}
          selectActionProps={{
            id: "clients-filter",
            name: "clients_type",
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
          }}
        />
        <Search placeholder={t("search_about_users")} />
      </div>

      <div className="d-flex align-items-center mb-5 border-bottom">
        <Link
          to={{
            pathname: "",
            search: "?type=tomo",
          }}
          className={`d-flex gap-3 pb-4 px-4 program-type align-items-center ${
            clientsType === "tomo" ? "active" : ""
          }`}
        >
          <img
            src="/assets/images/food-program.svg"
            alt="tomo"
            className="img-fluid"
          />
          <span>{t("tomo_clients")}</span>
        </Link>
        <Link
          to={{
            pathname: "",
            search: "?type=",
          }}
          className={`d-flex gap-3 pb-4 px-4 program-type align-items-center ${
            clientsType === "" ? "active" : ""
          }`}
        >
          <img
            src="/assets/images/sporting-program.svg"
            alt="food"
            className="img-fluid"
          />
          <span>{t("training_clients")}</span>
        </Link>
      </div>

      <Table2
        data={clientsData}
        columns={clients_columns}
        isLoading={isLoading}
        selection
      />

      <Pagination
        page={meta?.page}
        total={meta?.pageCount}
        hasPreviousPage={meta?.hasPreviousPage}
        hasNextPage={meta?.hasNextPage}
      />

      <Modal message={<Message />} />
    </section>
  );
}
