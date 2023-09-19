import { AddBtn, Modal, Pagination, Search, Table2 } from "components";

import { useFetch } from "hooks";

import { apiGetBlogs } from "../server";

import { blogs_columns } from "../columns";

import { useTranslation } from "react-i18next";

import { Add, Edit } from "../components";
import { useSearchParams } from "react-router-dom";

export default function Blogs() {
  // translation
  const { t } = useTranslation("common");

  const [searchParams] = useSearchParams();

  const searchParam = searchParams.get("search");

  const pageParam = searchParams.get("page");

  // fetch users using react-query library
  const { isLoading, data } = useFetch({
    queryKey: ["get-blogs", searchParam, pageParam],
    queryFn: () => apiGetBlogs({ search: searchParam, page: pageParam }),
  });

  const blogsData = data?.data?.blogs;

  const meta = data?.data?.meta || data?.data?.pageMetaDto;

  return (
    <section className="news-page">
      <div className="d-flex align-items-center justify-content-between mb-5 gap-5 flex-wrap">
        <AddBtn
          title={t("add_new_blog")}
          modalBtnTitle={t("save")}
          modalTitle={t("add_new_blog")}
        />
        <Search placeholder={t("search_about_blog")} />
      </div>

      <Table2
        data={blogsData}
        columns={blogs_columns}
        isLoading={isLoading}
        grid={{
          rows: {
            xl: 4,
            lg: 3,
            md: 2,
            xs: 1,
            className: "g-5",
          },
        }}
      />

      <Pagination
        page={meta?.page}
        total={meta?.pageCount}
        hasPreviousPage={meta?.hasPreviousPage}
        hasNextPage={meta?.hasNextPage}
      />

      <Modal edit={<Edit />} add={<Add />} />
    </section>
  );
}
