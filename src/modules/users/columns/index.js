import { DynamicStatus, Status } from "components";

import { Actions } from "../pages/Users";

export const users_columns = [
  {
    Header: "user_user_name",
    accessor: "name",
  },
  {
    Header: "email",
    accessor: "email",
  },
  {
    Header: "permission",
    accessor: "role",
  },
  {
    Header: "status",
    accessor: (col) => <Status status={col.status ? "نشط" : "انتهى"} />,
  },
  {
    Header: "actions",
    accessor: (col) => <Actions col={col} />,
  },
];
