import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import "./style.css";

export const ConfirmationModal = (props) => {
  const { title, open, onCloseModal, onAccept, type, url, questionIndex } =
    props;
  return (
    <Modal
      id="fk-modal"
      open={open}
      onClose={onCloseModal}
      center
      classNames={{
        overlay: "customOverlay",
        modal: "customModal",
      }}
    >
      {type === "confirmBox" ? (
        <>
          <p className="description">
            Do you want to record a new {title || ""}?
          </p>
          <div className="buttons-container">
            <button className="button accept-button" onClick={onAccept}>
              Yes
            </button>
            <button className="button dismiss-button" onClick={onCloseModal}>
              No
            </button>
          </div>
        </>
      ) : (
        <video
          src={url}
          className="video-modal"
          controls
          minWidth="100%"
          minHeight="100%"
          id=""
        />
      )}
    </Modal>
  );
};
