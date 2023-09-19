import { BlogItem } from "../components";

export const blogs_columns = [
  {
    Header: "blog_item",
    accessor: (col) => <BlogItem {...col} />,
  },
];
