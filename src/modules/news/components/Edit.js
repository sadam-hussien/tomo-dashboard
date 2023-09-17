import { Form, Formik } from "formik";

import { InputsHandler, DynamicFileUploaderInput, Btn } from "components";

import { edit_news_fields } from "../constants";

import UploadImage from "./UploadImage";

import { Col, Row } from "react-bootstrap";

import { useTranslation } from "react-i18next";

import { apiEditSubscription } from "../server";

import { usePost } from "hooks";

import * as Yup from "yup";

export default function Edit({ handleClose, data: itemData }) {
  const { t } = useTranslation("common");

  const { mutate, isLoading } = usePost({
    queryFn: (data) => apiEditSubscription(data),
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
        active: itemData.data.discount_status || true,
        name: itemData.data.name || "",
        price: itemData.data.price || "",
        discount: itemData.data.discount || "",
        image: itemData.data.image || "",
        discount_status: itemData.data.discount_status || true,
        description: itemData.data.description || "",
        id: itemData.data.id || "",
      }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
          <Row>
            {edit_news_fields.map((item) => (
              <Col key={item.id} xs={12} md={item.col}>
                {item.type === "file" ? (
                  <DynamicFileUploaderInput item={item}>
                    <UploadImage />
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
