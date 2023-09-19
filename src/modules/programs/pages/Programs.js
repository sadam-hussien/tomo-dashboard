import {
  AddBtn,
  Btn,
  Filter,
  MessageBtn,
  Modal,
  Pagination,
  Search,
  Table,
  Table2,
  alertConfirmation,
} from "components";

import { useFetch, usePost } from "hooks";

import { apiGetPrograms, apiDeleteProgram } from "../server";

import { programs_columns } from "../columns";

import { useTranslation } from "react-i18next";

import { Add, Edit, ProgramToUser, ChooosePrograms } from "../components";

import { modalTypes } from "constants";

import { useDispatch } from "react-redux";

import { openModal } from "store/global";

import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";

export default function Programs() {
  // translation
  const { t } = useTranslation("common");

  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();

  const programType = searchParams.get("programType");

  const searchParam = searchParams.get("search");

  const pageParam = searchParams.get("page");

  // fetch users using react-query library
  const { isLoading, data } = useFetch({
    queryKey: ["get-programs", programType, pageParam, searchParam],
    queryFn: () =>
      apiGetPrograms({
        programType: programType,
        page: pageParam,
        search: searchParam,
      }),
  });

  const programsData = data?.data?.programs;

  const meta = data?.data?.meta;

  // delete one program
  const { mutate } = usePost({
    queryFn: apiDeleteProgram,
    queryKey: "get-programs",
  });

  const [selectedPrograms, setSelectedPrograms] = useState([]);

  return (
    <section className="programs-page">
      <div className="d-flex align-items-center justify-content-between mb-5 gap-5 flex-wrap">
        <AddBtn
          title={t("add_program")}
          modalBtnTitle={t("save")}
          modalTitle={t("add_new_program")}
        />
        <Search placeholder={t("search_about_program")} />
      </div>

      <div className="d-flex align-items-center justify-content-between mb-4 gap-5 flex-wrap">
        <Filter
          placeholder={t("program_type")}
          selectActionProps={{
            id: "program-filter",
            name: "program_type",
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
          }}
        />

        <Btn
          classes="transparent programs-send-program"
          type="button"
          onClick={() =>
            dispatch(
              openModal({
                modal_type: modalTypes.message,
                title: t("send_program"),
                btnTitle: t("choose_client"),
                data: selectedPrograms,
              })
            )
          }
          style={{
            minWidth: "159px",
            height: "48px",
          }}
        >
          <img
            src="/assets/images/message-icon.svg"
            alt="message"
            className="img-fluid"
          />
          <span>{t("send_program")}</span>
        </Btn>
      </div>

      <div className="d-flex align-items-center mb-5 border-bottom">
        <Link
          to={{
            pathname: "",
            search: "?programType=nutrition",
          }}
          className={`d-flex gap-3 pb-4 px-4 program-type align-items-center ${
            programType === "nutrition" || !programType ? "active" : ""
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
            search: "?programType=sports",
          }}
          className={`d-flex gap-3 pb-4 px-4 program-type align-items-center ${
            programType === "sports" ? "active" : ""
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
        data={programsData}
        columns={programs_columns}
        isLoading={isLoading}
        selection
        dispatchSelectedRows={setSelectedPrograms}
      />

      <Pagination
        page={meta?.page}
        total={meta?.pageCount}
        hasPreviousPage={meta?.hasPreviousPage}
        hasNextPage={meta?.hasNextPage}
      />

      <Modal edit={<Edit />} add={<Add />} message={<ProgramToUser />}>
        <ChooosePrograms />
      </Modal>
    </section>
  );
}
