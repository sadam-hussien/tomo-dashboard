import { ImageAndName, Status } from "components";

import { Link } from "react-router-dom";

import { MealCheck } from "../components";

import { handleDate } from "helpers";

export const users_columns = [
  {
    Header: "user_name",
    accessor: (col) => (
      <Link to={col.user.id}>
        <ImageAndName img={col.user?.profile?.avatar} title={col.user?.name} />
      </Link>
    ),
  },
  {
    Header: "used_program",
    accessor: (col) => "لوكارب",
  },
  {
    Header: "subscription_period",
    accessor: (col) => 30,
  },
  {
    Header: "subscription_type",
    accessor: (col) => <Status status={"نشط"} />,
  },
];

export const user_trainings_columns = [
  {
    Header: "days",
    accessor: (col, index) => "اليوم " + (index + 1),
  },
  {
    Header: "breackfast",
    accessor: (col) => (
      <MealCheck title={col.name} checked={col.isCompleted} {...col} />
    ),
  },
  {
    Header: "launch",
    accessor: (col) => (
      <MealCheck title={col.name} checked={col.isCompleted} {...col} />
    ),
  },
  {
    Header: "dinner",
    accessor: (col) => (
      <MealCheck title={col.name} checked={col.isCompleted} {...col} />
    ),
  },

  {
    Header: "date",
    accessor: (col) => handleDate(col.createdAt),
  },
];
