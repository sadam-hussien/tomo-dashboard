import { SubscriptItem } from "../components";

export const subscription_columns = [
  {
    Header: "subscript_item",
    accessor: (col) => <SubscriptItem {...col} />,
  },
];
