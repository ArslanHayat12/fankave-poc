import React, {
  useCallback,
  useContext,
} from "react";
import { ThemeContext } from "styled-components";
import QuestionsCard from "../../components/QuestionsCard/QuestionsCard";
import { MicIcon, CrossIcon } from "../../assets/index";
import { AudioRecorder } from "../../components/AudioRecorder/Recorder";
import { TestimonialContext } from "../../context/TestimonialContext";
import { RecordingScreenStyled } from "./style";
import { RESET_DATA } from "../../constants";
import { VideoRecorder } from "../../components/VideoRecorder/VideoRecorder";
import { VideoChunksRecorder } from "../../components/VideoRecorder/VideoChunksRecorder";
import { Timer } from "./Timer";

const RecordScreen = () => {
  const { state, dispatch } = useContext(TestimonialContext);

  const theme = useContext(ThemeContext);

  const {
    default: {
      widget: {
        recordingScreen: {
          video: {
            heading: videoScreenHeading,
            videoChunks: { available: recordChunks },
          },
          audio: { heading: audioScreenHeading },
        },
      },
    },
  } = theme;

  const onBack = useCallback(() => {
    dispatch({
      type: RESET_DATA,
    });
  }, []);

  const VideoScreen = () => {
    return (
      <>
        <h2 className="heading">{videoScreenHeading}</h2>
        {recordChunks ? (
          <VideoChunksRecorder />
        ) : (
          <VideoRecorder className="video" />
        )}
      </>
    );
  };

  const AudioScreen = () => {
    return (
      <>
        <h2 className="heading">{audioScreenHeading}</h2>
        <figure className="audio-wrapper">
          <article className="mic-wrapper">
            <MicIcon customClass="mic-icon" height="35px" />
          </article>
          <Timer/>

          <AudioRecorder />

          <article className="testimonial-questions-wrapper">
            <QuestionsCard />
          </article>
        </figure>
      </>
    );
  };

  const CaptureScreen = () => {
    return (
      <>
        <h2 className="heading">Record Image Capture Testimonial</h2>
      </>
    );
  };

  const UploadScreen = () => {
    return (
      <>
        <h2 className="heading">Record Image Upload Testimonial</h2>
      </>
    );
  };

  const RecordingScreen = () => {
    switch (state.type) {
      case "video":
        return VideoScreen();

      case "audio":
        return AudioScreen();

      case "capture":
        return CaptureScreen();

      case "upload":
        return UploadScreen();

      default:
        return VideoScreen();
    }
  };

  return (
    <RecordingScreenStyled className="record-screen" id="fk-record-screen">
      <CrossIcon customClass="cross-icon" onClick={onBack} />
      {RecordingScreen()}
    </RecordingScreenStyled>
  );
};

export default RecordScreen;
