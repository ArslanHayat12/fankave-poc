import { useCallback, useEffect, useState } from "react";
import useRecorder from "../../utils/useRecorder";
import { Visualizer } from "./Visualizer";
import { PauseIcon, PlayIcon, StopIcon } from "../../assets";
import { TestimonialContext } from "../../context/TestimonialContext";
import { useContext } from "react";
import { setTestimonialUrl, SET_URL } from "../../actions/action";

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
  }, []);

  useEffect(() => {
    console.log("url in recorder", url);
    if (url) {
      dispatch(setTestimonialUrl(url));
    }
  }, [url]);

  const onInitialStart = useCallback(() => {
    setUrl("");
    //setup stream & recorder then start recording
    register(startRecording);
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
        setAudioPlaying(true);
        break;
      case "idle":
        urlObjectCleanUp();
        setUrl("");
        //second time recording an audio i.e. stream & recorder already initialized
        startRecording();
        setAudioPlaying(true);
        break;
      case "recording":
        // pause recording
        pauseRecording();
        setAudioPlaying(false);
        break;
      case "paused":
        //resume recording
        resumeRecording();
        setAudioPlaying(true);
        break;
      default:
        break;
    }
  }, [status]);

  const getPlayButtonIcon = useCallback(() => {
    return status === "recording" ? (
      <PauseIcon />
    ) : status === "paused" ? (
      <PauseIcon />
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
