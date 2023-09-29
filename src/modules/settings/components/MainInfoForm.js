import {
  Btn,
  CustomDateInput,
  DateInput,
  DynamicFileUploaderInput,
  InputWithIcon,
  SelectBox,
} from "components";

import { Form, Formik } from "formik";

import { usePost } from "hooks";

import { Col, Row } from "react-bootstrap";

import { useTranslation } from "react-i18next";

import { apiUploadImage } from "server";

import ChangeProfileImage from "./ChangeProfileImage";

import { languagesOptions } from "constants";

import { components } from "react-select";

export default function MainInfoForm() {
  const { t } = useTranslation("common");

  // image uploading
  const { mutate: mutateImageUploading, isLoading: isLoadingImageUploading } =
    usePost({
      queryFn: apiUploadImage,
    });

  const Item = (props) => {
    return (
      <div className="d-flex align-items-center gap-3">
        <img src={props?.data?.image} alt="" className="img-fluid" />
        <span className="text-capitalize">{props?.data?.label}</span>
      </div>
    );
  };

  const LanguageOptions = (props) => {
    return (
      <components.Option {...props}>
        <Item {...props} />
      </components.Option>
    );
  };

  const LanguageValue = (props) => {
    return (
      <components.SingleValue {...props}>
        <Item {...props} />
      </components.SingleValue>
    );
  };

  function handleSubmit(values) {
    console.log(values);
  }
  return (
    <div>
      <h5 className="profile-title">{t("personal_info")}</h5>
      <h6 className="profile-subtitle">{t("personal_info_subtitle")}</h6>
      <Formik
        initialValues={{
          name: "",
          phone: "",
          email: "",
          birth_of_date: "",
          image: "",

          lang: "",
        }}
        onSubmit={handleSubmit}
      >
        {({ handleReset }) => (
          <Form>
            <Row className="gx-5">
              <Col md={6}>
                <div className="setting-input-container">
                  <InputWithIcon
                    label={t("profile_username")}
                    type="text"
                    name="name"
                    id="profile-user-name"
                    noBorder
                    icon="las la-edit"
                    placeholder={t("profile_username")}
                    containerStyle={{
                      flexDirection: "row-reverse",
                    }}
                  />
                </div>
              </Col>

              <Col md={6}>
                <div className="setting-input-container">
                  <InputWithIcon
                    label={t("profile_phone")}
                    type="text"
                    name="phone"
                    id="profile-user-phone"
                    noBorder
                    icon="las la-edit"
                    placeholder={t("profile_phone")}
                    containerStyle={{
                      flexDirection: "row-reverse",
                    }}
                  />
                </div>
              </Col>

              <Col md={6}>
                <div className="setting-input-container">
                  <InputWithIcon
                    label={t("profile_useremail")}
                    type="email"
                    name="email"
                    id="profile-user-email"
                    noBorder
                    icon="las la-edit"
                    placeholder={t("profile_useremail")}
                    containerStyle={{
                      flexDirection: "row-reverse",
                    }}
                  />
                </div>
              </Col>

              <Col md={6}>
                <div className="setting-input-container">
                  <CustomDateInput
                    name="birth_of_date"
                    id="profile-user-birth-of-date"
                    placeholder={t("profile_birth_of_date")}
                    label={t("profile_birth_of_date")}
                    noBorder
                    containerStyle={{
                      flexDirection: "row-reverse",
                    }}
                  />
                </div>
              </Col>
            </Row>

            <div className="profile-page-divider"></div>

            <Row className="gx-5">
              <Col xs={12}>
                <div className="setting-input-container d-flex align-items-center justify-content-between flex-wrap gap-3">
                  <label className="input-with-icon-label text-capitalize">
                    {t("profile_avatar")}
                  </label>

                  <DynamicFileUploaderInput
                    item={{
                      name: "image",
                      id: "profile-user-avatar",
                    }}
                    serverCallback={mutateImageUploading}
                  >
                    <ChangeProfileImage />
                  </DynamicFileUploaderInput>
                </div>
              </Col>
            </Row>

            <div className="profile-page-divider"></div>

            <h5 className="profile-title">{t("global_info")}</h5>
            <h6 className="profile-subtitle">{t("global_info_subtitle")}</h6>

            <Row className="gx-5 align-items-center">
              <Col md={6}>
                <label className="input-with-icon-label text-capitalize">
                  {t("profile_language")}
                </label>
              </Col>
              <Col md={6}>
                <SelectBox
                  item={{
                    name: "lang",
                    id: "profile-user-lang",
                    options: languagesOptions,
                    props: {
                      isSearchable: false,
                      defaultValue: languagesOptions[0],
                      components: {
                        Option: LanguageOptions,
                        SingleValue: LanguageValue,
                      },
                    },
                  }}
                  placeholder={t("profile_userlang")}
                />
              </Col>
            </Row>

            <div className="profile-page-divider mt-4"></div>

            <div className="mt-3 d-flex align-items-center justify-content-end gap-4 flex-wrap">
              <Btn
                title={t("save")}
                type="submit"
                style={{
                  height: "50px",
                  width: "133px",
                  fontSize: "var(--font-size-md)",
                }}
                // loading={isLoading}
              />
              <Btn
                title={t("reset")}
                type="button"
                onClick={handleReset}
                classes="transparent"
                style={{
                  height: "50px",
                  width: "133px",
                  fontSize: "var(--font-size-md)",
                }}
                // disabled={isLoading}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
