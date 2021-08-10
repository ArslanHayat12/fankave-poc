import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useContext,
} from "react";
import Webcam from "react-webcam";
import { isMobile } from "react-device-detect";
import { TestimonialContext } from "../../context/TestimonialContext";
import NotificationCard from "../NotificationCard/NotificationCard";
import { CustomTooltip as Tooltip } from "../Tooltip/Tooltip";
import QuestionsCard from "../QuestionsCard/QuestionsCard";
import { StopIcon, RecordingIcon } from "../../assets";
import { useInterval } from "../../hooks/useInterval";
import { convertSecondsToHourMinute } from "../../utils";
import {
  SET_URL,
  SET_URL_DURATION,
  SET_THUMB_URL,
  SET_RECORD_CHUKS,
} from "../../constants";
import "./style.css";

export const VideoRecorder = () => {
  const { dispatch } = useContext(TestimonialContext);
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  const [isStreamInit, setIsStreamInit] = useState(false);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [videoURL, setVideoURl] = useState("");
  const [error, setError] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [recordingTime, setTime] = useState(0);
  const recordingTimeRef = useRef();
  recordingTimeRef.current = recordingTime;

  useInterval(() => {
    capturing && setTime(recordingTime + 1);
  }, 1000);

  const videoWidth =
    window.innerWidth > 0 ? window.innerWidth : window.screen.width;

  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    let options = { mimeType: "video/webm" };
    if (typeof MediaRecorder.isTypeSupported == "function") {
      if (MediaRecorder.isTypeSupported("video/webm")) {
        options = { mimeType: "video/webm" };
      } else if (MediaRecorder.isTypeSupported("video/mp4")) {
        //Safari 14.0.2 has an EXPERIMENTAL version of MediaRecorder enabled by default
        options = { mimeType: "video/mp4" };
      }
    }
    mediaRecorderRef.current = new MediaRecorder(
      webcamRef.current.stream,
      options
    );
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStopCaptureClick = useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
    dispatch({
      type: SET_THUMB_URL,
      payload: webcamRef?.current?.getScreenshot(),
    });
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  const showAccessBlocked = useCallback((err) => {
    typeof err === "object"
      ? setError("Access Blocked") && setShowNotification(true)
      : setError(err);
  }, []);

  useEffect(() => {
    //webm type video file created
    if (recordedChunks.length) {
      let options = { type: "video/webm" };
      if (typeof MediaRecorder.isTypeSupported == "function") {
        if (MediaRecorder.isTypeSupported("video/webm")) {
          options = { type: "video/webm" };
        } else if (MediaRecorder.isTypeSupported("video/mp4")) {
          //Safari 14.0.2 has an EXPERIMENTAL version of MediaRecorder enabled by default
          options = { type: "video/mp4" };
        }
      }

      const blob = new Blob(recordedChunks, options);

      let url = window.URL.createObjectURL(blob);
      try {
        url = window.webkitURL.createObjectURL(blob);
      } catch {
        url = window.URL.createObjectURL(blob);
      }
      setVideoURl(url);
      dispatch({
        type: SET_URL,
        payload: url,
      });
      dispatch({
        type: SET_RECORD_CHUKS,
        payload: recordedChunks,
      });
    }
  }, [recordedChunks]);

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
    <article className="video-recorder-wrapper" id="fk-video-recorder-wrapper">
      <figure className="video-wrapper">
        <div className="video-recording-container">
          {!videoURL && (
            <Webcam
              ref={webcamRef}
              videoConstraints={{
                width: isMobile
                  ? undefined
                  : videoWidth > 400
                  ? 333
                  : videoWidth > 360
                  ? 313
                  : 298,
                height: isMobile ? undefined : 350,
                facingMode: "user",
              }}
              width={videoWidth > 400 ? 333 : videoWidth > 360 ? 313 : 298}
              height={350}
              style={{ objectFit: "cover" }}
              onUserMedia={() => setIsStreamInit(true)}
              onUserMediaError={showAccessBlocked}
            />
          )}
          {error && (
            <NotificationCard
              openModal={error ? true : false}
              //   handlePermission={allowCameraPermission}
            />
          )}
        </div>

        <article className="testimonial-questions-wrapper">
          <QuestionsCard />
        </article>
      </figure>
      {capturing && (
        <div className="timer-button-container">
          <article className="video-timer">
            {" "}
            {convertSecondsToHourMinute(String(recordingTime))}
          </article>
          <div className="stop-button-container">
            <Tooltip content="Stop" placement="right">
              <button onClick={handleStopCaptureClick} className="stop-button">
                <StopIcon />
              </button>
            </Tooltip>
          </div>
        </div>
      )}
      {isStreamInit && !capturing && (
        <div className="button-container">
          <Tooltip content="Record" placement="right">
            <button onClick={handleStartCaptureClick} className="record-button">
              <RecordingIcon customClass="video-play-icon" />
            </button>
          </Tooltip>
        </div>
      )}
    </article>
  );
};
