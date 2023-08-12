import { Btn, SelectBox } from "components";

import { Form, Formik } from "formik";
import { apiGetAllPrograms } from "../server";
import { useFetch, usePost } from "hooks";
import { useTranslation } from "react-i18next";
import { apiAddUserToProgram } from "../server";

export default function AssignProgramToUser({ handleClose, data: itemData }) {
  const { t } = useTranslation("common");

  const { data } = useFetch({
    queryKey: "get-all-programs",
    queryFn: apiGetAllPrograms,
  });

  const { mutate, isLoading: isLoadingMutate } = usePost({
    queryFn: apiAddUserToProgram,
    onSuccess: () => {
      handleClose();
    },
  });

  function handleSubmit(values) {
    mutate(values);
  }

  const handleOtptions = data?.data?.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });

  return (
    <Formik
      initialValues={{
        programId: "",
        userId: itemData.data.id,
      }}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
          <SelectBox
            item={{
              id: "add-user-to-program",
              name: "programId",
              noBorder: true,
              options: handleOtptions,
            }}
            placeholder={t("choose_or_write_program")}
          />

          <div className="d-flex flex-column gap-3">
            <Btn
              type="submit"
              title={t("save")}
              loading={isLoadingMutate}
              style={{
                height: "48px",
                fontSize: "var(--font-size-md)",
                fontWeight: 500,
              }}
            />
            <Btn
              type="button"
              title={t("close")}
              onClick={handleClose}
              classes="transparent"
              style={{
                height: "48px",
                fontSize: "var(--font-size-md)",
                fontWeight: 500,
              }}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}
