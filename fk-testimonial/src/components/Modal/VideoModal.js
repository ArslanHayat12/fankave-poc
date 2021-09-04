import React, { useState } from "react";
import { Modal } from "react-responsive-modal";

const VideoModal = (props) => {
  const { open, close, url } = props;

  console.log("open", open);

  return (
    <Modal
      open={open}
      onClose={close}
      center
      classNames={{
        overlay: "customOverlay",
        modal: "customModal",
      }}
    >
      <video
        src={url}
        className="video-modal"
        controls
        minWidth="100%"
        minHeight="100%"
        id=""
      />
    </Modal>
  );
};

export default VideoModal;
