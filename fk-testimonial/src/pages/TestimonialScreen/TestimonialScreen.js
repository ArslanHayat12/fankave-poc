import React, { useContext, useEffect } from "react";
import RecordScreen from "../RecordScreen/RecordScreen";
import PreviewTestimonialScreen from "../PreviewTestimonialScreen/PreviewTestimonialScreen";
import { TestimonialContext } from "../../context/TestimonialContext";

const TestimonialScreen = () => {
  const { state, dispatch } = useContext(TestimonialContext);
  useEffect(() => {console.log("url in testimonial screen", state.url);}, [state.url]);
  
  return (
    <>
      {!state.url ? (
        <>
          {console.log("record screen",state.type)}
          <RecordScreen recordingType={state.type} />
        </>
      ) : (
        <>
          {console.log("preview screen")}
          <PreviewTestimonialScreen testimonialType={state.type} />
        </>
      )}
    </>
  );
};

export default TestimonialScreen;
