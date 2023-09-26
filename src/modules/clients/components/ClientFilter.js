import React from "react";

import { useTranslation } from "react-i18next";

import { Link, useSearchParams } from "react-router-dom";

const filters = [
  {
    type: "nutrition",
    title: "food",
    image: "food-program.svg",
  },
  {
    type: "sports",
    title: "sport",
    image: "sporting-program.svg",
  },
  {
    type: "reports",
    title: "reports",
    image: "sporting-program.svg",
  },
  {
    type: "updates",
    title: "updates",
    image: "sporting-program.svg",
  },
];

export default function ClientFilter() {
  const { t } = useTranslation("common");

  const [searchParams, setSearchParams] = useSearchParams();

  const programType = searchParams.get("program_type");

  return (
    <div className="d-flex align-items-center mb-5 border-bottom overflow-auto">
      {filters.map((item, index) => (
        <Link
          key={index}
          to={{
            pathname: "",
            search: `?program_type=${item.type}`,
          }}
          className={`d-flex gap-3 pb-4 px-4 program-type align-items-center ${
            programType === item.type || (index === 0 && !programType)
              ? "active"
              : ""
          }`}
        >
          <img
            src={`/assets/images/${item.image}`}
            alt="food"
            className="img-fluid"
          />
          <span>{t(item.title)}</span>
        </Link>
      ))}
    </div>
  );
}
