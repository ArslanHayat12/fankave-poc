import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useContext,
} from "react";
import { SelfieSegmentation } from "@mediapipe/selfie_segmentation"
import { Camera } from "@mediapipe/camera_utils"
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
import { Loader } from "../LoaderOverlay/Loader";

export const VideoRecorder = () => {
  const { dispatch } = useContext(TestimonialContext);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const selfieSegmentationRef = useRef(null)
  const backgroundImgRef = useRef(null)

  const [isModelLoading, setIsModelLoading] = useState(false)
  const [filterType, setFilterType] = useState('none')
  const [isStreamInit, setIsStreamInit] = useState(false);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [videoURL, setVideoURl] = useState("");
  const [error, setError] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [recordingTime, setTime] = useState(0);
  const recordingTimeRef = useRef();
  recordingTimeRef.current = recordingTime;

  const filterTypeRef = useRef(filterType)

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
    const videoStream = selfieSegmentationRef.current ? canvasRef.current.captureStream() : webcamRef.current.stream;
    if (selfieSegmentationRef.current) {
      videoStream.addTrack(webcamRef.current.stream.getAudioTracks()[0]);
      webcamRef.current.video.muted = true
    }
    mediaRecorderRef.current = new MediaRecorder(
      videoStream,
      options
    );
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef, selfieSegmentationRef]);

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
      payload: selfieSegmentationRef.current ? canvasRef.current.toDataURL("image/webp", 0.92) : webcamRef?.current?.getScreenshot(),
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
      console.log(url)
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

  const cleanUpFunc = () => {
    selfieSegmentationRef.current && selfieSegmentationRef.current.close()
  }

  useEffect(() => {
    return () => {
      dispatchURLDuration();
      cleanUpFunc()
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
            virtualBackground
          },
        },
      },
    },
  } = theme;

  const drawStreamOnCanvas = async () => {
    const videoWidth = webcamRef.current.video.videoWidth
    const videoHeight = webcamRef.current.video.videoHeight

    canvasRef.current.width = videoWidth
    canvasRef.current.height = videoHeight
    const canvasElement = canvasRef.current
    const canvasCtx = canvasElement.getContext("2d")

    canvasCtx.save()
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height)

    canvasCtx.globalCompositeOperation = "copy"
    canvasCtx.filter = `none`
    canvasCtx.drawImage(
      webcamRef.current.video,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    )
    canvasCtx.restore()
  }

  const onResults = (results) => {
    setIsModelLoading(false)
    const videoWidth = webcamRef.current.video.width
    const videoHeight = webcamRef.current.video.height

    canvasRef.current.width = videoWidth
    canvasRef.current.height = videoHeight
    const canvasElement = canvasRef.current
    const canvasCtx = canvasElement.getContext("2d")

    canvasCtx.save()
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height)

    canvasCtx.globalCompositeOperation = "copy"
    canvasCtx.filter = `blur(4px)`
    canvasCtx.drawImage(
      results.segmentationMask,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    )

    canvasCtx.globalCompositeOperation = "source-in"
    canvasCtx.filter = "none"
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    )

    canvasCtx.globalCompositeOperation = "destination-atop"
    canvasCtx.filter = filterTypeRef.current === 'virtual' ? "none" : "blur(5px)"
    canvasCtx.drawImage(
      filterTypeRef.current === 'virtual' ? backgroundImgRef.current : results.image,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    )

    canvasCtx.restore()
  }

  const loadModel = useCallback(()=> {
    setIsModelLoading(true)
    const selfieSegmentation = new SelfieSegmentation({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`
      },
    })
    selfieSegmentationRef.current = selfieSegmentation
    
    selfieSegmentation.setOptions({
      modelSelection: 1,
    })

    selfieSegmentation.onResults(onResults)

    const maskFilterImage = document.createElement("img", {
      ref: backgroundImgRef,
    })
    maskFilterImage.objectFit = "contain"
    maskFilterImage.onload = function () {
      backgroundImgRef.current = maskFilterImage
      webcamRef.current.video.crossOrigin = "anonymous"

      const camera = new Camera(webcamRef.current.video, {
        onFrame: async () => {
          if(webcamRef.current) {
            filterTypeRef.current === 'none' ? await drawStreamOnCanvas() : (
              await selfieSegmentation.send({
                image: webcamRef.current.video,
              }))
          }
        },
        width: webcamRef.current.video.width,
        height: webcamRef.current.video.height,
      })
      camera.start()
    }
    maskFilterImage.src = virtualBackground
  }, [backgroundImgRef, webcamRef, virtualBackground, filterTypeRef])

  const handleChangeFilter = (e)=> {
    setFilterType(e.target.value)
    if(!selfieSegmentationRef.current){
      loadModel()
    }
  }

  useEffect(() => {
    filterTypeRef.current = filterType
  }, [filterType])

  return (
    <VideoRecorderStyled
      className="video-recorder-wrapper"
      id="fk-video-recorder-wrapper"
    >
      <figure className="video-wrapper">
        <div className="video-recording-container">
          {!videoURL && (
            <>
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
              <canvas 
                ref={canvasRef} 
                className="output-canvas"
                width={isMobile
                  ? undefined
                  : videoWidth > 400
                    ? 333
                    : videoWidth > 360
                      ? 313
                      : 298}
                height={isMobile ? undefined : videoHeight}
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
          <QuestionsCard />
        </article>
      </figure>
      {isStreamInit && !capturing && (
        <div className="select-bg">
          <label>
            <input
              type="radio"
              value="none"
              checked={filterType === 'none'}
              onChange={handleChangeFilter}
            />
            None
          </label>
          <label>
            <input
              type="radio"
              value="blur"
              checked={filterType === 'blur'}
              onChange={handleChangeFilter}
            />
            Blur Background
          </label>
          <label>
            <input
              type="radio"
              value="virtual"
              checked={filterType === 'virtual'}
              onChange={handleChangeFilter}
            />
            Virtual Background
          </label>
        </div>
      )}
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
      {isModelLoading && <Loader/>}
    </VideoRecorderStyled>
  );
};
