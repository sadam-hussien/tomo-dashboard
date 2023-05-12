export const coaches_columns = [
  {
    Header: "count",
    accessor: (col, index) => index + 1,
  },
  {
    Header: "coach_name",
    accessor: "name",
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
    Header: "pending_users",
    accessor: (col) => 25,
  },
  {
    Header: "average_renewal",
    accessor: (col) => 30 + "%",
  },
];
