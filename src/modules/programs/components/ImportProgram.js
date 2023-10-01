import { useFetch } from "hooks";

import { apiGetPrograms } from "../server";

import { Modal, Spinner } from "react-bootstrap";

import { Formik, Form } from "formik";

import ReactDOM from "react-dom";

import { Btn, SelectBox } from "components";

import { components } from "react-select";

import { useState } from "react";

import * as Yup from "yup";

const schema = Yup.object().shape({
  program: Yup.string().required("this_field_is_required"),
});

export default function ImportProgram({
  importProgram,
  handleClose,
  submitProgram,
}) {
  const [programDetails, setProgramDetails] = useState({});

  const { data, isLoading } = useFetch({
    queryFn: () => apiGetPrograms(),
    queryKey: "get-programs",
  });

  const programsData =
    data?.data?.programs &&
    Array.isArray(data?.data?.programs) &&
    data.data.programs.length &&
    data.data.programs.map((program) => ({
      ...program,
      label: program.name,
      value: program.id,
    }));

  const ProgramOption = (props) => {
    return (
      <components.Option {...props}>
        <div
          className={`import-program-option d-flex align-items-center gap-2 ${
            props.isSelected ? "active" : ""
          }`}
        >
          <span className="import-program-option-circle"></span>
          <span className="import-program-option-text">
            {props?.data?.label}
          </span>
        </div>
      </components.Option>
    );
  };

  function handleSubmit(values) {
    submitProgram(programDetails);
    handleClose();
  }

  const Content = (
    <Modal
      show={importProgram}
      onHide={handleClose}
      className="custom-modal"
      dialogClassName="custom-dialog-modal"
      aria-labelledby="example-custom-modal-styling-title"
      centered
      backdrop="static"
      keyboard={false}
    >
      <div className="modal-container-content">
        <Modal.Header className="d-flex align-items-center justify-content-between">
          <Modal.Title className="text-capitalize">اسم البرنامج</Modal.Title>
          <img
            onClick={handleClose}
            src="/assets/images/close-icon.svg"
            alt="close icon"
            className="img-fluid"
          />
        </Modal.Header>
        <Modal.Body className="">
          <Formik
            initialValues={{ program: "" }}
            onSubmit={handleSubmit}
            validationSchema={schema}
          >
            {({ setFieldValue }) => (
              <Form>
                {isLoading ? (
                  <Spinner
                    as="span"
                    animation="border"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  <div className="choose-program-selectbox">
                    <SelectBox
                      item={{
                        name: "program",
                        id: "import-program",
                        options: programsData,
                        props: {
                          onChange: (option) => {
                            setFieldValue("program", option.value);
                            setProgramDetails(option);
                          },
                          components: {
                            Option: ProgramOption,
                          },
                          styles: {
                            placeholder: (styles) => ({
                              ...styles,
                              textTransform: "capitalize",
                            }),

                            container: (styles) => ({
                              ...styles,
                              height: "56px !important",
                            }),

                            control: (styles) => ({
                              ...styles,
                              paddingInlineStart: "16px",
                            }),
                            valueContainer: (styles) => ({
                              ...styles,
                              padding: 0,
                            }),
                            singleValue: (styles) => ({
                              ...styles,
                              margin: 0,
                            }),
                            option: (styles, state) => ({
                              ...styles,
                              backgroundColor: state.isFocused ? "" : "",
                            }),
                          },
                        },
                      }}
                      placeholder="اختر او اكتب اسم البرنامج"
                    />
                  </div>
                )}
                <div className="mt-5">
                  <Btn
                    type="submit"
                    title="تأكيد"
                    style={{
                      height: "48px",
                      fontSize: "var(--font-size-md)",
                      fontWeight: 500,
                      width: "100%",
                    }}
                  />
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </div>
    </Modal>
  );
  return ReactDOM.createPortal(Content, document.getElementById("root-modal"));
}
