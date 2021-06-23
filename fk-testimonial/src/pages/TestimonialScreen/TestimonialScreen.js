import React, { useContext } from "react";
import RecordScreen from "../RecordScreen/RecordScreen";
import PreviewTestimonialScreen from "../PreviewTestimonialScreen/PreviewTestimonialScreen";
import { TestimonialContext } from "../../context/TestimonialContext";

export const TestimonialScreen = () => {
  const { state } = useContext(TestimonialContext);

  return (
    <>
      {!state.url ? (
        <>
          <RecordScreen recordingType={state.type} />
        </>
      ) : (
        <>
          <PreviewTestimonialScreen testimonialType={state.type} />
        </>
      )}
    </>
  );
};
