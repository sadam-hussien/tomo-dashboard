import { useState } from "react";

import {
  apiAddProgram,
  apiAddProgramExcercise,
  apiAddProgramMeals,
  apiUploadImg,
} from "../server";

import { Formik, Form, FieldArray, useFormikContext } from "formik";

import * as Yup from "yup";

import { useTranslation } from "react-i18next";

import {
  Btn,
  DynamicFileUploaderInput,
  ImageUploaderPreview,
  InputWithIcon,
  RadioBoxInput,
  Textarea,
} from "components";

import { Accordion, Col, Row, Spinner } from "react-bootstrap";

import { usePost } from "hooks";

import { useDispatch } from "react-redux";

import { openModal } from "store/global";

import {
  programTypeOptions,
  defaultProgramType,
  programTypeSports,
  programTypePsychological,
  programTypeSupplements,
  excersices,
  meals,
  subMealsTitle,
  subWorkOutTitle,
} from "../constants";
import { apiUploadImage } from "server";

// schema
const schema = Yup.object().shape({
  program: Yup.string().required("this_field_is_required"),
});

export default function Add({ handleClose }) {
  // translation
  const { t } = useTranslation("common");

  const dispatch = useDispatch();

  const { mutate: mutateProgram, isLoading: isLoadingProgram } = usePost({
    queryFn: apiAddProgram,
  });

  const { mutate: mutateProgramMeals, isLoading: isLoadingProgramMeals } =
    usePost({
      queryFn: apiAddProgramMeals,
      queryKey: "get-programs",
      onSuccess: () => handleClose(),
    });

  const { mutate: mutateProgramExcercise, isLoading: isLoadingExcercise } =
    usePost({
      queryFn: apiAddProgramExcercise,
      queryKey: "get-programs",
      onSuccess: () => handleClose(),
    });

  // image uploading
  const { mutate: mutateImageUploading, isLoading: isLoadingImageUploading } =
    usePost({
      queryFn: apiUploadImage,
    });

  // handle submit function
  function handleSubmit(values, actions) {
    mutateProgram(
      { name: values.program, programType: values.program_type },
      {
        onSuccess: (response) => {
          const payload = { ...values };
          delete payload.program_type;
          if (values.program_type === defaultProgramType) {
            delete payload.excersices;
            mutateProgramMeals({
              ...payload,
              program: response.data.id,
            });
          } else if (values.program_type === programTypeSports) {
            delete payload.meals;
            mutateProgramExcercise({
              ...payload,
              program: response.data.id,
            });
          }
        },
      }
    );
  }

  function addExtraMeal(arrayHelpers) {
    arrayHelpers.push({
      name: subMealsTitle[arrayHelpers.form.values.meals.length],
      extra: [
        {
          name: subMealsTitle[arrayHelpers.form.values.meals.length],
          details: "",
          calories: "",
          image: "",
        },
      ],
    });
  }

  function deleteMeal(arrayHelpers, index) {
    arrayHelpers.remove(arrayHelpers.form.values.meals.length - 1);
  }

  function addExcercise(arrayHelpers) {
    arrayHelpers.push({
      ...excersices[0],
      name: subWorkOutTitle[arrayHelpers.form.values.excersices.length],
    });
  }

  function deleteExcercise(arrayHelpers, index) {
    arrayHelpers.remove(arrayHelpers.form.values.excersices.length - 1);
  }

  return (
    <Formik
      enableReinitialize
      initialValues={{
        program: "",
        program_type: defaultProgramType,
        meals: meals,
        excersices: excersices,
      }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form>
          {/* import  */}
          <Btn
            classes="transparent"
            type="button"
            onClick={() =>
              dispatch(
                openModal({
                  title: t("import_program"),
                  btnTitle: t("choose_clienr"),
                  // data: data?.data,
                })
              )
            }
            style={{
              minWidth: "159px",
              height: "48px",
              marginBottom: "20px",
            }}
          >
            <i className="las la-plus icon" style={{ fontSize: "20px" }}></i>
            <span>{t("import_program")}</span>
          </Btn>

          {/* program type  */}
          <RadioBoxInput
            checked={values.program_type}
            options={programTypeOptions}
            name="program_type"
          />

          <InputWithIcon
            type="text"
            name="program"
            label={t("program_name")}
            placeholder={t("program_name")}
            icon="las la-edit"
            id="program_name"
            noBorder
            containerStyle={{
              flexDirection: "row-reverse",
              border: "1px solid rgba(38, 50, 56, 0.1)",
            }}
            style={{ height: "54px" }}
          />

          <div className="add-program-form">
            {/* program meals  */}

            {values.program_type === defaultProgramType ? (
              <Accordion>
                <FieldArray
                  name={`meals`}
                  render={(arrayHelpers) => (
                    <div>
                      {values.meals.map((meal, index) => (
                        <Accordion.Item
                          eventKey={"meal.name__" + index}
                          key={"meal.name-" + index}
                        >
                          <Accordion.Header>{meal.name}</Accordion.Header>
                          <Accordion.Body>
                            <div>
                              {meal.extra.map((extraMeal, idx) => (
                                <div
                                  key={index + "--" + idx}
                                  className={`add-program-extra-meal ${
                                    idx > 0
                                      ? "add-program-extra-meal-border"
                                      : ""
                                  }`}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <div>
                                      <InputWithIcon
                                        type="text"
                                        name={`meals[${index}].extra[${idx}].name`}
                                        label={t("meal_name")}
                                        placeholder={t("meal_name")}
                                        icon="las la-edit"
                                        id="program-extra-meal-name"
                                        noBorder
                                        containerStyle={{
                                          flexDirection: "row-reverse",
                                          border:
                                            "1px solid rgba(38, 50, 56, 0.1)",
                                        }}
                                        style={{ height: "54px" }}
                                      />
                                    </div>
                                    <div
                                      onClick={() => {
                                        deleteMeal(arrayHelpers, index);
                                      }}
                                      className="d-flex justify-content-between gap-3 align-items-center"
                                    >
                                      <img
                                        src="/assets/images/trash-icon.svg"
                                        alt="delete meal"
                                        className="cursor-pointer img-fluid"
                                      />
                                      <p
                                        style={{
                                          margin: "0",
                                          color: "var(--secondary)",
                                          cursor: "pointer",
                                        }}
                                      >
                                        حذف الوجبه
                                      </p>
                                    </div>
                                  </div>
                                  <Row xs={1} md={2} className="g-3">
                                    <Col>
                                      <Textarea
                                        name={`meals[${index}].extra[${idx}].details`}
                                        placeholder={t("meal_details")}
                                        label={t("meal_details")}
                                        id={
                                          "program-extra-meal-" +
                                          index +
                                          "__" +
                                          idx
                                        }
                                      />
                                    </Col>
                                    {/* <Col>
                                      <Textarea
                                        name={`meals[${index}].extra[${idx}].details`}
                                        placeholder={t("meal_details")}
                                        label={t("meal_details")}
                                        id={
                                          "program-extra-meal-" +
                                          index +
                                          "__" +
                                          idx
                                        }
                                      />
                                    </Col> */}

                                    <Col>
                                      <Textarea
                                        name={`meals[${index}].extra[${idx}].calories`}
                                        placeholder={t("meal_calories")}
                                        label={t("meal_calories")}
                                        id={
                                          "program-extra-meal-" +
                                          index +
                                          "__" +
                                          idx +
                                          "calories"
                                        }
                                      />
                                    </Col>
                                  </Row>

                                  <DynamicFileUploaderInput
                                    item={{
                                      id: `meals[${index}].extra[${idx}].image`,
                                      name: `meals[${index}].extra[${idx}].image`,
                                      multiple: true,
                                    }}
                                    serverCallback={mutateImageUploading}
                                    currentValue={
                                      values.meals[index].extra[idx].image
                                    }
                                  >
                                    <ImageUploaderPreview
                                      multiple={true}
                                      isLoading={isLoadingImageUploading}
                                    />
                                  </DynamicFileUploaderInput>
                                </div>
                              ))}
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      ))}
                      <Btn
                        style={{
                          background: "transparent",
                          border: "1px solid #2AD7A1",
                          marginTop: "var(--space-lg)",
                          marginBottom: "var(--space-lg)",
                          color: "#2AD7A1",
                          fontSize: "var(--font-size-sm)",
                          minWidth: "121px",
                          height: "48px",
                        }}
                        type="button"
                        onClick={() => addExtraMeal(arrayHelpers)}
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
              </Accordion>
            ) : values.program_type === programTypeSports ? (
              <Accordion>
                <FieldArray
                  name="excersices"
                  render={(arrayHelpers) => (
                    <div>
                      {values.excersices.map((excercise, index) => (
                        <Accordion.Item
                          eventKey={excercise.name + index}
                          key={excercise.name + index}
                        >
                          <Accordion.Header>{excercise.name}</Accordion.Header>
                          <Accordion.Body>
                            <div
                              key={index + "--"}
                              className={`add-program-extra-excercise ${
                                index > 0
                                  ? "add-program-extra-excercise-border"
                                  : ""
                              }`}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <div>
                                  <InputWithIcon
                                    type="text"
                                    name={`excersices[${index}].name`}
                                    label={t("excercise_name")}
                                    placeholder={t("excercise_name")}
                                    icon="las la-edit"
                                    id={`program--excercise_name--${index}`}
                                    noBorder
                                    containerStyle={{
                                      flexDirection: "row-reverse",
                                      border: "1px solid rgba(38, 50, 56, 0.1)",
                                    }}
                                    style={{ height: "54px" }}
                                  />
                                </div>
                                <div
                                  onClick={() => {
                                    deleteExcercise(arrayHelpers, index);
                                  }}
                                  className="d-flex justify-content-between gap-3 align-items-center"
                                >
                                  <img
                                    src="/assets/images/trash-icon.svg"
                                    alt="delete excercise"
                                    className="cursor-pointer img-fluid"
                                  />
                                  <p
                                    style={{
                                      margin: "0",
                                      color: "var(--secondary)",
                                      cursor: "pointer",
                                    }}
                                  >
                                    حذف التمرين
                                  </p>
                                </div>
                              </div>
                              <Row xs={1} md={2} className="g-3">
                                <Col>
                                  <Textarea
                                    name={`excersices[${index}].details`}
                                    placeholder={t("excercise_details")}
                                    label={t("excercise_details")}
                                    id={index + "__"}
                                  />
                                </Col>
                                <Col>
                                  <Textarea
                                    name={`excersices[${index}].tools`}
                                    placeholder={t("excercise_tools")}
                                    label={t("excercise_tools")}
                                    id={
                                      index + "__program--excercise_duration--"
                                    }
                                  />
                                </Col>
                              </Row>

                              <Row xs={1} md={3} className="g-3">
                                <Col>
                                  <InputWithIcon
                                    type="text"
                                    name={`excersices[${index}].duration`}
                                    label={t("excercise_duration")}
                                    placeholder={t("excercise_duration")}
                                    icon="las la-edit"
                                    id={`program--excercise_duration--${index}`}
                                    noBorder
                                    containerStyle={{
                                      flexDirection: "row-reverse",
                                      border: "1px solid rgba(38, 50, 56, 0.1)",
                                    }}
                                    style={{ height: "54px" }}
                                  />
                                </Col>
                                <Col>
                                  <InputWithIcon
                                    type="text"
                                    name={`excersices[${index}].reps`}
                                    label={t("excercise_reps")}
                                    placeholder={t("excercise_reps")}
                                    icon="las la-edit"
                                    id={`program--excercise_reps--${index}`}
                                    noBorder
                                    containerStyle={{
                                      flexDirection: "row-reverse",
                                      border: "1px solid rgba(38, 50, 56, 0.1)",
                                    }}
                                    style={{ height: "54px" }}
                                  />
                                </Col>

                                <Col>
                                  <InputWithIcon
                                    type="text"
                                    name={`excersices[${index}].calories`}
                                    label={t("excercise_calories")}
                                    placeholder={t("excercise_calories")}
                                    icon="las la-edit"
                                    id={`program--excercise_calories--${index}`}
                                    noBorder
                                    containerStyle={{
                                      flexDirection: "row-reverse",
                                      border: "1px solid rgba(38, 50, 56, 0.1)",
                                    }}
                                    style={{ height: "54px" }}
                                  />
                                </Col>
                              </Row>

                              <DynamicFileUploaderInput
                                item={{
                                  id: `excersices[${index}].images`,
                                  name: `excersices[${index}].images`,
                                  multiple: true,
                                }}
                                serverCallback={mutateImageUploading}
                                currentValue={values.excersices[index].images}
                              >
                                <ImageUploaderPreview
                                  multiple={true}
                                  isLoading={isLoadingImageUploading}
                                />
                              </DynamicFileUploaderInput>
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      ))}
                      <Btn
                        style={{
                          background: "transparent",
                          border: "1px solid #2AD7A1",
                          marginTop: "var(--space-lg)",
                          marginBottom: "var(--space-lg)",
                          color: "#2AD7A1",
                          fontSize: "var(--font-size-sm)",
                          minWidth: "121px",
                          height: "48px",
                        }}
                        type="button"
                        onClick={() => addExcercise(arrayHelpers)}
                      >
                        <i
                          className="las la-plus"
                          style={{ fontSize: "20px" }}
                        ></i>
                        <span>اضافة تمرين</span>
                      </Btn>
                    </div>
                  )}
                />
              </Accordion>
            ) : null}

            <div className="d-flex flex-column gap-3">
              <Btn
                type="submit"
                title={t("save")}
                loading={
                  isLoadingProgram ||
                  isLoadingProgramMeals ||
                  isLoadingExcercise
                }
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
                disabled={
                  isLoadingProgram ||
                  isLoadingProgramMeals ||
                  isLoadingExcercise
                }
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

function FileUploader({ name }) {
  const { setFieldValue, values } = useFormikContext();
  const [isLoading, setIsLoading] = useState(false);
  const [imageRes, setImageRes] = useState(null);
  function handleUploadFile(e) {
    setIsLoading(true);
    const fd = new FormData();

    fd.append("image", e.target.files[0]);

    apiUploadImg(fd)
      .then((res) => {
        setImageRes(res.data.path);
        setFieldValue(
          name,
          values.program_type === defaultProgramType
            ? res.data.path
            : [res.data.path]
        );
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
