import { useState } from "react";

import { apiEditProgram, apiEditProgramMeals, apiUploadImg } from "../server";

import { Formik, Form, FieldArray, useFormikContext } from "formik";

import * as Yup from "yup";

import { useTranslation } from "react-i18next";

import { Btn, InputWithIcon, Textarea } from "components";

import { Accordion, Col, Row, Spinner } from "react-bootstrap";

import { usePost } from "hooks";

export default function Edit({ handleClose, data: itemData }) {
  // translation
  const { t } = useTranslation("common");

  const { mutate: mutateProgram, isLoading: isLoadingProgram } = usePost({
    queryFn: apiEditProgram,
  });

  const { mutate: mutateProgramMeals, isLoading: isLoadingProgramMeals } =
    usePost({
      queryFn: apiEditProgramMeals,
      // queryKey: "get-programs",
      onSuccess: () => handleClose(),
    });

  // handle submit function
  function handleSubmit(values, actions) {
    mutateProgram(
      { name: values.program, id: itemData.data.id },
      {
        onSuccess: (response) => {
          mutateProgramMeals({
            ...values,
            id: itemData.data.id,
          });
        },
      }
    );
  }

  const subMealsTitle = [
    "الوجبة الأولى",
    "الوجبة الثانية",
    "الوجبة الثالثة",
    "الوجبة الرابعة",
    "الوجبة الخامسة",
    "الوجبة السادسة",
    "الوجبة السابعة",
    "الوجبة الثامنة",
    "الوجبة التاسعة",
    "الوجبة العاشرة",
    "الوجبة الحادية عشرة",
    "الوجبة الثانية عشرة",
    "الوجبة الثالثة عشرة",
    "الوجبة الرابعة عشرة",
    "الوجبة الخامسة عشرة",
    "الوجبة السادسة عشرة",
    "الوجبة السابعة عشرة",
    "الوجبة الثامنة عشرة",
    "الوجبة التاسعة عشرة",
    "الوجبة العشرين",
  ];

  function addExtraMeal(arrayHelpers, index) {
    arrayHelpers.push({
      name: subMealsTitle[arrayHelpers.form.values.meals[index].extra.length],
      details: "",
      calories: "",
      image: "",
    });
  }

  function deleteMeal(arrayHelpers, index) {
    arrayHelpers.remove(index);
  }

  // schema
  const schema = Yup.object().shape({
    program: Yup.string().required("this_field_is_required"),
  });

  const mealsTitles = ["وجبة الافطار", "وجبة الغداء", "وجبة العشاء"];

  const handleInitialValues = itemData?.data?.mainMeals
    ? itemData.data.mainMeals.map((item) => {
        return {
          name: item.name,
          extra: item.extraMeals.map((i) => {
            return {
              name: i.name,
              details: i.details,
              calories: i.calories,
              image: i.image,
            };
          }),
        };
      })
    : [];

  return (
    <Formik
      initialValues={{
        program: itemData.data.name,
        meals: handleInitialValues,
      }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form>
          <InputWithIcon
            type="text"
            name="program"
            label={t("program_name")}
            placeholder={t("program_name")}
            icon="las la-edit"
            id="program"
            noBorder
            containerStyle={{
              flexDirection: "row-reverse",
              border: "1px solid rgba(38, 50, 56, 0.1)",
            }}
            style={{ height: "54px" }}
          />
          <div className="add-program-form">
            {/* program meals  */}
            <Accordion>
              {values.meals.map((meal, index) => (
                <Accordion.Item
                  eventKey={meal.name + index}
                  key={meal.name + index}
                >
                  <Accordion.Header>{mealsTitles[index]}</Accordion.Header>
                  <Accordion.Body>
                    <FieldArray
                      name={`meals[${index}].extra`}
                      render={(arrayHelpers) => (
                        <div>
                          {meal.extra.map((extraMeal, idx) => (
                            <div
                              key={index + "--" + idx}
                              className={`add-program-extra-meal ${
                                idx > 0 ? "add-program-extra-meal-border" : ""
                              }`}
                            >
                              <div className="d-flex justify-content-between align-items-center">
                                <h6 className="add-program-extra-meal-name">
                                  {extraMeal.name}
                                </h6>
                                {idx > 0 && (
                                  <img
                                    src="/assets/images/trash-icon.svg"
                                    alt="delete meal"
                                    className="cursor-pointer img-fluid"
                                    onClick={() =>
                                      deleteMeal(arrayHelpers, idx)
                                    }
                                  />
                                )}
                              </div>

                              <Row xs={1} md={2} className="g-3">
                                <Col>
                                  <Textarea
                                    name={`meals[${index}].extra[${idx}].details`}
                                    placeholder={t("meal_details")}
                                    label={t("meal_details")}
                                    id={index + "__" + idx}
                                  />
                                </Col>
                                <Col>
                                  <Textarea
                                    name={`meals[${index}].extra[${idx}].calories`}
                                    placeholder={t("meal_calories")}
                                    label={t("meal_calories")}
                                    id={index + "__" + idx + "calories"}
                                  />
                                </Col>
                              </Row>

                              <FileUploader
                                name={`meals[${index}].extra[${idx}].image`}
                              />
                            </div>
                          ))}

                          <Btn
                            style={{
                              background: "transparent",
                              border: "1px solid #2AD7A1",
                              marginTop: "var(--space-lg)",
                              color: "#2AD7A1",
                              fontSize: "var(--font-size-sm)",
                              minWidth: "121px",
                              height: "48px",
                            }}
                            type="button"
                            onClick={() => addExtraMeal(arrayHelpers, index)}
                          >
                            <i
                              className="las la-plus"
                              style={{ fontSize: "20px" }}
                            ></i>
                            <span>اضافة وجبة</span>
                          </Btn>
                        </div>
                      )}
                    />
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
            <div className="d-flex flex-column gap-3">
              <Btn
                type="submit"
                title={t("save")}
                loading={isLoadingProgram || isLoadingProgramMeals}
                style={{
                  height: "48px",
                  fontSize: "var(--font-size-md)",
                  fontWeight: 500,
                }}
              />
              <Btn
                type="button"
                title={t("close")}
                onClick={handleClose}
                classes="transparent"
                style={{
                  height: "48px",
                  fontSize: "var(--font-size-md)",
                  fontWeight: 500,
                }}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

function FileUploader({ name }) {
  const { setFieldValue } = useFormikContext();
  const [isLoading, setIsLoading] = useState(false);
  const [imageRes, setImageRes] = useState(null);
  function handleUploadFile(e) {
    setIsLoading(true);
    const fd = new FormData();

    fd.append("image", e.target.files[0]);

    apiUploadImg(fd)
      .then((res) => {
        console.log(res);
        setImageRes(res.data.path);
        setFieldValue(name, res.data.path);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  return (
    <label className="add-program-extra-meal-file-uploader d-flex flex-column align-items-center justify-content-center gap-2 m-0">
      <input type="file" className="d-none" onChange={handleUploadFile} />
      {isLoading ? (
        <Spinner aria-label="Medium sized spinner example" size="md" />
      ) : imageRes ? (
        <>
          <img src={imageRes} alt="file uploading" />
        </>
      ) : (
        <>
          <img
            src="/assets/images/camera.svg"
            alt="camera"
            className="w-[22px]"
          />
          <span className="add-program-extra-meal-file-uploader-title leading-5">
            ارفاق صوره او عدة صور
          </span>
        </>
      )}
    </label>
  );
}
