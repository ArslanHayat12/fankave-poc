import React, { useContext } from "react";

import { HomeScreen } from "./HomeScreen/HomeScreen";
import RecordScreen from "./RecordScreen/RecordScreen";
import { ThankYouScreen } from "./ThankYouScreen/ThankYouScreen";
import { VideoQuestionScreen } from "./VideoQuestionScreen/VideoQuestionScreen";
import {
  VIDEO_QUESTIONS_SCREEN,
  RECORD_SCREEN,
  THANK_YOU_SCREEN,
  PREVIEW_SCREEN,
} from "../constants";
import { TestimonialContext } from "../context/TestimonialContext";
import PreviewTestimonialScreen from "./PreviewTestimonialScreen/PreviewTestimonialScreen";

export const TestimonialApp = () => {
  const {
    state: { screen },
  } = useContext(TestimonialContext);
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
