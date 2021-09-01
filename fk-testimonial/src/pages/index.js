import React, { useContext } from "react";

import { HomeScreen } from "./HomeScreen/HomeScreen";
import { TestimonialScreen } from "./TestimonialScreen/TestimonialScreen";
import { ThankYouScreen } from "./ThankYouScreen/ThankYouScreen";
import { VideoQuestionScreen } from "./VideoQuestionScreen/VideoQuestionScreen";
import {
  VIDEO_QUESTIONS_SCREEN,
  TESTIMONIAL_SCREEN,
  THANK_YOU_SCREEN,
} from "../constants";
import { TestimonialContext } from "../context/TestimonialContext";

export const TestimonialApp = () => {
  const {
    state: { screen },
  } = useContext(TestimonialContext);

  console.log("screen ", screen);
  return screen === VIDEO_QUESTIONS_SCREEN ? (
    <VideoQuestionScreen />
  ) : screen === THANK_YOU_SCREEN ? (
    <ThankYouScreen />
  ) : screen === TESTIMONIAL_SCREEN ? (
    <TestimonialScreen />
  ) : (
    <HomeScreen />
  );
};
