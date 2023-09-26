import { ImageAndName, Status } from "components";

import { Link } from "react-router-dom";

import { MealCheck, SendMessage } from "../components";

import { handleDate } from "helpers";

export const clients_columns = [
  {
    Header: "user_name",
    accessor: (col) => (
      <Link to={col?.id}>
        <ImageAndName img={col?.user?.profile?.avatar} title={col?.name} />
      </Link>
    ),
  },
  {
    Header: "quota",
    accessor: (col) => col?.profile?.plan.name,
  },
  {
    Header: "register_date",
    accessor: (col) => new Date(col.createdAt).toLocaleString(),
  },
  {
    Header: "subscription_data",
    accessor: (col) => new Date().toLocaleString(),
  },
  {
    Header: "subscription_expire_date",
    accessor: (col) => new Date().toLocaleString(),
  },
  {
    Header: "current_nutritionist",
    accessor: (col) => col.foodCoach,
  },
  {
    Header: "current_coach",
    accessor: (col) => col.sportCoach,
  },
  {
    Header: "subscription_status",
    accessor: (col) => <Status status={col.payment ? "نشط" : "انتهى"} />,
  },
  {
    Header: "actions",
    accessor: (col) => <SendMessage data={col} />,
  },
];

export const client_trainings_columns = [
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

export const client_trainings = [
  {
    Header: "days",
    accessor: (col, index) => "اليوم " + (index + 1),
  },
];
