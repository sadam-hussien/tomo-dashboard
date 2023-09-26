import { InputWithIcon } from "components";
import React from "react";
import { useTranslation } from "react-i18next";

const Workout = ({ programs }) => {
  const { t } = useTranslation("common");

  const filterPrograms = programs.filter(
    (item) => item.programType === "sports"
  );

  return (
    <div>
      {filterPrograms.length > 0 &&
        filterPrograms.map((program) =>
          program.excercises.map((excercise) => (
            <div className="client-workout" key={excercise.id}>
              <div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "15px",
                    }}
                  >
                    <h5 style={{ margin: "0" }}>{excercise.name}</h5>
                    <img
                      src="/assets/images/active-icon.svg"
                      alt="edit pen icon"
                    />
                  </div>
                  <div className="workout-icons my-3 d-flex">
                    <div className="d-flex align-items-center gap-2">
                      <img src="/assets/images/clock.svg" alt="" />
                      <p style={{ margin: "0" }}>{excercise.duration} د</p>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <img src="/assets/images/dumbell.svg" alt="" />
                      <p style={{ margin: "0" }}>{excercise.reps} عدة</p>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <img src="/assets/images/fire.svg" alt="" />
                      <p style={{ margin: "0" }}>{excercise.calories} كالورى</p>
                    </div>
                  </div>
                </div>

                <div className="client-recipe">
                  <div className="client-recipe-desc">
                    <div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          marginBottom: "5px",
                        }}
                      >
                        <p
                          style={{
                            fontWeight: "500",
                            color: "var(--secondary)",
                            margin: "0",
                          }}
                        >
                          تفاصيل التمرينة
                        </p>
                        <img
                          src="/assets/images/edit-icon.svg"
                          alt="edit pen icon"
                        />
                      </div>
                    </div>
                    <small>{excercise.details}</small>
                    <div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          marginBlock: "5px",
                        }}
                      >
                        <p
                          style={{
                            fontWeight: "500",
                            color: "var(--secondary)",
                            margin: "0",
                          }}
                        >
                          الادوات المستخدمة
                        </p>
                        <img
                          src="/assets/images/edit-icon.svg"
                          alt="edit pen icon"
                        />
                      </div>
                    </div>
                    <small>{excercise.tools}</small>
                    {/* <div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          marginBlock: "5px",
                        }}
                      >
                        <p
                          style={{
                            fontWeight: "500",
                            color: "var(--secondary)",
                            margin: "0",
                          }}
                        >
                          نتائج العميل
                        </p>
                      </div>
                    </div>
                    <div className="d-flex gap-4">
                      <p
                        style={{
                          color: "#097D4F",
                          backgroundColor: "#19746D1A",
                          padding: "4px 10px 4px 10px",
                          borderRadius: "5px",
                        }}
                      >
                        العدات:10
                      </p>
                      <p
                        style={{
                          color: "#097D4F",
                          backgroundColor: "#19746D1A",
                          padding: "4px 10px 4px 10px",
                          borderRadius: "5px",
                        }}
                      >
                        التكرار:4
                      </p>
                    </div>
                    <div>
                      <p
                        style={{
                          fontWeight: "500",
                          color: "var(--secondary)",
                          marginBlock: "10px",
                        }}
                      >
                        ملحوظات العميل
                      </p>
                    </div>
                    <small>تخفق البيضه والملح والسكر</small> */}
                  </div>

                  <div className="client-recipe-img">
                    <img
                      style={{
                        width: "100%",
                        maxWidth: "270px",
                        borderRadius: "10px",
                      }}
                      src={excercise.images[0]}
                      alt=""
                    />
                  </div>
                </div>
              </div>

              {/* <div>
                <h5 style={{ marginBlock: "20px 10px" }}>تقييم الاخصائية</h5>
                <InputWithIcon
                  type="text"
                  name="text"
                  placeholder="تغيير الوجبة"
                  icon="las la-edit"
                  noBorder
                  basic={{ onChange: (e) => console.log(e) }}
                  containerStyle={{
                    flexDirection: "row-reverse",
                    border: "1px solid rgba(38, 50, 56, 0.1)",
                  }}
                  style={{ height: "54px" }}
                />
              </div> */}
            </div>
          ))
        )}
    </div>
  );
};

export default Workout;
