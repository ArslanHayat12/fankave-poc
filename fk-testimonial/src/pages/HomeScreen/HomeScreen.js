import React, { useContext } from "react";
import RecordingCard from "../../components/RecordingCard/RecordingCard";
import { TestimonialContext } from "../../context/TestimonialContext";
import { setTestimonialType } from "../../actions/action";
import "./style.css";

const HomeScreen = () => {
  const { state, dispatch } = useContext(TestimonialContext);

  const onVideoClick = () => {
    console.log("click function");
    dispatch(setTestimonialType("video"));
  };

  const onAudioClick = () => {
    dispatch(setTestimonialType("audio"));
    return null;
  };

  return (
    <article className="home-screen">
      <p className="description">
        Thank you for sharing your testimonial with us
      </p>
      <RecordingCard
        recordingType="video"
        onClick={() => onVideoClick}
      />
      <RecordingCard recordingType="audio" onClick={onAudioClick} />
    </article>
  );
};

export default HomeScreen;
