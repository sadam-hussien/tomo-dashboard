import { ImageAndName } from "components";

import { Link } from "react-router-dom";

import { Actions } from "../pages/Coaches";

export const coaches_columns = [
  {
    Header: "coach_name",
    accessor: (col) => (
      <Link to={col.id}>
        <ImageAndName img={col?.image} title={col?.name} />
      </Link>
    ),
  },
  {
    Header: "users_count",
    accessor: "number_of_followers",
  },
  {
    Header: "active_users",
    accessor: "active_clients",
  },

  {
    Header: "average_renewal",
    accessor: "renew_number",
  },
  {
    Header: "total_income",
    accessor: "total_income",
  },
  {
    Header: "total_profit",
    accessor: "total_profit",
  },
  {
    Header: "actions",
    accessor: (col) => <Actions col={col} />,
  },
];

export const coach_columns = [
  {
    Header: "client_name",
    accessor: (col) =>
      col.total ? (
        "الاجمالى"
      ) : (
        <Link to={`/clients/${col.id}`}>
          <ImageAndName img={col?.profile?.avatar} title={col?.name} />
        </Link>
      ),
  },
  {
    Header: "coach_plan",
    accessor: (col) => "تحدي 90 يوم",
  },
  {
    Header: "coach_price",
    accessor: (col) => "4000 ريال",
    meta: {
      header: {
        style: {
          width: "180px",
          maxWidth: "180px",
          whiteSpace: "wrap",
        },
      },
      row: {
        style: {
          width: "180px",
          maxWidth: "180px",
        },
      },
    },
  },
  {
    Header: "coach_price_in_eg",
    accessor: (col) => "3600 ريال",
  },
  {
    Header: "coach_subscription",
    accessor: () => "2/3/2023",
  },
  {
    Header: "coach_subscription_end",
    accessor: (col) => "2/3/2023",
  },
  {
    Header: "coach_days",
    accessor: () => "60",
  },
  {
    Header: "coach_profit",
    accessor: () => "240 ج",
  },
];
