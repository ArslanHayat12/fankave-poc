import React, { useContext, useRef, useState } from "react";
import { PlayFilledIcon, PencilIcon } from "../../assets/index";
import ClientDetails from "../../components/ClientDetails/ClientDetails";
import { TestimonialContext } from "../../context/TestimonialContext";
import { setTestimonialUrl, setScreen } from "../../actions/action";
import { THANK_YOU_SCREEN } from "../../constants";
import "./style.css";

const PreviewTestimonialScreen = (props) => {
  const { state, dispatch } = useContext(TestimonialContext);
  const [playVideo, setPlayVideo] = useState(false);
  const { testimonialType } = props;
  const videoRef = useRef(null);

  const onApproveClick = () => {
    dispatch(setScreen(THANK_YOU_SCREEN));
  };

  const onPlayClick = () => {
    if (!playVideo) {
      setPlayVideo(true);
      videoRef.current.play();
    } else {
      setPlayVideo(false);
      videoRef.current.pause();
    }
  };

  const onEdit = () => {
    dispatch(setTestimonialUrl(""));
  };

  return (
    <article className="preview-testimonial-sreen">
      {testimonialType === "video" ? (
        <>
          <h2 className="heading">Preview Video Testimonial </h2>
          <figure className="video-wrapper">
            <button className="edit-testimonial" onClick={onEdit}>
              <PencilIcon />
            </button>
            <video
              ref={videoRef}
              className="video"
              width="100%"
              height="100%"
              disablePictureInPicture
              controlsList="nodownload nofullscreen noremoteplayback"
              onClick={onPlayClick}
            >
              <source src={state.url} />
            </video>
            <button
              className={`play-button ${playVideo ? "hide-icon" : ""}`}
              onClick={onPlayClick}
            >
              <PlayFilledIcon />
            </button>
          </figure>
        </>
      ) : (
        <>
          <h2 className="heading">Preview Audio Testimonial </h2>
          <article className="audio-wrapper">
            <audio controls controlsList="nodownload">
              <source src={state.url} />
            </audio>
            <button className="audio-edit-button" onClick={onEdit}>
              <PencilIcon customClass="edit-icon" />
            </button>
          </article>
        </>
      )}

      <ClientDetails />
      <article className="button-wrapper">
        <button className="approve-button" onClick={onApproveClick}>
          Approve
        </button>
      </article>
    </article>
  );
};

export default PreviewTestimonialScreen;
