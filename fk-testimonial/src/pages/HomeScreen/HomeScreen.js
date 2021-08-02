import React, { useContext } from "react";

import RecordingCard from "../../components/RecordingCard/RecordingCard";
import { TestimonialContext } from "../../context/TestimonialContext";
import { TESTIMONIAL_SCREEN, SET_TYPE, SET_SCREEN } from "../../constants";
import "./style.css";

export const HomeScreen = () => {
  const { dispatch } = useContext(TestimonialContext);

  const onVideoClick = () => {
    dispatch({
      type: SET_TYPE,
      payload: "video",
    });
    dispatch({
      type: SET_SCREEN,
      payload: TESTIMONIAL_SCREEN,
    });
  };

  const onAudioClick = () => {
    dispatch({
      type: SET_TYPE,
      payload: "audio",
    });
    dispatch({
      type: SET_SCREEN,
      payload: TESTIMONIAL_SCREEN,
    });
  };

  return (
    <article className="home-screen" id="fk-home-screen">
      <p className="description">Select one to record your testimonial</p>
      <RecordingCard recordingType="video" handleClick={() => onVideoClick()} />
      <RecordingCard recordingType="audio" handleClick={() => onAudioClick()} />
    </article>
  );
};
