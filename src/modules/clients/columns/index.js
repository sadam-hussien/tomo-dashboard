import { ImageAndName, Status } from "components";

import { Link } from "react-router-dom";

import { MealCheck, SendMessage } from "../components";

import { handleDate } from "helpers";

export const clients_columns = [
  {
    Header: "user_name",
    accessor: (col) => (
      <Link to={col.user.id}>
        <ImageAndName img={col.user?.profile?.avatar} title={col.user?.name} />
      </Link>
    ),
  },
  {
    Header: "quota",
    accessor: (col) =>(
      col.user?.profile?.plan.name ? col.user?.profile?.plan.name : "لو كارب"
    ),
  },
  {
    Header: "register_date",
    accessor: (col) => "5/12/2020",
  },
  {
    Header: "subscription_data",
    accessor: (col) => {
      const date = isNaN(new Date(col.user?.profile?.plan.createdAt)) ? new Date() : new Date(col.user?.profile?.plan.createdAt)
      return date?.getDay() + '/' + (date?.getMonth()+1) + '/' + date?.getFullYear()
    },
  },
  {
    Header: "subscription_expire_date",
    accessor: (col) => "2/3/2023",
  },
  {
    Header: "current_nutritionist",
    accessor: (col) => "مي",
  },
  {
    Header: "current_coach",
    accessor: (col) => "نور",
  },
  {
    Header: "subscription_status",
    accessor: (col) => <Status status={"نشط"} />,
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
]