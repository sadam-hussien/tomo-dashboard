
import { ImageAndName } from "components";
import { Link } from "react-router-dom";

export const coaches_columns = [
  // {
  //   Header: "count",
  //   accessor: (col, index) => index + 1,
  // },
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
    accessor: (col) => 10,
  },

  {
    Header: "average_renewal",
    accessor: "rate",
  },
  {
    Header: "total_income",
    accessor: (col) => 3000 + "ج",
  },
  {
    Header: "total_profit",
    accessor: (col) => 2000 + "ج",
  },
];
