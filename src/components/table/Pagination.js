import React from "react";

import { Pagination } from "react-bootstrap";

export default function Paginations({ options }) {
  return (
    <div className="table-pagination d-flex justify-content-between align-items-center">
      <h6 className="info text-capitalize">
        showing {options.pageIndex + 1} of {options.pageCount} entries
      </h6>
      <Pagination>
        <Pagination.Prev onClick={() => options.previousPage()}>
          <i className="las la-angle-left"></i>
        </Pagination.Prev>
        {options.pageOptions.map((item) => (
          <Pagination.Item
            key={item}
            active={options.pageIndex === item}
            onClick={() => options.gotoPage(item)}
            className={`${
              options.pageOptions.length < 2 ? "rounded-circle" : ""
            }`}
          >
            {item + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => options.nextPage()}>
          <i className="las la-angle-right"></i>
        </Pagination.Next>
      </Pagination>
    </div>
  );
}
