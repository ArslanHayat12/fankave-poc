import React, { useContext } from "react";
import RecordScreen from "../RecordScreen/RecordScreen";
import PreviewTestimonialScreen from "../PreviewTestimonialScreen/PreviewTestimonialScreen";
import { TestimonialContext } from "../../context/TestimonialContext";

export const TestimonialScreen = () => {
  const {
    state: { type, url },
  } = useContext(TestimonialContext);

  return !url ? (
    <>
      <RecordScreen />
    </>
  ) : (
    <>
      <PreviewTestimonialScreen />
    </>
  );
};
