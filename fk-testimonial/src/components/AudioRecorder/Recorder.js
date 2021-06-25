import { useCallback, useEffect, useState } from "react";
import useRecorder from "../../utils/useRecorder";
import { Visualizer } from "./Visualizer";
import { PauseIcon, PlayIcon, StopIcon } from "../../assets";
import { TestimonialContext } from "../../context/TestimonialContext";
import { useContext } from "react";
import { setTestimonialUrl, setStatus, setStream } from "../../actions/action";

import "./style.css";

export const AudioRecorder = () => {
  const { state, dispatch } = useContext(TestimonialContext);
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
    setAudioPlaying(false);
    dispatch(setStatus(false));
  }, []);

  useEffect(() => {
    if (url) {
      dispatch(setStream(stream));

      dispatch(setTestimonialUrl(url));
    }
  }, [url]);

  const onInitialStart = useCallback(() => {
    setUrl("");
    //setup stream & recorder then start recording
    register(() => {
      startRecording();
      setAudioPlaying(true);
      dispatch(setStatus(true));
    });
  }, [url]);

  const urlObjectCleanUp = useCallback(() => {
    //let browser discard reference to previous audio file
    url && window.URL.revokeObjectURL(url);
  }, [url]);

  //clean up audio file on unmount
  useEffect(() => {
    return () => {
      urlObjectCleanUp();
    };
  }, []);

  const playButtonHandle = useCallback(() => {
    switch (status) {
      case "init":
        //first time click on start: initialize stream & recorder, then start recording
        onInitialStart();

        break;
      case "idle":
        urlObjectCleanUp();
        setUrl("");
        //second time recording an audio i.e. stream & recorder already initialized
        startRecording();
        setAudioPlaying(true);
        dispatch(setStatus(true));
        break;
      case "recording":
        // pause recording
        pauseRecording();
        setAudioPlaying(false);
        dispatch(setStatus(false));
        break;
      case "paused":
        //resume recording
        resumeRecording();
        setAudioPlaying(true);
        dispatch(setStatus(true));
        break;
      default:
        break;
    }
  }, [status]);

  const getPlayButtonIcon = useCallback(() => {
    return status === "recording" ? (
      <PauseIcon />
    ) : status === "paused" ? (
      <PlayIcon customClass="play-icon" />
    ) : (
      <PlayIcon customClass="play-icon" />
    );
  }, [status]);

  return (
    <div className="recorder-container">
      <article className="buttons-wrapper">
        <button className="recording-button" onClick={playButtonHandle}>
          {getPlayButtonIcon()}
        </button>
        {(status === "recording" || status === "paused") && (
          <button className="recording-button" onClick={stopRecording(onStop)}>
            <StopIcon customClass="stop-icon" />
          </button>
        )}
      </article>

      {url && (
        <audio
          controls
          onPlay={() => setAudioPlaying(true)}
          onPause={() => setAudioPlaying(false)}
          onStop={() => setAudioPlaying(false)}
        >
          <source src={url} />
        </audio>
      )}
      <Visualizer stream={stream} isAudioPlaying={isAudioPlaying} />
      {error && <p>{error}</p>}
    </div>
  );
};
