import React, { useContext } from "react";
import RecordingCard from "../../components/RecordingCard/RecordingCard";
import { TestimonialContext } from "../../context/TestimonialContext";
import { setTestimonialType, setScreen } from "../../actions/action";
import { TESTIMONIAL_SCREEN } from '../../constants'
import "./style.css";

export const HomeScreen = () => {
  const { dispatch } = useContext(TestimonialContext);

  const onVideoClick = () => {
    dispatch(setTestimonialType("video"));
    dispatch(setScreen(TESTIMONIAL_SCREEN))
  };

  const onAudioClick = () => {
    dispatch(setTestimonialType("audio"));
    dispatch(setScreen(TESTIMONIAL_SCREEN))
  };

  return (
    <article className="home-screen">
      <p className="description">
        Thank you for sharing your testimonial with us
      </p>
      <RecordingCard recordingType="video" handleClick={() => onVideoClick()} />
      <RecordingCard recordingType="audio" handleClick={()=>onAudioClick()} />
    </article>
  );
};
