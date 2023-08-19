import {
  AddBtn,
  Btn,
  Filter,
  MessageBtn,
  Modal,
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

export default function Programs() {
  // translation
  const { t } = useTranslation("common");

  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const programType = searchParams.get("program_type");

  // fetch users using react-query library
  const { isLoading, data } = useFetch({
    queryKey: ["get-programs", programType],
    queryFn: () =>
      apiGetPrograms({
        program_type: programType,
      }),
  });
    

  // delete one program
  const { mutate } = usePost({
    queryFn: apiDeleteProgram,
    queryKey: "get-programs",
  });

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
          classes="transparent"
          type="button"
          onClick={() =>
            dispatch(
              openModal({
                title: t("send_program"),
                btnTitle: t("choose_clienr"),
                // data: data?.data,
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
            search: "?program_type=food",
          }}
          className={`d-flex gap-3 pb-4 px-4 program-type align-items-center ${
            programType === "food" || programType === "" ? "active" : ""
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
            search: "?program_type=sporting",
          }}
          className={`d-flex gap-3 pb-4 px-4 program-type align-items-center ${
            programType === "sporting" ? "active" : ""
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
        data={data?.data}
        columns={programs_columns(mutate)}
        isLoading={isLoading}
        selection
      />

      <Modal edit={<Edit />} add={<Add />} message={<ProgramToUser />}>
        <ChooosePrograms />
      </Modal>
    </section>
  );
}
