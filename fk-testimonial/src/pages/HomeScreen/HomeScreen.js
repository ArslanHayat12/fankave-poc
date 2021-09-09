import React, { useContext, useEffect } from "react";
import { ThemeContext } from "styled-components";

import RecordingCard from "../../components/RecordingCard/RecordingCard";
import { TestimonialContext } from "../../context/TestimonialContext";
import {
  TESTIMONIAL_SCREEN,
  SET_QUESTION,
  SET_TYPE,
  SET_SCREEN,
  VIDEO_QUESTIONS_SCREEN,
  RECORD_SCREEN,
} from "../../constants";
import { HomeScreenStyled } from "./style";

export const HomeScreen = () => {
  const { state, dispatch } = useContext(TestimonialContext);
  const theme = useContext(ThemeContext);

  const {
    default: {
      widget: {
        flowType,
        homeScreen: {
          videoBox: { display: displayVideoCard },
          audioBox: { display: displayAudioCard },
          imageCaptureBox: { display: displayCaptureCard },
          imageUploadBox: { display: displayUploadCard },
          heading,
        },
        recordingScreen: {
          video: {
            questionDetails,
            videoChunks: { available: videoChunks },
          },
        },
      },
    },
  } = theme;

  const onVideoClick = () => {
    if (videoChunks) {
      if (flowType === "no-listing") {
        dispatch({
          type: SET_SCREEN,
          payload: RECORD_SCREEN,
        });
      } else {
        dispatch({
          type: SET_SCREEN,
          payload: VIDEO_QUESTIONS_SCREEN,
        });
      }
    } else {
      dispatch({
        type: SET_SCREEN,
        payload: RECORD_SCREEN,
      });
    }

    dispatch({
      type: SET_TYPE,
      payload: "video",
    });
  };

  const onAudioClick = () => {
    dispatch({
      type: SET_TYPE,
      payload: "audio",
    });

    dispatch({
      type: SET_SCREEN,
      payload: RECORD_SCREEN,
    });
  };

  const onCaptureClick = () => {
    dispatch({
      type: SET_TYPE,
      payload: "capture",
    });

    dispatch({
      type: SET_SCREEN,
      payload: RECORD_SCREEN,
    });
  };

  const onUploadClick = () => {
    dispatch({
      type: SET_TYPE,
      payload: "upload",
    });

    dispatch({
      type: SET_SCREEN,
      payload: RECORD_SCREEN,
    });
  };

  useEffect(() => {
    const questions = questionDetails.map((question, index) => ({
      questionIndex: index,
      duration: 0,
      question,
      thumbUrl: "",
      url: "",
      isAnswered: false,
    }));
    dispatch({ type: SET_QUESTION, payload: questions });
  }, []);

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
