import { useState, useRef, useCallback, useEffect, useContext } from "react";
import Webcam from "react-webcam";
import { RecordingIcon, StopIcon } from "../../assets";
import { TestimonialContext } from "../../context/TestimonialContext";
import { SET_URL } from "../../constants";
import NotificationCard from "../NotificationCard/NotificationCard";
import "./style.css";

export const VideoRecorder = () => {
  const { dispatch } = useContext(TestimonialContext);
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [isStreamInit, setIsStreamInit] = useState(false)
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [videoURL, setVideoURl] = useState("");
  const [error, setError] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
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
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  const handleRecordAgain = useCallback(() => {
    urlObjectCleanUp();
    setRecordedChunks([]);
    setVideoURl("");
  }, []);

  const showAccessBlocked = useCallback((err) => {
    typeof err === "object"
      ? setError("Access Blocked") && setShowNotification(true)
      : setError(err);
  }, []);

  useEffect(() => {
    //webm type video file created
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      const url = window.URL.createObjectURL(blob);
      setVideoURl(url);
      dispatch({
        type: SET_URL,
        payload: url,
      });
    }
  }, [recordedChunks]);

  const urlObjectCleanUp = useCallback(() => {
    //let browser discard video file reference
    videoURL && window.URL.revokeObjectURL(videoURL);
  }, [videoURL]);

  //clean up video file reference on unmount
  useEffect(() => {
    return () => {
      urlObjectCleanUp();
    };
  }, []);

  //   const allowCameraPermission = () => {
  //     console.log("perm");
  //     setError("");
  //   };

  return (
    <div className="video-recording-container">
      {!videoURL && (
        <>
          <Webcam
            ref={webcamRef}
            mirrored
            videoConstraints={{
              width: 335,
              height: 524,
            }}
            width={335}
            height={524}
            style={{ objectFit: "cover" }}
            onUserMedia={()=>setIsStreamInit(true)}
            onUserMediaError={showAccessBlocked}
          />
          {capturing ? (
            <button onClick={handleStopCaptureClick} className="stop-button">
              <StopIcon />
            </button>
          ) : isStreamInit ? (
            <button onClick={handleStartCaptureClick} className="record-button">
              <RecordingIcon />
            </button>
          ) : null}
        </>
      )}
      {error && (
        <NotificationCard
          openModal={error ? true : false}
          //   handlePermission={allowCameraPermission}
        />
      )}
    </div>
  );
};
