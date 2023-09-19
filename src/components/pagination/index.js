import { useState } from "react";

import { Form } from "react-bootstrap";

import { useSearchParams } from "react-router-dom";

import Select from "react-select";

export default function Pagination({
  page,
  total,
  hasPreviousPage,
  hasNextPage,
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  // const [selectedPage, setSelectedPage] = useState(searchParams.get("page"));

  // fill the array with number of pages
  const arrayOfPages = Array.from({ length: total }, (_, index) => index + 1);

  const options = arrayOfPages.map((item) => ({ label: item, value: item }));

  return (
    <div className="d-flex justify-content-between align-items-center gap-4 border-top pagination-container">
      <div className="d-flex align-items-center gap-4">
        <div className="d-flex align-items-center gap-2">
          <button
            type="button"
            disabled={!hasNextPage}
            onClick={() => setSearchParams({ page: page + 1 })}
            className="pagination-btn"
          >
            <i className="las la-angle-right"></i>
          </button>

          <button
            type="button"
            disabled={!hasPreviousPage}
            onClick={() => setSearchParams({ page: page - 1 })}
            className="pagination-btn"
          >
            <i className="las la-angle-left"></i>
          </button>
        </div>
        <div className="d-flex align-items-center gap-2">
          <h6 className="white-space-nowrap m-0 pagination-text">
            of {total} pages
          </h6>

          <Select
            className="pagination-select"
            classNamePrefix="select"
            options={options}
            onChange={(option) => {
              setSearchParams({ page: option.value });
            }}
            value={options.find((item) => item.value === page)}
          />
        </div>
      </div>
    </div>
  );
}
