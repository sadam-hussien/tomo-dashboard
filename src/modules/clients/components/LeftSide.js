import React from "react";
import "../style/index.css";
import CirculraProgress from "./CirculraProgress";
import {useDispatch} from "react-redux";
import {openModal} from "store/global";
import {modalTypes} from "constants";
import {useFetch} from "hooks";
import {apiGetUserById} from "../server";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

const LeftSide = ({items}) => {
  console.log(items);

  const userDetails = [
    "570/1200 نقطة",
    "صوم 1200",
    "25 سنه",
    "188",
  ];

  const currentWeight = parseInt(items?.user?.profile?.weight) - parseInt(items?.user?.userGoal[0]?.value);

  const progress =
    ((parseInt(items?.user?.profile?.weight) -
      parseInt(items?.user?.userGoal[0]?.value)) *
      100) /
      parseInt(items?.user?.profile?.weight) +
    "%";

  const {id} = useParams();

  const {t} = useTranslation();

  const {data, isLoading} = useFetch({
    queryKey: ["get-user", id],
    queryFn: () => apiGetUserById(id),
  });

  const dispatch = useDispatch();

  return (
    <div className="client-left-side">
      <div>
        <div>
          <div className="client-left-side-top">
            <img src={items?.user?.profile?.avatar} alt="" />
            <p style={{fontSize: "1.1rem"}}>{items?.user?.name}</p>
            <div className="d-flex gap-3 m-3">
              <div style={{display: "flex", alignItems: "center", gap: "5px"}}>
                <div style={{width:"20px"}}>
                  <img
                    style={{width: "100%", height: "auto", margin: "0"}}
                    src="/assets/images/active-icon.svg"
                    alt=""
                  />
                </div>
                <p style={{fontSize: "0.9rem"}}>
                  {items?.active ? "نشط" : "مش نشط"}
                </p>
              </div>
              <div>
              <div>
                <small style={{padding:"3px",backgroundColor:"var(--light-bg)"}}>منذ 4 اشهر</small>
              </div>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "20px",
              whiteSpace: "nowrap",
              flexWrap: "wrap",
            }}
          >
            {userDetails.map((e) => {
              return (
                <span>
                  {e?.includes("سنه")
                    ? "السن :25 سنه"
                    : !isNaN(+e)
                    ? "الطول:" + " CM " + e
                    : e}
                </span>
              );
            })}
          </div>

          <div className="my-3">
            <p style={{paddingBottom: "10px"}}>بيانات التواصل</p>
            <div style={{marginBottom: "25px"}} className="contact-details">
              <i class="las la-phone"></i>
              <div>
                <p>رقم الهاتف</p>
                <p>
                  {items.user.countryCode.slice(1, 3) + items.user.phone + "+"}
                </p>
              </div>
            </div>
            <div className="contact-details">
              <div className="contact-details-img">
                <img src="/assets/images/envelope.svg" alt="" />
              </div>
              <div>
                <p>البريد الاكتروني</p>
                <p>mad@gmail.com</p>
              </div>
            </div>
          </div>

          <div className="my-4">
            <div style={{direction: "ltr"}}>
              <div style={{display: "flex", justifyContent: "space-between"}}>
                <img src="/assets/images/flagstart.svg" alt="" />
                <img src="/assets/images/bullseye.svg" alt="" />
              </div>
              <div
                class="progress"
                style={{
                  borderRadius: "10px",
                  border: "1px solid var(--secondary)",
                  overflow:"visible",
                  marginBlock:"5px",
                  height:"10px"
                }}
              >
                <div
                  class="progress-bar bg-danger d-flex"
                  role="progressbar"
                  style={{
                    width: progress === "NaN%" ? "15%" : progress,
                    borderRadius: "10px",
                    position: "relative",
                    overflow:"visible"
                  }}
                  aria-valuenow="25"
                  aria-valuemin={isNaN(parseInt(items?.user?.userGoal[0]?.value))}
                  aria-valuemax={parseInt(items?.user?.profile?.weight)}
                >
                  <p style={{position: "absolute",right:"-10px",top:"-25px",color:"black",fontSize:"1rem"}}>{isNaN(currentWeight) ? "25" :currentWeight}Kg</p>
                </div>
              </div>
              <div style={{display: "flex", justifyContent: "space-between"}}>
                <p>{items?.user?.profile?.weight}kg</p>
                <p>{items?.user?.userGoal[0]?.value}kg</p>
              </div>
            </div>
            <div className="d-flex gap-1 align-items-center">
              <p>الاوزان السابقة</p>
              <button
                className="bg-transparent border-0"
                type="button"
                onClick={() =>
                  dispatch(
                    openModal({
                      modal_type: modalTypes.view,
                      title: t("weights"),
                      ...data.data.user,
                    })
                  )
                }
              >
                <img
                  src="/assets/images/details-icon.svg"
                  alt="details"
                  className="img-fluid"
                />
              </button>
            </div>
            <hr />
          </div>

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
                    ...data.data.user,
                  })
                )
              }
              style={{
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                textAlign: "center",
                borderRadius: "10px",
                padding: "25px 40px",
                cursor:'pointer'
              }}
            >
              <i
                style={{fontSize: "2rem", color: "#FF725E"}}
                class="las la-chalkboard"
              ></i>
              <p>القياسات</p>
            </div>
            <div
              onClick={() =>
                dispatch(
                  openModal({
                    modal_type: modalTypes.info,
                    title: t("subscription_info"),
                    ...data.data.user,
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
                style={{fontSize: "2rem", color: "#097D4F"}}
                class="lar la-question-circle"
              ></i>
              <p>معلومات الاشتراك</p>
            </div>
          </div>
          <hr />
          <CirculraProgress dataValue={80} />
        </div>
      </div>
    </div>
  );
};

export default LeftSide;
