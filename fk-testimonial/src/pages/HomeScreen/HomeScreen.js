import React from "react";
import RecordingCard from "../../components/RecordingCard/RecordingCard";
import './style.css'

const HomeScreen = () => {
  return (
    <article className='home-screen'>
      <p className="description">Thank you for sharing your testimonial with us</p>
      <RecordingCard recordingType="video" />
      <RecordingCard recordingType="audio" />
    </article>
  );
};

export default HomeScreen;
