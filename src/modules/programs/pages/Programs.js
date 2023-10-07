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
  Tabs,
  alertConfirmation,
} from "components";

import { useFetch, usePost } from "hooks";

import { apiGetPrograms, apiDeleteProgram } from "../server";

import { programs_columns } from "../columns";

import { useTranslation } from "react-i18next";

import { Add, Edit, ProgramToUser, ChooosePrograms } from "../components";

import { modalTypes } from "constants";

import { useDispatch, useSelector } from "react-redux";

import { openModal } from "store/global";

import { Link, useSearchParams } from "react-router-dom";

import { useState } from "react";

import { programTypes } from "constants";

const tabsData = [
  {
    title: "food_program",
    path: `?program_type=${programTypes.nutrition}`,
    id: programTypes.nutrition,
    image: "/assets/images/food-program.svg",
  },
  {
    title: "sporting_program",
    path: `?program_type=${programTypes.sports}`,
    id: programTypes.sports,
    image: "/assets/images/sporting-program.svg",
  },
];

export default function Programs() {
  // translation
  const { t } = useTranslation("common");

  const dispatch = useDispatch();

  const { modal } = useSelector((state) => state.global);

  const [searchParams] = useSearchParams();

  const programType = searchParams.get("program_type");

  const searchParam = searchParams.get("search");

  const pageParam = searchParams.get("page");

  // fetch users using react-query library
  const { isLoading, data } = useFetch({
    queryKey: ["get-programs", programType, pageParam, searchParam],
    queryFn: () =>
      apiGetPrograms({
        program_type: programType,
        page: pageParam,
        search: searchParam,
      }),
    options: {
      enabled: !modal.isShow,
    },
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

      <div className="mb-5">
        <Tabs
          data={tabsData}
          active={programType}
          itemClassName="d-flex gap-3 pb-4 px-4 align-items-center"
          element={(item, index) => (
            <>
              <img src={item.image} alt={item.id} className="img-fluid" />
              <span>{t(item.title)}</span>
            </>
          )}
        />
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
