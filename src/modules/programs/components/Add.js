import { useState } from "react";

import { apiAddProgram, apiAddProgramMeals, apiUploadImg } from "../server";

import { Formik, Form, FieldArray, useFormikContext } from "formik";

import * as Yup from "yup";

import { useTranslation } from "react-i18next";

import { Btn, InputWithIcon, RadioBoxInput, Textarea } from "components";

import { Accordion, Col, Row, Spinner } from "react-bootstrap";

import { usePost } from "hooks";

import { useDispatch } from "react-redux";

import { openModal } from "store/global";

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

  // handle submit function
  function handleSubmit(values, actions) {
    mutateProgram(
      { name: values.program },
      {
        onSuccess: (response) => {
          mutateProgramMeals({
            ...values,
            program: response.data.id,
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
  
  const subWorkOutTitle = [
    "التمرين الأولى",
    "التمرين الثانية",
    "التمرين الثالثة",
    "التمرين الرابعة",
    "التمرين الخامسة",
    "التمرين السادسة",
    "التمرين السابعة",
    "التمرين الثامنة",
    "التمرين التاسعة",
    "التمرين العاشرة",
    "التمرين الحادية عشرة",
    "التمرين الثانية عشرة",
    "التمرين الثالثة عشرة",
    "التمرين الرابعة عشرة",
    "التمرين الخامسة عشرة",
    "التمرين السادسة عشرة",
    "التمرين السابعة عشرة",
    "التمرين الثامنة عشرة",
    "التمرين التاسعة عشرة",
    "التمرين العشرين",
  ];

  const meals= [
    {
      name: "الوجبة الاولى",
      extra: [
        {
          name: "الوجبة الاولى",
          details: "",
          calories: "",
          image: "",
        },
      ],
    },
    {
      name: "الوجبة الثانية",
      extra: [
        {
          name: "الوجبة الثانية",
          details: "",
          calories: "",
          image: "",
        },
      ],
    }
  ]
  const workout = [
    {
      name: "التمرين الأولى",
      extra: [
        {
          name: "الوجبة الاولى",
          details: "",
          calories: "",
          image: "",
        },
      ],
    },
    {
      name: "التمرين الثانية",
      extra: [
        {
          name: "الوجبة الثانية",
          details: "",
          calories: "",
          image: "",
        },
      ],
    }
  ]

  // const [mealz,setMealz] = useState([
  //   {
  //     name: "الوجبة الاولى",
  //     extra: [
  //       {
  //         name: "الوجبة الاولى",
  //         details: "",
  //         calories: "",
  //         image: "",
  //       },
  //     ],
  //   },
  //   {
  //     name: "الوجبة الثانية",
  //     extra: [
  //       {
  //         name: "الوجبة الثانية",
  //         details: "",
  //         calories: "",
  //         image: "",
  //       },
  //     ],
  //   }
  // ])

  function addExtraMeal(arrayHelpers) {
    arrayHelpers.push({
      name: programType === "برنامج غذائى" ? subMealsTitle[arrayHelpers.form.values.meals.length] : subWorkOutTitle[arrayHelpers.form.values.meals.length],
      extra: [
        {
          name: "الوجبة الاولى",
          details: "",
          calories: "",
          image: "",
        },
      ],
    },);
    // setMealz(prev=>{
    //   return([
    //     ...prev,
    //     {
    //       name: programType === "برنامج غذائى" ? subMealsTitle[arrayHelpers.form.values.meals.length] : subWorkOutTitle[arrayHelpers.form.values.meals.length],
    //       extra: [
    //         {
    //           name: "الوجبة الاولى",
    //           details: "",
    //           calories: "",
    //           image: "",
    //         },
    //       ],
    //     }
    //   ]
    //   )
    // })
  }


  function deleteMeal(arrayHelpers, index) {
    // arrayHelpers.remove(index);
    arrayHelpers.remove(arrayHelpers.form.values.meals.length-1);
  }

  // schema
  const schema = Yup.object().shape({
    program: Yup.string().required("this_field_is_required"),
  });

  const mealNumber = ["الوجبة الاولي", "الوجبة الثانية"];
  const radioLabels = ["برنامج غذائى", "برنامج رياضى", "برنامج نفسى","مكملات"];

  const [programType,setProgramType] = useState("برنامج غذائى")

  return (
    <Formik
      enableReinitialize
      initialValues={{
        program: "",
        program_type: programType,
        meals: programType === "برنامج غذائى" ? meals : workout,
      }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form>
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
                  marginBottom:"20px"
                }}
              >
              <i className="las la-plus icon" style={{fontSize:"20px"}}></i>
                <span>{t("import_program")}</span>  
              </Btn>
            <RadioBoxInput
            checked = {values.program_type}
            options={radioLabels}
            basic={true}
            name="program_type"
            onChange= {(name, value) => {console.log(name, value); setProgramType((value))}}
            />
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
              <FieldArray
                  name={`meals`}
                  render={(arrayHelpers) => (
              <div>
              {values.meals.map((meal, index) => (
                <Accordion.Item
                  eventKey={meal.name + index}
                  key={meal.name + index}
                >
                  <Accordion.Header>{meal.name}</Accordion.Header>
                  <Accordion.Body>
                        <div>
                          {meal.extra.map((extraMeal, idx) => (
                            <div
                              key={index + "--" + idx}
                              className={`add-program-extra-meal ${
                                idx > 0 ? "add-program-extra-meal-border" : ""
                              }`}
                            >
                              <div style={{display:"flex",justifyContent:'space-between'}}>
                                <div>
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
                                </div>
                                <div onClick={() =>{
                                        deleteMeal(arrayHelpers, index);
                                        console.log()}
                                      } 
                                      className="d-flex justify-content-between gap-3 align-items-center"
                                >
                                    <img
                                      src="/assets/images/trash-icon.svg"
                                      alt="delete meal"
                                      className="cursor-pointer img-fluid"
                                    />
                                    <p style={{margin:"0",color:"var(--secondary)",cursor:"pointer"}}>حذف الوجبه</p>
                                </div>
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
                        </div>
                  </Accordion.Body>
                </Accordion.Item>
                ))}
                <Btn
                  style={{
                    background: "transparent",
                    border: "1px solid #2AD7A1",
                    marginTop: "var(--space-lg)",
                    marginBottom:"var(--space-lg)",
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
