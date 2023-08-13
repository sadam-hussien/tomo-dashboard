import { DefaultActions, alertConfirmation } from "components";

export const programs_columns = (mutate) => [
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
      <DefaultActions
        data={col}
        edit={{
          title: "edit_program",
          btnTitle: "save",
        }}
        remove={{
          removeFn: () =>
            alertConfirmation({ mutate, id: col.id, confirmTitle: "yes_sure" }),
        }}
        message={{
          title: "send_program",
          btnTitle: "send",
        }}
      />
    ),
  },
];
