import React, { useContext } from "react";
import RecordScreen from "../RecordScreen/RecordScreen";
import Previewsharestoriescreen from "../Previewsharestoriescreen/Previewsharestoriescreen";
import { TestimonialContext } from "../../context/TestimonialContext";

export const sharestoriescreen = () => {
  const { state: { type, url } } = useContext(TestimonialContext);

  return (
    <>
      {!url ? (
        <>
          <RecordScreen />
        </>
      ) : (
        <>
          <Previewsharestoriescreen />
        </>
      )}
    </>
  );
};
