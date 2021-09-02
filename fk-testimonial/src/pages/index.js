import React, { useContext, useEffect } from "react";
import { ThemeContext } from "styled-components";

import { HomeScreen } from "./HomeScreen/HomeScreen";
import RecordScreen from "./RecordScreen/RecordScreen";
import { ThankYouScreen } from "./ThankYouScreen/ThankYouScreen";
import { VideoQuestionScreen } from "./VideoQuestionScreen/VideoQuestionScreen";
import {
  VIDEO_QUESTIONS_SCREEN,
  RECORD_SCREEN,
  THANK_YOU_SCREEN,
  SET_QUESTION,
  PREVIEW_SCREEN,
} from "../constants";
import { TestimonialContext } from "../context/TestimonialContext";
import PreviewTestimonialScreen from "./PreviewTestimonialScreen/PreviewTestimonialScreen";

export const TestimonialApp = () => {
  const {
    state: { screen },
    dispatch,
  } = useContext(TestimonialContext);

  const theme = useContext(ThemeContext);

  const {
    default: {
      widget: {
        recordingScreen: {
          video: { questionDetails },
        },
      },
    },
  } = theme;

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
  }, [questionDetails]);

  return screen === VIDEO_QUESTIONS_SCREEN ? (
    <VideoQuestionScreen />
  ) : screen === THANK_YOU_SCREEN ? (
    <ThankYouScreen />
  ) : screen === RECORD_SCREEN ? (
    <RecordScreen />
  ) : screen === PREVIEW_SCREEN ? (
    <PreviewTestimonialScreen />
  ) : (
    <HomeScreen />
  );
};
