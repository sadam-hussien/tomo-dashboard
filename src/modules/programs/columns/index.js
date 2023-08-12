export const programs_columns = [
  {
    Header: "program_name",
    accessor: "name",
  },
  {
    Header: "creation_data",
    accessor: (data)=>{
        const date = new Date(data.createdAt);
        const formattedDate = date.toLocaleDateString();
        return formattedDate;
    },
  },
  {
    Header: "edit_date",
    accessor: `created`,
  },
  {
    Header: "usage_number",
    accessor: "number_of_users",
  },
];

