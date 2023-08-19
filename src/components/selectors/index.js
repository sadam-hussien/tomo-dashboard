import { useTranslation } from "react-i18next";

const { Link } = require("react-router-dom");

export default function Selector({programType}){

    const { t } = useTranslation("common");

    return(
    <div className="d-flex align-items-center mb-2">
        <Link
          to={{
            pathname: "",
            search: "?program_type=food",
          }}
          style={{borderLeft:"1px solid gray"}}
          className={`d-flex gap-3 px-4 coach-type align-items-center ${
            programType === "food" || programType === "" ? "active" : ""
          }`}
        >
          <img
            src="/assets/images/food-program.svg"
            alt="food"
            className="img-fluid"
          />
          <span>{t("food_coach")}</span>
        </Link>
        <div className="seperator"></div>
        <Link
          to={{
            pathname: "",
            search: "?program_type=sporting",
          }}
          className={`d-flex gap-3 px-4 coach-type align-items-center ${
            programType === "sporting" ? "active" : ""
          }`}
        >
          <img
            src="/assets/images/sporting-program.svg"
            alt="food"
            className="img-fluid"
          />
          <span>{t("sporting_coach")}</span>
        </Link>
      </div>
      );
}
