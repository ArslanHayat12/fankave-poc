import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ThemeContext } from "styled-components";
import QuestionsCard from "../../components/QuestionsCard/QuestionsCard";
import { MicIcon, CrossIcon } from "../../assets/index";
import { AudioRecorder } from "../../components/AudioRecorder/Recorder";
import { TestimonialContext } from "../../context/TestimonialContext";
import { useInterval } from "../../hooks/useInterval";
import { convertSecondsToHourMinute } from "./../../utils/index";
import { RecordingScreenStyled } from "./style";
import { SET_URL_DURATION, RESET_DATA } from "../../constants";
import { VideoRecorder } from "../../components/VideoRecorder/VideoRecorder";
import { VideoChunksRecorder } from "../../components/VideoRecorder/VideoChunksRecorder";

const RecordScreen = () => {
  const { state, dispatch } = useContext(TestimonialContext);
  const [recordingTime, setTime] = useState(0);
  const recordingTimeRef = useRef();
  recordingTimeRef.current = recordingTime;

  useInterval(() => {
    state.status && setTime(recordingTime + 0.5);
  }, 500);

  const dispatchURLDuration = useCallback(() => {
    recordingTimeRef &&
      dispatch({
        type: SET_URL_DURATION,
        payload: recordingTimeRef.current,
      });
  }, [recordingTimeRef]);

  useEffect(() => {
    return () => {
      dispatchURLDuration();
    };
  }, []);

  const theme = useContext(ThemeContext);

  const {
    default: {
      widget: {
        recordingScreen: {
          video: {
            heading: videoScreenHeading,
            nextPreviousButtons: { display: nextPreviousButtonsDisplay },
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
          <article className="timer">
            {convertSecondsToHourMinute(String(recordingTime))}
          </article>

          <AudioRecorder />
          {nextPreviousButtonsDisplay && (
            <article className="testimonial-questions-wrapper">
              <QuestionsCard />
            </article>
          )}
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
