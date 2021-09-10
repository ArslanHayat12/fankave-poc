import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useContext,
} from "react";
import { ThemeContext } from "styled-components";
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
import { getLines } from "./utils";
import { VideoPlayer } from "../VideoPlayer/VideoPlayer";

export const VideoChunksRecorder = () => {
  const { state, dispatch } = useContext(TestimonialContext);

  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const canvasRef = useRef(null)

  const [isStreamInit, setIsStreamInit] = useState(false);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [canvasRecordedChunks, setCanvasRecordedChunks] = useState([]);
  const [videoURL, setVideoURl] = useState("");
  const [error, setError] = useState("");
  const [isNextClicked, setIsNextClicked] = useState(false);
  const [recordingTime, setTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState(3);
  const [showTimeLeft, setShowTimeLeft] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState("")
  console.log("isStreamInit: ", isStreamInit, capturing, canvasRecordedChunks)
  const recordingTimeRef = useRef();
  recordingTimeRef.current = recordingTime;
  const duration = recordingTimeRef.current;

  const tempCanvas = document.createElement("canvas")
  tempCanvas.setAttribute("width", 333)
  tempCanvas.setAttribute("height", 550)
  const tempCanvasContext = tempCanvas.getContext("2d")

  useInterval(() => {
    capturing && setTime(recordingTime + 1);
  }, 1000);

  const handleStartCaptureClick = useCallback(() => {
    setShowTimeLeft(true);
    setCapturing(true);
    captureCanvasVideo()
    webcamRef.current.video.muted = true
  },[webcamRef]);

  useEffect(() => {
    console.log("canvasRef: ", canvasRef.current.stream)
    // if (timeLeft === 0) {
    //   setCapturing(true);
    //   let options = { mimeType: "video/webm" };
    //   if (typeof MediaRecorder.isTypeSupported == "function") {
    //     if (MediaRecorder.isTypeSupported("video/webm")) {
    //       options = { mimeType: "video/webm" };
    //     } else if (MediaRecorder.isTypeSupported("video/mp4")) {
    //       //Safari 14.0.2 has an EXPERIMENTAL version of MediaRecorder enabled by default
    //       options = { mimeType: "video/mp4" };
    //     }
    //   }
    //   mediaRecorderRef.current = new MediaRecorder(
    //     webcamRef.current.stream,
    //     options
    //   );
    //   mediaRecorderRef.current.addEventListener(
    //     "dataavailable",
    //     handleDataAvailable
    //   );
    //   mediaRecorderRef.current.start();
    // }
  }, [webcamRef, setCapturing, mediaRecorderRef, timeLeft]);

  const handleStopCaptureClick = useCallback(() => {
    setIsNextClicked(false);
    mediaRecorderRef.current.stop();
    setCapturing(false);
    dispatch({
      type: SET_THUMB_URL,
      payload: canvasRef?.current?.getScreenshot(),
    });
    dispatch({
      type: SET_QUESTION_THUMB_URL,
      payload: {
        currentQuestionIndex: state.currentQuestionIndex,
        thumbUrl: canvasRef?.current?.getScreenshot(),
        urlDuration: recordingTimeRef.current,
      },
    });
  }, [mediaRecorderRef, canvasRef, setCapturing]);


  useEffect(() => {
    //webm type video file created
    if (!isNextClicked && canvasRecordedChunks.length) {
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
      if (url) {
        dispatch({
          type: SET_SCREEN,
          payload: PREVIEW_SCREEN,
        });
      }
    }
  }, [canvasRecordedChunks, isNextClicked]);

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
    if (showTimeLeft) timeLeft > 0 && setTimeLeft(timeLeft - 1);
  }, 1000);

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

    mediaRecorderRef.current.onpause = function (e) {
      setIsPausedVideo(true)
      // mediaRecorderRef.current.requestData()
    }

    mediaRecorderRef.current.onresume = function () {
      setIsPausedVideo(false)
    }

    mediaRecorderRef.current.ondataavailable = function (e) {
      setCanvasRecordedChunks([...canvasRecordedChunks, e.data]);
    };

    mediaRecorderRef.current.start()
  }

  useEffect(() => {
    webcamRef?.current?.video.play()
    webcamRef?.current?.video.addEventListener("play", computeFrames())
    // computeFrames()
  }, [currentQuestion])

  return (
    <VideoRecorderStyled
      className="video-recorder-wrapper"
      id="fk-video-recorder-wrapper"
    >
      <figure className="video-wrapper">
        {/* <ListingLinkStyled onClick={() => goToListing()}>
          {"< Go to Listing"}
        </ListingLinkStyled> */}
        {showTimeLeft && timeLeft !== 0 && (
          <span className="time-left">{timeLeft}</span>
        )}
        <article className="video-timer">
          {convertSecondsToHourMinute(String(recordingTime))}
        </article>
        <div className="video-recording-container">
          {!videoURL && (
            <VideoPlayer setIsStreamInit={setIsStreamInit} setError={setError} videoHeight={videoHeight} canvasRef={canvasRef} webcamRef={webcamRef} />
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
          <QuestionsCard setCurrentQuestion={setCurrentQuestion} />
        </article>
      </figure>
      {capturing && (
        <div className="timer-button-container">
          <div className="stop-button-container">
            {displayButton ? (
              <button
                onClick={duration > 0 && handleStopCaptureClick}
                className="text-button"
              >
                <DefaultStopIcon customClass="stop-icon" /> {stopText}
              </button>
            ) : (
              <Tooltip content="Stop" placement="right">
                <button
                  onClick={duration > 0 && handleStopCaptureClick}
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
              />
              {recordText}
            </button>
          ) : (
            <Tooltip content="Record" placement="right">
              <button
                onClick={handleStartCaptureClick}
                className={`record-button `}
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
