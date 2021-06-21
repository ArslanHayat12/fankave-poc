import React, { useContext } from "react";
import RecordingCard from "../../components/RecordingCard/RecordingCard";
import { TestimonialContext } from "../../context/TestimonialContext";
import { setTestimonialType } from "../../actions/action";
import { useHistory } from "react-router-dom";
import "./style.css";

const HomeScreen = () => {
  const { state, dispatch } = useContext(TestimonialContext);
  const history = useHistory();

  const onVideoClick = () => {
    dispatch(setTestimonialType("video"));
    history.push("/TestimonialScreen");
  };

  const onAudioClick = () => {
    dispatch(setTestimonialType("audio"));
    history.push("/TestimonialScreen");
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

export default HomeScreen;
