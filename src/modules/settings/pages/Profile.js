import { DynamicFileUploaderInput, InputWithIcon, SelectBox } from "components";
import { Form, Formik } from "formik";
import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function Profile() {
  const { t } = useTranslation("common");
  return (
    <section className="profile-page">
      <h5 className="profile-title">{t("personal_info")}</h5>
      <h6 className="profile-subtitle">{t("personal_info_subtitle")}</h6>

      <Formik initialValues={{}}>
        {() => (
          <Form>
            <Row>
              {/* name  */}
              <Col xs={12}>
                <Row className="row-cols-2 align-items-center">
                  <Col>
                    <label
                      htmlFor="profile-user-name"
                      className="input-with-icon-label text-capitalize"
                    >
                      {t("profile_username")}
                    </label>
                  </Col>
                  <Col>
                    <InputWithIcon
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
                  </Col>
                </Row>
              </Col>
              {/* email  */}
              <Col xs={12}>
                <Row className="row-cols-2 align-items-center">
                  <Col>
                    <label
                      htmlFor="profile-user-email"
                      className="input-with-icon-label text-capitalize"
                    >
                      {t("profile_useremail")}
                    </label>
                  </Col>
                  <Col>
                    <InputWithIcon
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
                  </Col>
                </Row>
              </Col>
              {/* file  */}
              <Col xs={12}>
                <Row className="row-cols-2 align-items-center">
                  <Col>
                    <label
                      htmlFor="profile-user-file"
                      className="input-with-icon-label text-capitalize"
                    >
                      {t("profile_userfile")}
                    </label>
                  </Col>
                  <Col>
                    <DynamicFileUploaderInput
                      item={{ name: "avatar", id: "profile-user-file" }}
                    >
                      <ProfileUploader />
                    </DynamicFileUploaderInput>
                  </Col>
                </Row>
              </Col>
              {/* select  */}
              <Col xs={12}>
                <Row className="row-cols-2 align-items-center">
                  <Col>
                    <label
                      htmlFor="profile-user-lang"
                      className="input-with-icon-label text-capitalize"
                    >
                      {t("profile_userlang")}
                    </label>
                  </Col>
                  <Col>
                    <SelectBox
                      item={{
                        name: "lang",
                        id: "profile-user-lang",
                        options: [{ label: "one", value: "one" }],
                      }}
                      placeholder={t("profile_userlang")}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </section>
  );
}

function ProfileUploader() {
  return <div>upload</div>;
}
