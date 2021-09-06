import React, { useContext } from "react";
import { Modal } from "react-responsive-modal";
import { TestimonialContext } from "../../context/TestimonialContext";

const VideoModal = (props) => {
  const { openModal, close, url, index } = props;

  const {
    state: { currentQuestionIndex },
  } = useContext(TestimonialContext);

  return currentQuestionIndex === index ? (
    <Modal
      open={openModal}
      onClose={close}
      center
      classNames={{
        overlay: "customOverlay",
        modal: "customModal",
      }}
    >
      <video src={url} className="video-modal" autoplay="true" controls />
    </Modal>
  ) : (
    ""
  );
};

export default VideoModal;
