import { useState } from "react";

import { Btn, Modal } from "components";

import AddProgram from "modules/programs/components/Add";

// Images
import Feast from "assets/images/dashboard/image.png";
import Frame1 from "assets/images/dashboard/frame1.png";
import Frame2 from "assets/images/dashboard/frame2.png";
import Frame3 from "assets/images/dashboard/frame3.png";
import RedArrow from "assets/images/dashboard/top-arrow-red.png";
import OrangeArrow from "assets/images/dashboard/top-arrow-orange.png";
import GreenArrow from "assets/images/dashboard/top-arrow-green.png";
import BottomArrow from "assets/images/dashboard/bottom-arrow.png";
import Ellipse from "assets/images/dashboard/ellipse.png";
import Circle1 from "assets/images/dashboard/circle1.png";
import Circle2 from "assets/images/dashboard/circle2.png";
import Circle3 from "assets/images/dashboard/circle3.png";
import DashFrame from "assets/images/dashboard/dashframe.png";
import LightGreen from "assets/images/dashboard/light-green.png";
import Client1 from "assets/images/dashboard/client1.png";
import Client2 from "assets/images/dashboard/client2.png";
import Client3 from "assets/images/dashboard/client3.png";
import Client4 from "assets/images/dashboard/client4.png";
import Client5 from "assets/images/dashboard/client5.png";
import Trophy from "assets/images/dashboard/trophy.png";
import { modalTypes } from "constants";
import { openModal } from "store/global";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Col, Row } from "react-bootstrap";

const Dashboard = () => {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  // const [overlay, setOverlay] = useState(false);
  // const [togglePrograms, setTogglePrograms] = useState(false);
  // Close Overlay Section
  // const handleOverlay = () => {
  //   setOverlay(false);
  //   setTogglePrograms(false);
  // };
  const data = {
    categories: [
      {
        id: 1,
        image: Frame1,
        arrow: RedArrow,
        text: "الإشتراكات المتوقفة",
        number: "10",
        percentage: "0",
        color: "#C6002E",
      },
      {
        id: 2,
        image: Frame2,
        arrow: OrangeArrow,
        text: "برامج التدريب",
        number: "150",
        percentage: "0",
        color: "#E45F26",
      },
      {
        id: 3,
        image: Frame3,
        arrow: GreenArrow,
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
        image: Client1,
        points: 150,
      },
      {
        id: 2,
        name: "Ahmed",
        image: Client2,
        points: 250,
        smallImage: true,
      },
      {
        id: 3,
        name: "Mostafa",
        image: Client3,
        points: 500,
      },
      {
        id: 4,
        name: "No3man",
        image: Client4,
        points: 750,
      },
      {
        id: 5,
        name: "Mohamed Ashraf",
        image: Client5,
        points: 1000,
        winner: true,
      },
    ],
    Chart: [
      {
        id: 1,
        text: "جديد",
        number: 30,
        image: Circle1,
      },
      {
        id: 2,
        text: "قديم",
        number: 40,
        image: Circle2,
      },
      {
        id: 3,
        text: "معدل",
        number: 80,
        image: Circle3,
      },
    ],
  };

  return (
    <div>
      <section className="hero bg-light-gray d-flex">
        <section className="dashboard">
          <div className="dash-container">
            {/* Info Section */}
            <div className="info bg-white d-flex flex-column flex-md-row align-align-items-center justify-content-between">
              <div className="p-base text-center text-sm-right">
                <p className="header mb-base text-secondary">
                  مرحبا بك في تومو
                </p>
                <p className="text mb-8 text-secondary fw-light">
                  هنا يمكنك التحقق من تقارير أخر شهر ، والتحكم في برامج التدريب
                  والتعديل عليها
                </p>
                <div className="buttons d-flex flex-column align-items-center align-items-md-start flex-sm-row flex-md-column ">
                  <Btn
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
                  <Btn title="شاهد كل التقارير" />
                </div>
              </div>
              <img src={Feast} alt="frame" />
            </div>

            {/* Category Section */}
            <Row xs={1} md={2} lg={3} className="g-5 g-lg-2">
              {data.categories.map((elem) => {
                return (
                  <Col>
                    <div
                      className="category bg-white position-relative d-flex justify-content-between rounded"
                      key={elem.id}
                    >
                      <div className="img position-absolute">
                        <img src={elem.image} alt={elem.text} />
                      </div>
                      <div className="right-info d-flex align-items-end">
                        <p
                          className="ml-2 fw-light"
                          style={{ color: elem.color }}
                        >
                          {elem.percentage}%
                        </p>
                        <img
                          src={elem.arrow}
                          alt="arrow"
                          className="ml-2.5 mb-1"
                        />
                        <p className="text-black mb-px">شهرى</p>
                      </div>
                      <div className="left-info text-left mb-7">
                        <p
                          className="mb-4 fw-medium"
                          style={{ color: elem.color }}
                        >
                          {elem.text}
                        </p>
                        <p className="text-secondary">{elem.number}</p>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>

            {/* Dashboard Section */}
            <div className="dashboard-section flex flex-col md:flex-row gap-y-4 md:gap-y-0 md:gap-x-10">
              <div className="chart py-6 px-4 bg-white rounded-xl h-full">
                <div className="chart-text flex flex-col flex-lg-row align-items-center justify-content-between mb-lg">
                  <p className="heading fw-medium text-secondary">
                    نوع البرامج
                  </p>
                  <div className="flex gap-x-1 justify-content-between align-items-center cursor-pointer">
                    <div>
                      <img src={BottomArrow} alt="arrow" />
                    </div>
                    <p className="text-sm date cursor-pointer text-secondary">
                      September 2022
                    </p>
                    <p className="text-sm for">for</p>
                  </div>
                </div>
                <div className="chart-img mb-6 relative ellipse px-2">
                  <div className="position-absolute center text-center">
                    <p className="font-bold mb-1.5">150</p>
                    <p className="text-secondary">اجمالي البرامج</p>
                  </div>
                  <img src={Ellipse} alt="ellipse" className="mx-auto" />
                </div>
                <div className="chart-footer flex gap-x-6 justify-center">
                  {data.Chart.map((elem) => {
                    return (
                      <div key={elem.id}>
                        <div className="flex align-items-center mb-2">
                          <p className="ml-2 text-secondary">{elem.text}</p>
                          <div>
                            <img src={elem.image} alt="circle" />
                          </div>
                        </div>
                        <p className="text-center text-secondary">
                          {elem.number}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="dash-info flex flex-col justify-content-between gap-y-8 flex-grow">
                <div className="text-poppins bg-white rounded-xl flex align-items-center justify-content-between">
                  <div className="img mr-0 md:mr-10">
                    <img src={DashFrame} alt="frame" />
                  </div>
                  <div className="infos text-left">
                    <p className="green-text fw-light mb-4">
                      اللإشتراكات النشطة
                    </p>
                    <p className="text-secondary number mb-4">90</p>
                    <div className="info-text flex justify-end gap-x-2 align-items-center">
                      <p className="monthly small">شهرى</p>
                      <p className="green-text">0%</p>
                      <img src={LightGreen} alt="arrow" />
                    </div>
                  </div>
                </div>
                <div className="clients bg-white h-full rounded-xl">
                  <div className="header flex flex-col md:flex-row align-items-center justify-content-between mb-9">
                    <p className="header-text fw-medium text-primary">
                      افضل العملاء
                    </p>
                    <div className="flex gap-x-1 justify-content-between align-items-center cursor-pointer">
                      <div>
                        <img src={BottomArrow} alt="arrow" />
                      </div>
                      <p className="text-sm date text-primary">
                        September 2022
                      </p>
                      <p className="text-sm for">for</p>
                    </div>
                  </div>
                  <div className="clients-info flex flex-wrap justify-center md:justify-content-between px-5 gap-y-6 gap-x-3">
                    {data.clients.map((client) => {
                      return (
                        <div
                          className="client text-center relative"
                          key={client.id}
                        >
                          <img
                            src={client.image}
                            alt="client"
                            className={`mb-3 ${
                              client.smallImage ? "mt-2" : ""
                            }`}
                          />
                          <p className="mb-2 text-primary text-sm fw-medium">
                            {client.name}
                          </p>
                          <p
                            className="fw-medium text-primary"
                            style={{ color: client.winner ? "#D02049" : "" }}
                          >
                            {client.points} نقطة
                          </p>
                          {client.winner ? (
                            <div className="trophy position-absolute rounded-full z-20">
                              <img src={Trophy} alt="trophy" />
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>

      <Modal add={<AddProgram />} />
    </div>
  );
};

export default Dashboard;
