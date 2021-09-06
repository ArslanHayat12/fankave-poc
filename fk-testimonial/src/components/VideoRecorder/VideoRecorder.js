import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useContext,
} from "react";
import { ThemeContext } from "styled-components";
import Webcam from "react-webcam";
import { isMobile } from "react-device-detect";
import { TestimonialContext } from "../../context/TestimonialContext";
import NotificationCard from "../NotificationCard/NotificationCard";
import { CustomTooltip as Tooltip } from "../Tooltip/Tooltip";
import QuestionsCard from "../QuestionsCard/QuestionsCard";
import {
  StopIcon,
  RecordingIcon,
  DefaultRecordingIcon,
  DefaultStopIcon,
} from "../../assets";
import { useInterval } from "../../hooks/useInterval";
import { convertSecondsToHourMinute } from "../../utils";
import {
  SET_URL,
  SET_SCREEN,
  SET_URL_DURATION,
  SET_THUMB_URL,
  SET_RECORD_CHUKS,
  VIDEO_QUESTIONS_SCREEN,
  PREVIEW_SCREEN,
  SET_QUESTION_THUMB_URL,
} from "../../constants";
import { VideoRecorderStyled, ListingLinkStyled } from "./style";

export const VideoRecorder = () => {
  const { state, dispatch } = useContext(TestimonialContext);

  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const mediaRecorderRef2 = useRef(null);

  const [isStreamInit, setIsStreamInit] = useState(false);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [singleRecordedChunks, setSingleRecordedChunks] = useState([]);
  const [videoURL, setVideoURl] = useState("");
  const [error, setError] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [isNextClicked, setIsNextClicked] = useState(false);
  const [recordingTime, setTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState(3);

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
    mediaRecorderRef2.current = new MediaRecorder(
      webcamRef.current.stream,
      options
    );
    mediaRecorderRef2.current.addEventListener(
      "dataavailable",
      handleDataAvailableSingle
    );
    mediaRecorderRef2.current.start();
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef, mediaRecorderRef2]);

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [
      setRecordedChunks,
      setSingleRecordedChunks,
      mediaRecorderRef,
      singleRecordedChunks,
      isNextClicked,
    ]
  );
  const handleDataAvailableSingle = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setSingleRecordedChunks((prev) => {
          return prev.concat(data);
        });
        if (mediaRecorderRef2.current.state !== "recording") {
          mediaRecorderRef2.current.start();
        }
      }
    },
    [
      setRecordedChunks,
      setSingleRecordedChunks,
      mediaRecorderRef2,
      singleRecordedChunks,
      isNextClicked,
    ]
  );
  const handleStopCaptureClick = useCallback(() => {
    setIsNextClicked(false);
    if (mediaRecorderRef2.current.state !== "inactive") {
      mediaRecorderRef2.current.requestData();
      // mediaRecorderRef2.current.stop();
    }
    mediaRecorderRef.current.stop();
    setCapturing(false);
    dispatch({
      type: SET_THUMB_URL,
      payload: webcamRef?.current?.getScreenshot(),
    });
    dispatch({
      type: SET_QUESTION_THUMB_URL,
      payload: {
        currentQuestionIndex: state.currentQuestionIndex,
        thumbUrl: webcamRef?.current?.getScreenshot(),
        urlDuration: recordingTimeRef.current,
      },
    });
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  const showAccessBlocked = useCallback((err) => {
    typeof err === "object"
      ? setError("Access Blocked") && setShowNotification(true)
      : setError(err);
  }, []);

  const handleNextPrevClick = useCallback(
    (isPrevious = false) => {
      setIsNextClicked(true);
      if (mediaRecorderRef2.current.state !== "inactive") {
        mediaRecorderRef2.current.requestData();
        mediaRecorderRef2.current.stop();
      }
    },
    [mediaRecorderRef2.current?.state]
  );

  useEffect(() => {
    //webm type video file created
    if (!isNextClicked && recordedChunks.length) {
      let options = { type: "video/webm" };
      if (typeof MediaRecorder.isTypeSupported == "function") {
        if (MediaRecorder.isTypeSupported("video/webm")) {
          options = { type: "video/webm" };
        } else if (MediaRecorder.isTypeSupported("video/mp4")) {
          //Safari 14.0.2 has an EXPERIMENTAL version of MediaRecorder enabled by default
          options = { type: "video/mp4" };
        }
      }
      // console.log(value)
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
      if (url) {
        dispatch({
          type: SET_SCREEN,
          payload: PREVIEW_SCREEN,
        });
      }
    }
  }, [recordedChunks, isNextClicked, singleRecordedChunks]);

  //will be removed in refactoring
  useEffect(() => {
    //webm type video file created
    if (singleRecordedChunks.length) {
      let options = { type: "video/webm" };
      if (typeof MediaRecorder.isTypeSupported == "function") {
        if (MediaRecorder.isTypeSupported("video/webm")) {
          options = { type: "video/webm" };
        } else if (MediaRecorder.isTypeSupported("video/mp4")) {
          //Safari 14.0.2 has an EXPERIMENTAL version of MediaRecorder enabled by default
          options = { type: "video/mp4" };
        }
      }
      const value = [singleRecordedChunks[singleRecordedChunks.length - 1]];

      const blob = new Blob(value, options);

      let url = window.URL.createObjectURL(blob);
      try {
        url = window.webkitURL.createObjectURL(blob);
      } catch {
        url = window.URL.createObjectURL(blob);
      }

      // const blob2 = new Blob(singleRecordedChunks, options);

      // let url2 = window.URL.createObjectURL(blob2);
      // try {
      //   url2 = window.webkitURL.createObjectURL(blob2);
      // } catch {
      //   url2 = window.URL.createObjectURL(blob2);
      // }

      console.log(url);
    }
  }, [singleRecordedChunks]);

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
            height: videoHeight,
            button: {
              display: displayButton,
              startRecording: { text: recordText },
              stopRecording: { text: stopText },
            },
            nextPreviousButtons: { display: nextPreviousButtonsDisplay },
          },
        },
      },
    },
  } = theme;

  const goToListing = () => {
    dispatch({
      type: SET_SCREEN,
      payload: VIDEO_QUESTIONS_SCREEN,
    });
  };

  useInterval(() => {
    timeLeft > 0 && setTimeLeft(timeLeft - 1);
  }, 1000);

  useEffect(() => {
    if (timeLeft == 0) {
      const startVideo = handleStartCaptureClick();
      return startVideo;
    }
  }, [timeLeft]);

  return (
    <VideoRecorderStyled
      className="video-recorder-wrapper"
      id="fk-video-recorder-wrapper"
    >
      <figure className="video-wrapper">
        {/* <ListingLinkStyled onClick={() => goToListing()}>
          {"< Go to Listing"}
        </ListingLinkStyled> */}
        {timeLeft !== 0 && <span className="time-left">{timeLeft}</span>}
        <article className="video-timer">
          {convertSecondsToHourMinute(String(recordingTime))}
        </article>
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
                height: isMobile ? undefined : videoHeight,
                facingMode: "user",
              }}
              width={videoWidth > 400 ? 333 : videoWidth > 360 ? 313 : 298}
              height={videoHeight}
              style={{ objectFit: "cover" }}
              onUserMedia={() => setIsStreamInit(true)}
              onUserMediaError={showAccessBlocked}
            />
          )}
          {/* <video>
            <source url="blob:http://localhost:5000/0e9d0baf-11ca-46aa-8bd2-da8d0752b5d2" />
          </video> */}
          {error && (
            <NotificationCard
              openModal={error ? true : false}
              //   handlePermission={allowCameraPermission}
            />
          )}
        </div>

        <article className="testimonial-questions-wrapper">
          <QuestionsCard handleNextPrevClick={handleNextPrevClick} />
        </article>
      </figure>
      {capturing && (
        <div className="timer-button-container">
          <div className="stop-button-container">
            {displayButton ? (
              <button onClick={handleStopCaptureClick} className="text-button">
                <DefaultStopIcon customClass="stop-icon" /> {stopText}
              </button>
            ) : (
              <Tooltip content="Stop" placement="right">
                <button
                  onClick={handleStopCaptureClick}
                  className="stop-button"
                >
                  <StopIcon />
                </button>
              </Tooltip>
            )}
          </div>
        </div>
      )}
      {isStreamInit && !capturing && (
        <div className="button-container">
          {displayButton ? (
            <button onClick={handleStartCaptureClick} className="text-button">
              <DefaultRecordingIcon
                customClass={`play-icon ${timeLeft > 0 && "disable"}`}
              />{" "}
              {recordText}
            </button>
          ) : (
            <Tooltip content="Record" placement="right">
              <button
                onClick={handleStartCaptureClick}
                className={`record-button ${timeLeft > 0 && "disable-button"}`}
                disabled={true}
              >
                <RecordingIcon customClass="video-play-icon" />
              </button>
            </Tooltip>
          )}
        </div>
      )}
    </VideoRecorderStyled>
  );
};
