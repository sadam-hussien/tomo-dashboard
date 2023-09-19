import { Form, Formik } from "formik";

import {
  InputsHandler,
  DynamicFileUploaderInput,
  Btn,
  ImageUploaderPreview,
} from "components";

import { add_blogs_fields } from "../constants";

import UploadImage from "./UploadImage";

import { Col, Row } from "react-bootstrap";

import { useTranslation } from "react-i18next";

import { apiAddBlog } from "../server";

import { usePost } from "hooks";

import * as Yup from "yup";

import { apiUploadImage } from "server";

// schema
const schema = Yup.object().shape({
  name: Yup.string().required("this_field_is_required"),
});

export default function Add({ handleClose }) {
  const { t } = useTranslation("common");

  const { mutate, isLoading } = usePost({
    queryFn: (data) => apiAddBlog(data),
    onSuccess: () => handleClose(),
    queryKey: "get-blogs",
  });

  function handleSubmit(values) {
    mutate(values);
  }
  // image uploading
  const { mutate: mutateImageUploading, isLoading: isLoadingImageUploading } =
    usePost({
      queryFn: apiUploadImage,
    });

  return (
    <Formik
      initialValues={{
        show: true,
        name: "",
        images: [],
        feature_image: "",
        body: "",
        type: "image_with_blog",
      }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form>
          <Row>
            {add_blogs_fields.map((item) => (
              <Col key={item.id} xs={12} md={item.col}>
                {item.type === "file" ? (
                  item.multiple ? (
                    <DynamicFileUploaderInput
                      item={item}
                      serverCallback={mutateImageUploading}
                    >
                      <ImageUploaderPreview
                        multiple={item.multiple}
                        isLoading={isLoadingImageUploading}
                      />
                    </DynamicFileUploaderInput>
                  ) : (
                    <DynamicFileUploaderInput
                      item={item}
                      serverCallback={mutateImageUploading}
                    >
                      <UploadImage />
                    </DynamicFileUploaderInput>
                  )
                ) : item.name === "body" ? (
                  values.type === "image_with_blog" && (
                    <InputsHandler item={item} translation="common" />
                  )
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
              disabled={isLoading}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}
