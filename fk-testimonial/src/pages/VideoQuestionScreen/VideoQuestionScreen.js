import React, { useContext, useCallback } from "react";
import { ThemeContext } from "styled-components";

import { RESET_DATA } from "../../constants";
import { TestimonialContext } from "../../context/TestimonialContext";
import { RecordingScreenStyled } from "../RecordScreen/style";
import { CrossIcon } from "../../assets/index";
import VideoQuestionsListing from "../../components/VideoQuestionsListing/VideoQuestionsListing";

export const VideoQuestionScreen = () => {
  const theme = useContext(ThemeContext);
  const {
    state: { type, status, questions },
    dispatch,
  } = useContext(TestimonialContext);

  const {
    default: {
      widget: {
        recordingScreen: {
          video: { heading: videoScreenHeading },
        },
      },
    },
  } = theme;

  const onBack = useCallback(() => {
    dispatch({
      type: RESET_DATA,
    });
  }, []);

  return (
    <RecordingScreenStyled className="record-screen" id="fk-record-screen">
      <CrossIcon customClass="cross-icon" onClick={onBack} />
      <h2 className="heading">{videoScreenHeading}</h2>
      <VideoQuestionsListing />
    </RecordingScreenStyled>
  );
};
