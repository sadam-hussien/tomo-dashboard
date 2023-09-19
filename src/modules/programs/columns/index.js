import { DefaultActions, alertConfirmation } from "components";

export const programs_columns = [
  {
    Header: "program_name",
    accessor: "name",
  },
  {
    Header: "subscription_number",
    accessor: (col) => 360,
  },
  {
    Header: "usage_number",
    accessor: (col) => 100,
  },
  {
    Header: "coaches",
    accessor: (col) => 200,
  },
  {
    Header: "sales",
    accessor: (col) => 1000,
  },
  {
    Header: "actions",
    accessor: (col) => (
      <DefaultActions data={col} edit message={{ title: "send_program" }} />
    ),
  },
];
