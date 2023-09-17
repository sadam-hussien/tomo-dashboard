import { NewsItem } from "../components";

export const news_columns = [
  {
    Header: "news_item",
    accessor: (col) => <NewsItem {...col} />,
  },
];
