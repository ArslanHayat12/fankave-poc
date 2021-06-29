import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import QuestionsCard from "../../components/QuestionsCard/QuestionsCard";
import { RecordingIcon, MicIcon } from "../../assets/index";
import { AudioRecorder } from "../../components/AudioRecorder/Recorder";
import { VideoRecorder } from "../../components/VideoRecorder/VideoRecorder";
import { TestimonialContext } from "../../context/TestimonialContext";
import { useInterval } from "../../hooks/useInterval";
import { convertSecondsToHourMinute } from "./../../utils/index";
import "./style.css";
import { SET_URL_DURATION } from "../../constants";

const RecordScreen = () => {
  const {
    state: { type, status },
    dispatch,
  } = useContext(TestimonialContext);
  const [recordingTime, setTime] = useState(0);
  const recordingTimeRef = useRef();
  recordingTimeRef.current = recordingTime;

  useInterval(() => {
    status && setTime(recordingTime + 0.01);
  }, 1);

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

  return (
    <article className="record-screen">
      {type === "video" ? (
        <>
          <h2 className="heading">Record Video Testimonial</h2>
          <VideoRecorder className="video" />
        </>
      ) : (
        <>
          <h2 className="heading">Record Audio Testimonial</h2>
          <figure className="audio-wrapper">
            <article className="mic-wrapper">
              <MicIcon customClass="mic-icon" height="35px" />
            </article>
            <article className="timer">
              {" "}
              {convertSecondsToHourMinute(String(recordingTime))}
            </article>

            <AudioRecorder />
            <article className="testimonial-questions-wrapper">
              <QuestionsCard />
            </article>
          </figure>
        </>
      )}
    </article>
  );
};

export default RecordScreen;
