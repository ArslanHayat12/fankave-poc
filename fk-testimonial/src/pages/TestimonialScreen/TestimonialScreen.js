import React, { useContext, useEffect } from "react";
import RecordScreen from "../RecordScreen/RecordScreen";
import PreviewTestimonialScreen from "../PreviewTestimonialScreen/PreviewTestimonialScreen";
import { TestimonialContext } from "../../context/TestimonialContext";

const TestimonialScreen = () => {
  const { state, dispatch } = useContext(TestimonialContext);
  
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

export default TestimonialScreen;
