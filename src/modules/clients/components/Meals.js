import React from "react";

import { InputWithIcon } from "components";

import { useTranslation } from "react-i18next";
import { handleDate } from "helpers";

const Meals = ({ programs }) => {
  const { t } = useTranslation("common");

  const filterPrograms = programs.filter(
    (item) => item.programType === "nutrition"
  );

  return (
    <div>
      {filterPrograms.length > 0 &&
        filterPrograms.map((program) =>
          program.mainMeals.map((meal) =>
            meal.extraMeals.map((extraMeal) => (
              <div className="client-meals" key={program.id + extraMeal.id}>
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "15px",
                    }}
                  >
                    <h5 style={{ margin: "0" }}>
                      {meal.name}:{extraMeal.name}{" "}
                      {handleDate(extraMeal.updatedAt, true)}
                    </h5>
                    <img
                      src="/assets/images/active-icon.svg"
                      alt="edit pen icon"
                    />
                  </div>

                  <div className="client-recipe">
                    <div className="client-recipe-desc">
                      <div>
                        {/* <div
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
                            فول بالبيض
                          </p>
                          <img
                            src="/assets/images/edit-icon.svg"
                            alt="edit pen icon"
                          />
                        </div> */}
                      </div>
                      <small>{extraMeal.details}</small>
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
                            السعارات الحرارية
                          </p>
                          <img
                            src="/assets/images/edit-icon.svg"
                            alt="edit pen icon"
                          />
                        </div>
                      </div>
                      <small>{extraMeal.calories}</small>
                      {/* <div>
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
                        src={extraMeal.image[0]}
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
          )
        )}
    </div>
  );
};

export default Meals;
