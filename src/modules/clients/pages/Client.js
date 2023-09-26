import { useFetch } from "hooks";

import { Link, useParams, useSearchParams } from "react-router-dom";

import { apiGetUserById } from "../server";

import { Col, Row, Spinner } from "react-bootstrap";

import { useTranslation } from "react-i18next";

import {
  ClientFilter,
  Meals,
  Workout,
  Reports,
  Updates,
  SubscriptionInfo,
  ViewWeight,
  Measure,
  Progress,
} from "../components";

import { Modal } from "components";

import { useDispatch } from "react-redux";

import { openModal } from "store/global";

import { modalTypes } from "constants";

export default function Client() {
  const { t } = useTranslation("common");

  const { id } = useParams();

  const [searchParams] = useSearchParams();

  const programType = searchParams.get("program_type");

  const { data, isLoading } = useFetch({
    queryKey: ["get-sinle-client", id],
    queryFn: () => apiGetUserById(id),
  });

  const clientData = data?.data?.user;

  const dispatch = useDispatch();

  return (
    <section className="single-client-page">
      <Row>
        <Col lg={9}>
          <div className="boxed">
            <div className="d-flex align-items-center justify-content-between single-coach-header">
              <h4 className="single-coach-name">تقرير اليوم</h4>
              <Link
                className="d-flex align-items-center gap-2 single-coach-name-back"
                to="/clients"
              >
                {t("clients")}
                <i className="las la-angle-left"></i>
              </Link>
            </div>

            <ClientFilter />

            {isLoading ? (
              <div className="d-flex justify-content-center mt-5">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : clientData ? (
              <>
                {programType === "nutrition" || !programType ? (
                  <Meals programs={clientData.programs} />
                ) : programType === "sports" ? (
                  <Workout programs={clientData.programs} />
                ) : programType === "reports" ? (
                  <Reports reports={clientData.pdf} />
                ) : (
                  <Updates />
                )}
              </>
            ) : null}
          </div>
        </Col>
        <Col lg={3}>
          <div className="boxed">
            {isLoading ? (
              <div className="d-flex justify-content-center mt-5">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : clientData ? (
              <div className="single-coach-profile">
                <div className="d-flex justify-content-center">
                  <img
                    src={clientData.profile?.avatar}
                    alt=""
                    className="img-fluid single-coach-profile-avatar"
                  />
                </div>

                <h6 className="single-coach-profile-name text-center">
                  {clientData.name}
                </h6>
                <div className="d-flex align-items-center justify-content-center gap-2 single-coach-profile-status">
                  {clientData.status ? (
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
                <div className="single-coach-profile-box d-flex align-items-center flex-wrap gap-3">
                  {/* <h6 className="single-coach-profile-box-title">التخصص</h6> */}
                  <p className="single-coach-profile-box-desc d-flex align-items-center gap-1 mb-0">
                    {clientData.position}
                    <span>نقطة</span>
                  </p>

                  <p className="single-coach-profile-box-desc d-flex align-items-center gap-1 mb-0">
                    <span>صوم</span>
                    {clientData.fasting}
                  </p>

                  <p className="single-coach-profile-box-desc d-flex align-items-center gap-1 mb-0">
                    <span>السن:</span>
                    {clientData.profile?.age}
                  </p>

                  <p className="single-coach-profile-box-desc d-flex align-items-center gap-1 mb-0">
                    <span>الطول:</span>
                    {clientData.profile?.height}
                  </p>
                </div>
                {/* // *******  */}

                {/* section  */}
                <div className="single-coach-profile-box">
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
                        {clientData.phone}
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
                        البريد الالكترونى
                      </h6>
                      <h6 className="single-coach-profile-box-contacts-response mb-0">
                        {clientData.email}
                      </h6>
                    </div>
                  </div>
                </div>
                {/* // *******  */}

                <div className="single-coach-profile-box border-bottom-0">
                  <div className="d-flex align-items-end justify-content-between">
                    <img src="/assets/images/bullseye.svg" alt="" />
                    <img src="/assets/images/flagstart.svg" alt="" />
                  </div>

                  <div className="single-client-progress position-relative">
                    <div
                      className="single-client-progress-bar"
                      style={{
                        width: +clientData.profile?.weight + "%",
                      }}
                    >
                      {clientData.profile?.weight > 0 && (
                        <span>{clientData.profile?.weight}kg</span>
                      )}
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between single-client-progress-values">
                    <span>110kg</span>
                    <span>85kg</span>
                  </div>
                </div>

                <div className="single-coach-profile-box">
                  <button
                    className="bg-transparent border-0 m-0 p-0 d-flex gap-2 align-items-center"
                    type="button"
                    onClick={() =>
                      dispatch(
                        openModal({
                          modal_type: modalTypes.view,
                          title: t("weights"),
                          ...clientData,
                        })
                      )
                    }
                  >
                    الاوزان السابقة
                    <img
                      src="/assets/images/details-icon.svg"
                      alt="details"
                      className="img-fluid"
                    />
                  </button>
                </div>

                <div className="single-coach-profile-box">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                    }}
                  >
                    <div
                      onClick={() =>
                        dispatch(
                          openModal({
                            modal_type: modalTypes.measure,
                            title: t("subscription1_info"),
                            ...clientData,
                          })
                        )
                      }
                      style={{
                        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                        textAlign: "center",
                        borderRadius: "10px",
                        padding: "25px 40px",
                        cursor: "pointer",
                      }}
                    >
                      <i
                        style={{ fontSize: "2rem", color: "#FF725E" }}
                        className="las la-chalkboard"
                      ></i>
                      <p>القياسات</p>
                    </div>
                    <div
                      onClick={() =>
                        dispatch(
                          openModal({
                            modal_type: modalTypes.info,
                            title: t("subscription_info"),
                            ...clientData,
                          })
                        )
                      }
                      style={{
                        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                        textAlign: "center",
                        borderRadius: "10px",
                        padding: "25px 25px",
                        cursor: "pointer",
                      }}
                    >
                      <i
                        style={{ fontSize: "2rem", color: "#097D4F" }}
                        className="lar la-question-circle"
                      ></i>
                      <p>معلومات الاشتراك</p>
                    </div>
                  </div>
                </div>

                <div className="single-coach-profile-box last d-flex flex-wrap gap-4 justify-content-center">
                  <Progress
                    image="fork.svg"
                    title="ساعه صوم"
                    value={clientData.fasting.substring(0, 2)}
                  />
                  <Progress
                    image="fire.svg"
                    title="سعر"
                    value={clientData.profile?.calories}
                  />
                  <Progress
                    image="footprint.svg"
                    title="خطوة"
                    value={clientData.profile?.steps?.month}
                  />
                  <Progress
                    image="water.svg"
                    title="الشرب"
                    value={clientData.profile?.steps?.month}
                  />
                  <Progress
                    image="sleep.svg"
                    title="النوم"
                    value={clientData.profile?.steps?.month}
                  />
                </div>
              </div>
            ) : null}
          </div>
        </Col>
      </Row>

      <Modal
        info={<SubscriptionInfo />}
        view={<ViewWeight />}
        measure={<Measure />}
      ></Modal>
    </section>
  );
}
