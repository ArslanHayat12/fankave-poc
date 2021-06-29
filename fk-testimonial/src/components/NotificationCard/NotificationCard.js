import React, { useState, useEffect } from "react";
import "react-responsive-modal/styles.css";
import "./style.css";
import { Modal } from "react-responsive-modal";

const NotificationCard = (props) => {
  const { openModal, handlePermission } = props;

  const [open, setOpen] = useState(false);

  const onCloseModal = () => setOpen(false);

  useEffect(() => {
    setOpen(openModal);
  }, [setOpen]);

  return (
    <article className="notification-wrapper">
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        classNames={{
          overlay: "customOverlay",
          modal: "customModal",
        }}
      >
        <p className="description">
          {/* Allow fankave to use camera and microphone */}
          You do not have camera and microphone permissions. Please enable
          permissions manually.
        </p>
        {/* <button className="button" onClick={handlePermission}>
          Allow
        </button>
        <button className="button" onClick={onCloseModal}>
          Dismiss
        </button> */}
      </Modal>
    </article>
  );
};

export default NotificationCard;
