import React, { useState, useContext } from "react";
import { Modal } from "react-responsive-modal";
import { TestimonialContext } from "../../context/TestimonialContext";

const VideoModal = (props) => {
  const { openModal, url, index } = props;
  const [open, setOpen] = useState(openModal);

  const {
    state: { currentQuestionIndex },
  } = useContext(TestimonialContext);

  return currentQuestionIndex === index ? (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      center
      classNames={{
        overlay: "customOverlay",
        modal: "customModal",
      }}
    >
      <video src={url} className="video-modal" controls autoplay id="" />
    </Modal>
  ) : (
    ""
  );
};

export default VideoModal;
