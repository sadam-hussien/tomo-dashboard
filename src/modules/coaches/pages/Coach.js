import {
  DateInput,
  DynamicFileUploaderInput,
  InputsHandler,
  Modal,
  SwitchInput,
  Table,
  Table2,
  alertConfirmation,
} from "components";

import { useFetch, usePost } from "hooks";

import {
  apiGetCoaches,
  apiDeleteCoache,
  apiGetPrograms,
  apiGetSingleCoache,
} from "../server";

import { coach_columns, coaches_columns } from "../columns";

import { useTranslation } from "react-i18next";

import { Link, useParams, useSearchParams } from "react-router-dom";

import LeftSide from "../components/LeftSide";

import DatePicker from "../components/DatePicker";

import { useRef, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";

export default function Coach() {
  // translation
  const { t } = useTranslation("common");

  const { id } = useParams();

  const { data, isLoading } = useFetch({
    queryKey: ["get-coach" + id, id],
    queryFn: () => apiGetSingleCoache({ id }),
  });

  const coachData = data?.data?.coach;

  return (
    <section className="single-coach-page">
      {isLoading ? (
        <div className="d-flex justify-content-center mt-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : coachData ? (
        <Row>
          <Col lg={9}>
            <div className="boxed">
              <div className="d-flex align-items-center justify-content-between single-coach-header">
                <h4 className="single-coach-name">{coachData?.name}</h4>
                <Link
                  className="d-flex align-items-center gap-2 single-coach-name-back"
                  to="/coaches"
                >
                  {t("coaches")}
                  <i className="las la-angle-left"></i>
                </Link>
              </div>

              <div className="single-coach-table">
                <Table2
                  data={[
                    ...coachData.users,
                    {
                      total: true,
                    },
                  ]}
                  columns={coach_columns}
                  isLoading={isLoading}
                  filter={true}
                />
              </div>
            </div>
          </Col>
          <Col lg={3}>
            <div className="boxed">
              <div className="single-coach-profile">
                <div className="d-flex justify-content-center">
                  <img
                    src={coachData.image}
                    alt=""
                    className="img-fluid single-coach-profile-avatar"
                  />
                </div>

                <h6 className="single-coach-profile-name text-center">
                  {coachData.name}
                </h6>
                <div className="d-flex align-items-center justify-content-center gap-2 single-coach-profile-status">
                  {coachData.status ? (
                    <>
                      <img
                        src="/assets/images/active-icon.svg"
                        alt=""
                        className="img-fluid"
                      />
                      <span>نشط</span>
                    </>
                  ) : (
                    <>
                      <img
                        src="/assets/images/terminate-icon.svg"
                        alt=""
                        className="img-fluid"
                      />
                      <span>غير نشط</span>
                    </>
                  )}
                </div>
                {/* section  */}
                <div className="single-coach-profile-box">
                  <h6 className="single-coach-profile-box-title">التخصص</h6>
                  <p className="single-coach-profile-box-desc mb-0">
                    {coachData.type === "sport" ? "مدرب رياضة" : "اخصائي تغذية"}
                  </p>
                </div>
                {/* // *******  */}

                {/* section  */}
                <div className="single-coach-profile-box">
                  <h6 className="single-coach-profile-box-title">
                    المؤهلات الدراسية
                  </h6>
                  <p className="single-coach-profile-box-desc mb-0">
                    {coachData.certification}
                  </p>

                  <ul className="list-unstyled p-0 d-flex align-items-ceneter flex-wrap single-coach-profile-box-images gap-2 ">
                    {coachData.images.map((image, index) => (
                      <li key={index}>
                        <img src={image} alt="" className="img-fluid" />
                      </li>
                    ))}
                  </ul>
                </div>
                {/* // *******  */}

                {/* section  */}
                <div className="single-coach-profile-box">
                  <h6 className="single-coach-profile-box-title">
                    الخبرات المھنية
                  </h6>
                  <p className="single-coach-profile-box-desc mb-0">
                    {coachData.experience}
                  </p>
                </div>
                {/* // *******  */}

                {/* section  */}
                <div className="single-coach-profile-box last">
                  <h6 className="single-coach-profile-box-title">
                    بيانات التواصل
                  </h6>
                  <div className="d-flex align-items-center gap-4 single-coach-profile-box-contacts">
                    <div className="single-coach-profile-box-contacts-img d-flex align-items-center justify-content-center ">
                      <img
                        src="/assets/images/phone-icon.svg"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                    <div>
                      <h6 className="single-coach-profile-box-contacts-title">
                        رقم الهاتف
                      </h6>
                      <h6 className="single-coach-profile-box-contacts-response mb-0">
                        +20 0118254915
                      </h6>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-4 single-coach-profile-box-contacts">
                    <div className="single-coach-profile-box-contacts-img d-flex align-items-center justify-content-center ">
                      <img
                        src="/assets/images/id-icon.svg"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                    <div>
                      <h6 className="single-coach-profile-box-contacts-title">
                        رقم البطاقة{" "}
                      </h6>
                      <h6 className="single-coach-profile-box-contacts-response mb-0">
                        299247982678920189{" "}
                      </h6>
                    </div>
                  </div>
                </div>
                {/* // *******  */}
              </div>
            </div>
          </Col>
        </Row>
      ) : null}
    </section>
  );
}
