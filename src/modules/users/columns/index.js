import { DynamicStatus } from "components";

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
    accessor: (col) => (
      <DynamicStatus
        status={
          col.status
            ? { en: "active", ar: "نشط", img: "active-icon.svg" }
            : { en: "inactive", ar: "غير نشط", img: "pending-icon.svg" }
        }
      />
    ),
  },
];
