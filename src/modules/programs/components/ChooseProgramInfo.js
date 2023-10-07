import { useFormikContext } from "formik";

import { Tabs } from "components";
import { programTypes } from "constants";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { apiGetPrograms } from "../server";
import { useFetch } from "hooks";

const tabsData = [
  {
    title: "choose_food_program",
    path: `?program_type_assign=${programTypes.nutrition}`,
    id: programTypes.nutrition,
  },
  {
    title: "choose_sports_program",
    path: `?program_type_assign=${programTypes.sports}`,
    id: programTypes.sports,
  },
  {
    title: "choose_psychological_programme",
    path: `?program_type_assign=${programTypes.psychological}`,
    id: programTypes.psychological,
  },
  {
    title: "choose_supplements_programme",
    path: `?program_type_assign=${programTypes.supplements}`,
    id: programTypes.supplements,
  },
];

export default function ChooseProgramInfo({ programType, changeTab }) {
  const { t } = useTranslation("common");

  const { setFieldValue, values } = useFormikContext();

  const { data } = useFetch({
    queryKey: ["get-all-programs"],
    queryFn: () => apiGetPrograms(),
  });

  function getCheckedPrograms(type) {
    if (data?.data?.programs) {
      if (type) {
        return data.data.programs.filter(
          (item) =>
            values.programId.indexOf(item.id) > -1 && item.programType === type
        );
      }
      return data.data.programs.filter(
        (item) => values.programId.indexOf(item.id) > -1
      );
    }
    return [];
  }

  function removeSelectedProgram(id) {
    const programIdValues = values.programId.filter(
      (program) => program !== id
    );
    setFieldValue("programId", programIdValues);
  }

  return (
    <div className="choose-program-info">
      {values.programId.length > 0 ? (
        <div className="d-flex align-items-center flex-wrap gap-4 choose-program-info-categories">
          {getCheckedPrograms().map((item, index) => (
            <button
              key={"choose-program-" + index + item.id}
              type="button"
              className="d-flex align-items-center choose-program-info-category"
              onClick={() => removeSelectedProgram(item.id)}
            >
              <span>{item.name}</span>

              <i className="las la-times"></i>
            </button>
          ))}
        </div>
      ) : (
        <span className="choose-program-info-note">
          برجاء اختيار البرنامج المراد ارسالة للعميل
        </span>
      )}

      <Tabs
        data={tabsData}
        active={programType}
        element={(item, index) => (
          <span className="d-inline-flex align-items-center gap-2">
            {t(item.title)}
            {getCheckedPrograms(item.id).length > 0 && (
              <span className="choose-program-info-count">
                {getCheckedPrograms(item.id).length}
              </span>
            )}
          </span>
        )}
        className="justify-content-between"
        link={false}
        changeTab={changeTab}
      />

      {getCheckedPrograms().length > 0 && (
        <div className="count-of-programs">
          {getCheckedPrograms().length} تمارين
        </div>
      )}
    </div>
  );
}
