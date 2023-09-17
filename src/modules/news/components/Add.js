import { Form, Formik } from "formik";

import { InputsHandler, DynamicFileUploaderInput, Btn } from "components";

import { add_news_fields } from "../constants";

import UploadImage from "./UploadImage";

import { Col, Row } from "react-bootstrap";

import { useTranslation } from "react-i18next";

import { apiAddSubscription } from "../server";

import { usePost } from "hooks";

import * as Yup from "yup";
import UploadVideo from "./UploadVideo";

export default function Add({ handleClose }) {
  const { t } = useTranslation("common");

  const { mutate, isLoading } = usePost({
    queryFn: (data) => apiAddSubscription(data),
    onSuccess: () => handleClose(),
  });

  function handleSubmit(values) {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    mutate(formData);
  }

  // schema
  const schema = Yup.object().shape({
    name: Yup.string().required("this_field_is_required"),
    description: Yup.string().required("this_field_is_required"),
    price: Yup.number().required("this_field_is_required"),
    discount: Yup.number().required("this_field_is_required"),
  });

  return (
    <Formik
      initialValues={{
        active: true,
        name: "",
        price: "",
        discount: "",
        image: "",
        discount_status: true,
        description: "",
      }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
          <Row>
            {add_news_fields.map((item) => (
              <Col key={item.id} xs={12} md={item.col}>
                {item.type === "file" ? (
                  <DynamicFileUploaderInput item={item}>
                    <UploadImage />
                  </DynamicFileUploaderInput>
                ): item.type === "video-file" ?(
                  <DynamicFileUploaderInput
                  item={item}
                >
                  <UploadVideo
                    name={item.name}
                    // isLoading={isLoadingImageUploading}
                  />
                </DynamicFileUploaderInput>
              ) : (
                  <InputsHandler item={item} translation="common" />
                )}
              </Col>
            ))}
          </Row>

          <div className="d-flex flex-column gap-3">
            <Btn
              type="submit"
              title={t("save")}
              loading={isLoading}
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
        </Form>
      )}
    </Formik>
  );
}
