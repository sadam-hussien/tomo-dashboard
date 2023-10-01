import React from "react";

import ReactDOM from "react-dom";

import { Modal } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";

import { closeModal } from "store/global";

import { modalTypes } from "constants";

export default function ModalEl({
  children,
  edit,
  add,
  view,
  message,
  info,
  measure,
}) {
  // get modal from store
  const dispatch = useDispatch();

  const { modal } = useSelector((state) => state.global);

  const handleClose = () => {
    dispatch(closeModal());
  };

  // handle children
  const ModalChildren = () => {
    if (modal.data.modal_type === modalTypes.add) {
      return React.cloneElement(add, {
        handleClose,
        data: modal,
      });
    } else if (modal.data.modal_type === modalTypes.edit) {
      return React.cloneElement(edit, {
        handleClose,
        data: modal,
      });
    } else if (modal.data.modal_type === modalTypes.view) {
      return React.cloneElement(view, {
        handleClose,
        data: modal,
      });
    } else if (modal.data.modal_type === modalTypes.message) {
      return React.cloneElement(message, {
        handleClose,
        data: modal,
      });
    } else if (modal.data.modal_type === modalTypes.info) {
      return React.cloneElement(info, {
        handleClose,
        data: modal,
      });
    } else if (modal.data.modal_type === modalTypes.measure) {
      return React.cloneElement(measure, {
        handleClose,
        data: modal,
      });
    }
    return React.cloneElement(children, {
      handleClose,
      data: modal,
    });
  };

  const Content = (
    <Modal
      show={modal.isShow}
      onHide={handleClose}
      className="custom-modal"
      dialogClassName={
        modal?.data?.modal_type === modalTypes?.info
          ? "custom-dialog-modal-info"
          : "custom-dialog-modal"
      }
      aria-labelledby="example-custom-modal-styling-title"
      centered
      backdrop="static"
      keyboard={false}
    >
      <div className="modal-container-content">
        <Modal.Header className="d-flex align-items-center justify-content-between">
          <Modal.Title className="text-capitalize">
            {modal.data?.title}
          </Modal.Title>
          <img
            onClick={handleClose}
            src="/assets/images/close-icon.svg"
            alt="close icon"
            className="img-fluid"
          />
        </Modal.Header>
        <Modal.Body className="">
          {modal.isShow && <ModalChildren />}
        </Modal.Body>
      </div>
    </Modal>
  );
  return ReactDOM.createPortal(Content, document.getElementById("root-modal"));
}
