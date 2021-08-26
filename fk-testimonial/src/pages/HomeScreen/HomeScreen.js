import React, { useContext } from "react";
import { ThemeContext } from "styled-components";

import RecordingCard from "../../components/RecordingCard/RecordingCard";
import { TestimonialContext } from "../../context/TestimonialContext";
import { TESTIMONIAL_SCREEN, SET_TYPE, SET_SCREEN } from "../../constants";
import { HomeScreenStyled } from "./style";

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

  const onCaptureClick = () => {
    dispatch({
      type: SET_TYPE,
      payload: "capture",
    });
    dispatch({
      type: SET_SCREEN,
      payload: TESTIMONIAL_SCREEN,
    });
  };

  const onUploadClick = () => {
    dispatch({
      type: SET_TYPE,
      payload: "upload",
    });
    dispatch({
      type: SET_SCREEN,
      payload: TESTIMONIAL_SCREEN,
    });
  };

  const theme = useContext(ThemeContext);

  const {
    default: {
      widget: {
        homeScreen: {
          videoBox: { display: displayVideoCard },
          audioBox: { display: displayAudioCard },
          imageCaptureBox: { display: displayCaptureCard },
          imageUploadBox: { display: displayUploadCard },
          heading,
        },
      },
    },
  } = theme;

  return (
    <HomeScreenStyled id="fk-home-screen">
      <p className="description">{heading}</p>
      <article className="widgets-wrapper">
        {displayVideoCard && (
          <RecordingCard
            recordingType="video"
            handleClick={() => onVideoClick()}
          />
        )}
        {displayAudioCard && (
          <RecordingCard
            recordingType="audio"
            handleClick={() => onAudioClick()}
          />
        )}
        {displayCaptureCard && (
          <RecordingCard
            recordingType="imageCapture"
            handleClick={() => onCaptureClick()}
          />
        )}
        {displayUploadCard && (
          <RecordingCard
            recordingType="imageUpload"
            handleClick={() => onUploadClick()}
          />
        )}
      </article>
    </HomeScreenStyled>
  );
};
