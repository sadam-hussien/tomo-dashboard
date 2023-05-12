import { Btn, Modal } from "components";

import AddProgram from "modules/programs/components/Add";

// Images
// import Feast from "assets/images/dashboard/image.png";
// import BottomArrow from "assets/images/dashboard/bottom-arrow.png";
// import Ellipse from "";
// import DashFrame from "assets/images/dashboard/dashframe.png";
// import LightGreen from "assets/images/dashboard/light-green.png";
// import Trophy from "assets/images/dashboard/trophy.png";

import { modalTypes } from "constants";

import { openModal } from "store/global";

import { useTranslation } from "react-i18next";

import { useDispatch } from "react-redux";

import { Col, Row } from "react-bootstrap";

const Dashboard = () => {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();

  const data = {
    categories: [
      {
        id: 1,
        image: "/assets/images/dashboard/frame1.png",
        arrow: "/assets/images/dashboard/top-arrow-red.png",
        text: "الإشتراكات المتوقفة",
        number: "10",
        percentage: "0",
        color: "#C6002E",
      },
      {
        id: 2,
        image: "/assets/images/dashboard/frame2.png",
        arrow: "/assets/images/dashboard/top-arrow-orange.png",
        text: "برامج التدريب",
        number: "150",
        percentage: "0",
        color: "#E45F26",
      },
      {
        id: 3,
        image: "/assets/images/dashboard/frame3.png",
        arrow: "/assets/images/dashboard/top-arrow-green.png",
        text: "العملاء",
        number: "100",
        percentage: "0",
        color: "#01535A",
      },
    ],
    clients: [
      {
        id: 1,
        name: "Asmaa",
        image: "/assets/images/dashboard/client1.png",
        points: 150,
      },
      {
        id: 2,
        name: "Ahmed",
        image: "/assets/images/dashboard/client2.png",
        points: 250,
        smallImage: true,
      },
      {
        id: 3,
        name: "Mostafa",
        image: "/assets/images/dashboard/client3.png",
        points: 500,
      },
      {
        id: 4,
        name: "No3man",
        image: "/assets/images/dashboard/client4.png",
        points: 750,
      },
      {
        id: 5,
        name: "Mohamed Ashraf",
        image: "/assets/images/dashboard/client5.png",
        points: 1000,
        winner: true,
      },
    ],
    Chart: [
      {
        id: 1,
        text: "جديد",
        number: 30,
        image: "/assets/images/dashboard/circle1.png",
      },
      {
        id: 2,
        text: "قديم",
        number: 40,
        image: "/assets/images/dashboard/circle2.png",
      },
      {
        id: 3,
        text: "معدل",
        number: 80,
        image: "/assets/images/dashboard/circle3.png",
      },
    ],
  };

  return (
    <section className="home">
      {/* welcome box  */}
      <div className="boxed p-0 boxed-section">
        <div className="d-flex align-items-center gap-5">
          <div className="flex-fill">
            <div className="p-lg">
              <h4 className="home-welcome-title mb-base">مرحبا بك في تومو</h4>
              <p className="home-welcome-desc mb-xl">
                هنا يمكنك التحقق من تقارير أخر شهر ، والتحكم في برامج التدريب
                والتعديل عليها{" "}
              </p>
              <div className="d-flex align-items-center flex-wrap gap-4">
                <Btn
                  type="button"
                  title="اضافة برنامج"
                  onClick={() =>
                    dispatch(
                      openModal({
                        modal_type: modalTypes.add,
                        title: t("add_program"),
                        btnTitle: t("save"),
                      })
                    )
                  }
                />
                <Btn
                  classes="transparent"
                  type="button"
                  title="شاهد كل التقارير"
                />
              </div>
            </div>
          </div>
          <div className="d-none d-lg-block">
            <img
              src="/assets/images/dashboard/image.png"
              alt="wlcome"
              className="img-fluid home-welcome-img"
            />
          </div>
        </div>
      </div>

      {/* stats  */}
      <div className="boxed-section stats-boxes">
        <Row className="g-5" xs={1} md={2} xl={3}>
          {data.categories.map((item, index) => {
            return (
              <Col key={item.id}>
                <div className="boxed category-item">
                  {/* header  */}
                  <div className="category-item-header mb-base d-flex justify-content-between gap-3">
                    <div className="category-item-header-img">
                      <img src={item.image} alt="" className="img-fluid" />
                    </div>
                    <h6
                      className="category-item-header-title mb-0"
                      style={{ color: item.color }}
                    >
                      {item.text}
                    </h6>
                  </div>
                  {/* precent  */}
                  <div className="d-flex justify-content-end mb-md category-item-header-number">
                    <span>{item.number}</span>
                  </div>

                  <div className="d-flex align-items-center category-item-footer gap-2">
                    <span
                      style={{ color: item.color }}
                      className="category-item-footer-percentage"
                    >
                      {item.percentage}%
                    </span>
                    <img src={item.arrow} alt="" className="img-fluid" />
                    <span className="category-item-footer-month">شهرى</span>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>

      <Row className="g-5">
        <Col lg={5} xl={4}>
          <div className="boxed">
            <div className="clients-header d-flex align-items-center justify-content-between gap-3 flex-wrap mb-xl">
              <h5 className="clients-header-title mb-0">نوع البرامج</h5>
              <span className="text-capitalize d-flex align-items-center gap-1 clients-header-filter">
                <i className="las la-angle-down"></i>
                <span>
                  <span className="for">for </span>September 2022
                </span>
              </span>
            </div>
            <div className="position-relative d-flex justify-content-center align-items-center">
              <div className="position-absolute text-center">
                <p className="fw-bold chart-percentage">150</p>
                <p className="text-secondary chart-percentage-title mb-0">
                  اجمالي البرامج
                </p>
              </div>
              <img
                src="/assets/images/dashboard/ellipse.png"
                alt="ellipse"
                className="mx-auto img-fluid"
              />
            </div>
            <div className=" d-flex justify-content-center gap-5 mt-lg">
              {data.Chart.map((elem) => {
                return (
                  <div key={elem.id}>
                    <div className="d-flex align-items-center gap-2 align-items-center justify-content-center">
                      <p className="text-secondary mb-0">{elem.text}</p>
                      <div>
                        <img src={elem.image} alt="circle" />
                      </div>
                    </div>
                    <p className="text-center text-secondary mb-0">
                      {elem.number}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </Col>
        <Col lg={7} xl={8}>
          <div className="boxed mb-xl category-item category-item-hero d-flex align-items-center justify-content-between">
            <div className="category-item-header-img">
              <img
                src="/assets/images/dashboard/dashframe.png"
                alt=""
                className="img-fluid"
              />
            </div>

            <div>
              <h6 className="category-item-header-title mb-0">
                اللإشتراكات النشطة
              </h6>
              <div className="d-flex justify-content-end mb-md category-item-header-number">
                <span>90</span>
              </div>
              <div className="d-flex align-items-center justify-content-end category-item-footer gap-2">
                <span className="category-item-footer-percentage">0%</span>
                <img
                  src={"/assets/images/dashboard/light-green.png"}
                  alt=""
                  className="img-fluid"
                />
                <span className="category-item-footer-month">شهرى</span>
              </div>
            </div>
          </div>

          <div className="boxed clients">
            <div className="clients-header d-flex align-items-center justify-content-between gap-3 flex-wrap mb-xl">
              <h5 className="clients-header-title mb-0">افضل العملاء</h5>
              <span className="text-capitalize d-flex align-items-center gap-1 clients-header-filter">
                <i className="las la-angle-down"></i>
                <span>
                  <span className="for">for </span>September 2022
                </span>
              </span>
            </div>

            <div className="clients-body">
              <Row xs={1} sm={2} md={3} xl={5} className="g-4">
                {data.clients.map((item, index) => (
                  <Col key={item.id}>
                    <div className="client-item position-relative text-center d-flex flex-column align-items-center">
                      {/* img  */}
                      <div className="client-item-img position-relative">
                        <img src={item.image} alt="" className="img-fluid" />
                      </div>
                      <span className="client-item-name">{item.name}</span>
                      <h6 className="client-item-points mb-0">
                        {item.points} نقطة
                      </h6>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </Col>
      </Row>

      <Modal add={<AddProgram />} />
    </section>
  );
};

export default Dashboard;
