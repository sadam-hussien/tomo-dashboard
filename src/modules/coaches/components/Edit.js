import { usePost } from "hooks";

import { useTranslation } from "react-i18next";

import { apiEditCoache } from "../server";

import { apiUploadImage } from "server";

import * as Yup from "yup";

import { Form, Formik } from "formik";

import { Col, Row } from "react-bootstrap";

import { edit_coach_fields } from "../constants";

import { Btn, DynamicFileUploaderInput, InputsHandler } from "components";

import UploadImage from "./UploadImage";

export default function Edit({ handleClose, data }) {
  const { t } = useTranslation("common");

  // submit
  const { mutate, isLoading } = usePost({
    queryFn: (data) => apiEditCoache(data),
    onSuccess: () => handleClose(),
    queryKey: "get-coaches",
  });

  function handleSubmit(values) {
    mutate(values);
  }

  // image uploading
  const { mutate: mutateImageUploading, isLoading: isLoadingImageUploading } =
    usePost({
      queryFn: apiUploadImage,
    });

  // schema
  const schema = Yup.object().shape({
    name: Yup.string().required("this_field_is_required"),
    description: Yup.string().required("this_field_is_required"),
    certification: Yup.string().required("this_field_is_required"),
    experience: Yup.string().required("this_field_is_required"),
    image: Yup.string().required("please_upload_your_image"),
  });

  return (
    <Formik
      initialValues={{
        id: data.data?.id,
        name: data.data?.name || "",
        description: data.data?.description || "",
        certification: data.data?.certification || "",
        image: data.data?.image || "",
        experience: data.data?.experience || "",
      }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
          <Row>
            {edit_coach_fields.map((item) => (
              <Col key={item.id} xs={12} md={item.col}>
                {item.type === "file" ? (
                  <DynamicFileUploaderInput
                    item={item}
                    serverCallback={mutateImageUploading}
                  >
                    <UploadImage
                      name={item.name}
                      isLoading={isLoadingImageUploading}
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
