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
  SET_URL_DURATION,
  SET_THUMB_URL,
  SET_RECORD_CHUKS,
} from "../../constants";
import { VideoRecorderStyled } from "./style";
import { getLines } from "./utils";

export const VideoRecorder = () => {
  const { dispatch } = useContext(TestimonialContext);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null)
  const mediaRecorderRef = useRef(null);
  const outputVideoRef = useRef(null)
  const recordingTimeRef = useRef();
  recordingTimeRef.current = recordingTime;

  const tempCanvas = document.createElement("canvas")
  tempCanvas.setAttribute("width", 333)
  tempCanvas.setAttribute("height", 550)
  const tempCanvasContext = tempCanvas.getContext("2d")

  const [currentQuestion, setCurrentQuestion] = useState("0")
  const [isStreamInit, setIsStreamInit] = useState(false);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [canvasRecordedChunks, setCanvasRecordedChunks] = useState([]);
  const [videoURL, setVideoURl] = useState("");
  const [error, setError] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [recordingTime, setTime] = useState(0);

  useInterval(() => {
    capturing && setTime(recordingTime + 1);
  }, 1000);

  const videoWidth =
    window.innerWidth > 0 ? window.innerWidth : window.screen.width;

  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    captureCanvasVideo()
    // let options = { mimeType: "video/webm" };
    // if (typeof MediaRecorder.isTypeSupported == "function") {
    //   if (MediaRecorder.isTypeSupported("video/webm")) {
    //     options = { mimeType: "video/webm" };
    //   } else if (MediaRecorder.isTypeSupported("video/mp4")) {
    //     //Safari 14.0.2 has an EXPERIMENTAL version of MediaRecorder enabled by default
    //     options = { mimeType: "video/mp4" };
    //   }
    // }
    // mediaRecorderRef.current = new MediaRecorder(
    //   webcamRef.current.stream,
    //   options
    // );
    // mediaRecorderRef.current.addEventListener(
    //   "dataavailable",
    //   handleDataAvailable
    // );
    // mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  useEffect(() => {
    webcamRef?.current?.video.play()
    webcamRef?.current?.video.addEventListener("play", computeFrames())
    // computeFrames()
  }, [currentQuestion])

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStopCaptureClick = useCallback(() => {
    // mediaRecorderRef.current.stop();
    setCapturing(false);
    stopCanvasVideo()
    // dispatch({
    //   type: SET_THUMB_URL,
    //   payload: webcamRef?.current?.getScreenshot(),
    // });
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  const showAccessBlocked = useCallback((err) => {
    typeof err === "object"
      ? setError("Access Blocked") && setShowNotification(true)
      : setError(err);
  }, []);

  const captureCanvasVideo = () => {
    const videoStream = canvasRef.current?.captureStream(30);
    videoStream.addTrack(webcamRef.current.stream.getAudioTracks()[0]);
    mediaRecorderRef.current = new MediaRecorder(
      videoStream
    )

    mediaRecorderRef.current.onstop = function (e) {
      var blob = new Blob(canvasRecordedChunks, { 'type': 'video/mp4' });
      setCanvasRecordedChunks([])
      var videoURL = URL.createObjectURL(blob);
      outputVideoRef.current.src = videoURL;
    };

    mediaRecorderRef.current.ondataavailable = function (e) {
      setCanvasRecordedChunks([...canvasRecordedChunks, e.data]);
    };

    mediaRecorderRef.current.start()
  }

  const stopCanvasVideo = () => {
    mediaRecorderRef.current.stop()
  }

  const computeFrames = useCallback(() => {
    // alert("WORKINg")
    const canvasContext = canvasRef.current.getContext("2d")
    tempCanvasContext.drawImage(webcamRef?.current?.video, 0, 0, webcamRef?.current?.video.width, webcamRef?.current?.video.height)
    tempCanvasContext.fillStyle = "#fff"
    tempCanvasContext.textAlign = "center"
    tempCanvasContext.font = 'normal normal 500 19px "Poppins"'

    const currentQuestionSplitted = getLines(tempCanvasContext, currentQuestion, 300).reverse()
    const lineHeight = 40
    currentQuestionSplitted.map((data, index) => {
      tempCanvasContext.fillText(data, (webcamRef?.current?.video.width / 2), webcamRef?.current?.video.height - (lineHeight + ((index + 1) * 30)))
    })

    const frame = tempCanvasContext.getImageData(0, 0, webcamRef?.current?.video.width, webcamRef?.current?.video.height)
    canvasContext.putImageData(frame, 0, 0)

    requestAnimationFrame(computeFrames, 0)
  }, [currentQuestion, canvasRef, webcamRef])

  useEffect(() => {
    //webm type video file created
    if (canvasRecordedChunks.length) {
      let options = { type: "video/webm" };
      if (typeof MediaRecorder.isTypeSupported == "function") {
        if (MediaRecorder.isTypeSupported("video/webm")) {
          options = { type: "video/webm" };
        } else if (MediaRecorder.isTypeSupported("video/mp4")) {
          //Safari 14.0.2 has an EXPERIMENTAL version of MediaRecorder enabled by default
          options = { type: "video/mp4" };
        }
      }

      const blob = new Blob(canvasRecordedChunks, options);

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
        payload: canvasRecordedChunks,
      });
    }
  }, [canvasRecordedChunks]);

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
          },
        },
      },
    },
  } = theme;

  return (
    <VideoRecorderStyled
      className="video-recorder-wrapper"
      id="fk-video-recorder-wrapper"
    >
      <figure className="video-wrapper">
        <div className="video-recording-container">
          {!videoURL && (
            <>
              <canvas
                className="video-canvas"
                ref={canvasRef}
                width={isMobile
                  ? undefined
                  : videoWidth > 400
                    ? 333
                    : videoWidth > 360
                      ? 313
                      : 298}
                height={isMobile ? undefined : videoHeight}
              />
              <Webcam
                ref={webcamRef}
                className="webcam-video"
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
            </>
          )}
          {error && (
            <NotificationCard
              openModal={error ? true : false}
            //   handlePermission={allowCameraPermission}
            />
          )}
        </div>

        <article className="testimonial-questions-wrapper">
          <QuestionsCard setCurrentQuestion={setCurrentQuestion} />
        </article>
      </figure>
      {capturing && (
        <div className="timer-button-container">
          <article className="video-timer">
            {" "}
            {convertSecondsToHourMinute(String(recordingTime))}
          </article>
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
              <DefaultRecordingIcon customClass="play-icon" /> {recordText}
            </button>
          ) : (
            <Tooltip content="Record" placement="right">
              <button
                onClick={handleStartCaptureClick}
                className="record-button"
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
