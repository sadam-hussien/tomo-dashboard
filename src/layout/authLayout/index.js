import React from "react";

import { Row, Col } from "react-bootstrap";

export default function Layout({ children }) {
  return (
    <main className="auth-page g-0">
      <Row className="">
        <Col className="col-12 col-md-6 col-lg-7 d-flex align-items-center">
          <div className="auth-layout-content flex-fill">{children}</div>
        </Col>
        <Col className="col-12 col-md-6 col-lg-5 order-first order-md-last">
          <div className="auth-layout d-flex flex-column justify-content-between align-items-end">
            <img
              src="/assets/images/logo.svg"
              alt="tomo logo"
              className="img-fluid me-auto"
            />

            <div className="auth-layout__desc d-flex flex-column align-items-end gap-4">
              <img
                src="/assets/images/qoutes.svg"
                alt="qoutes"
                className="img-fluid"
              />
              <h1 className="auth-layout__title text-center mb-0">
                "أنجز كل شيء بسهولة مع <br />
                تومو!"
              </h1>
            </div>
          </div>
        </Col>
      </Row>
    </main>
  );
}
