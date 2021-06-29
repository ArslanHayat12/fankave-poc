import { useCallback, useEffect, useState } from "react";
import useRecorder from "../../utils/useRecorder";
import { Visualizer } from "./Visualizer";
import { CustomTooltip } from "../Tooltip/Tooltip";
import { PauseIcon, PlayIcon, StopIcon } from "../../assets";
import { TestimonialContext } from "../../context/TestimonialContext";
import { useContext } from "react";
import { SET_URL, SET_STATUS } from "../../constants";
import NotificationCard from "../NotificationCard/NotificationCard";
import "./style.css";

export const AudioRecorder = () => {
  const { dispatch } = useContext(TestimonialContext);
  const [url, setUrl] = useState("");
  const [isAudioPlaying, setAudioPlaying] = useState(false); // state to show/hide visualizer canvas
  const {
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    register,
    status,
    stream,
    error,
  } = useRecorder();

  //passed to useRecorder stopRecording, receives recorded blob and url
  const onStop = useCallback((blob, blobUrl) => {
    setUrl(blobUrl);
  }, []);

  useEffect(() => {
    if (url) {
      dispatch({
        type: SET_URL,
        payload: url,
      });
    }
  }, [url]);

  const onInitialStart = useCallback(() => {
    setUrl("");
    //setup stream & recorder then start recording
    register(() => {
      startRecording();
      setAudioPlaying(true);
      dispatch({
        type: SET_STATUS,
        payload: true,
      });
    });
  }, [url]);

  const handleStopClick = useCallback(() => {
    setAudioPlaying(false);
    dispatch({
      type: SET_STATUS,
      payload: false,
    });
    const handleRecordingStop = stopRecording(onStop)
    handleRecordingStop()
  }, [])

  const playButtonHandle = useCallback(() => {
    switch (status) {
      case "init":
        //first time click on start: initialize stream & recorder, then start recording
        onInitialStart();
        break;
      case "idle":
        setUrl("");
        //second time recording an audio i.e. stream & recorder already initialized
        startRecording();
        setAudioPlaying(true);
        dispatch({
          type: SET_STATUS,
          payload: true,
        });
        break;
      case "recording":
        // pause recording
        pauseRecording();
        setAudioPlaying(false);
        dispatch({
          type: SET_STATUS,
          payload: false,
        });
        break;
      case "paused":
        //resume recording
        resumeRecording();
        setAudioPlaying(true);
        dispatch({
          type: SET_STATUS,
          payload: true,
        });
        break;
      default:
        break;
    }
  }, [status]);

  const getPlayButton = useCallback(() => {
    return status === "recording" ? (
      <CustomTooltip content="Pause" placement="bottom">
        <button className="recording-button" onClick={playButtonHandle}>
          <PauseIcon customClass="pause-icon" />
        </button>
      </CustomTooltip>
    ) : status === "paused" ? (
      <CustomTooltip content="Resume" placement="bottom">
        <button className="recording-button" onClick={playButtonHandle}>
          <PlayIcon customClass="play-icon" />
        </button>
      </CustomTooltip>
    ) : (
      <CustomTooltip content="Start" placement="bottom">
        <button className="recording-button" onClick={playButtonHandle}>
          <PlayIcon customClass="play-icon" />
        </button>
      </CustomTooltip>
    );
  }, [status]);

  return (
    <div className="recorder-container">
      <article className="buttons-wrapper">
        {getPlayButton()}
        {(status === "recording" || status === "paused") && (
          <CustomTooltip content="Stop" placement="bottom">
            <button
              className="recording-button"
              onClick={handleStopClick}
            >
              <StopIcon customClass="stop-icon" />
            </button>
          </CustomTooltip>
        )}
      </article>

      {isAudioPlaying && (
        <Visualizer stream={stream} isAudioPlaying={isAudioPlaying} />
      )}
      {error && <NotificationCard openModal={error ? true : false} />}
    </div>
  );
};
