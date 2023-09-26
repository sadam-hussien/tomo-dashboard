import { handleDate } from "helpers";

import { usePost } from "hooks";

import React from "react";

import { apiDeleteReport } from "../server";
import { Spinner } from "react-bootstrap";

const Reports = ({ reports }) => {
  return (
    <div>
      {reports.length > 0 &&
        reports.map((report) => <ReportItem report={report} key={report.id} />)}
    </div>
  );
};

export default Reports;

function ReportItem({ report }) {
  const { mutate, isLoading } = usePost({
    queryKey: "get-sinle-client",
    queryFn: apiDeleteReport,
  });

  function getExtension(url) {
    const arr = url.split(".");

    return arr[arr.length - 1];
  }
  return (
    <div
      className="d-flex align-items-center justify-content-between"
      style={{
        background: "var(--light-bg)",
        marginTop: "20px",
        padding: "15px",
        flexWrap: "wrap",
        borderRadius: "10px",
      }}
    >
      <div className="d-flex align-items-center gap-4">
        <img src="/assets/images/file.svg" alt="" className="img-fluid" />
        <div>
          <h6 style={{ whiteSpace: "nowrap" }}>
            تقرير شهر
            {new Date(report.createdAt).getMonth() + 1}.
            {getExtension(report.pdf)}
          </h6>
          <small style={{ whiteSpace: "pre-wrap" }}>
            {handleDate(report.createdAt)}
          </small>
        </div>
      </div>

      <div style={{ display: "flex", gap: "45px" }}>
        <a
          href={report.pdf}
          className="text-center"
          target="_blank"
          style={{
            color: "#29384E",
          }}
        >
          <i
            style={{ fontSize: "1.4rem" }}
            className="las la-cloud-download-alt"
          ></i>
          <h6 className="mb-0">تحميل</h6>
        </a>
        <button
          type="button"
          className="border-0 bg-transparent"
          style={{ textAlign: "center", color: "var(--secondary)" }}
          onClick={() => mutate(report.id)}
        >
          {isLoading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            <>
              <i style={{ fontSize: "1.4rem" }} className="las la-trash"></i>
              <h6 className="mb-0">حذف</h6>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
