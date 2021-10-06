import React, { useMemo, useRef, useContext, useEffect } from "react";
import { useCallback, useState } from "react/cjs/react.development";
import { ThemeContext } from "styled-components";

import { MicIcon, RecordingIcon, StopIcon } from "../../assets";
import { useInterval } from "../../hooks/useInterval";
import useRecorder from "../../utils/useRecorder";
import { Visualizer } from "../AudioVisualizers/Visualizer";
import { CustomAudioPlayer } from "../CustomAudioPlayer/CustomAudioPlayer";
import { CustomTooltip } from "../Tooltip/Tooltip";
import { AudioRecordingStyled } from "./style";

export const AudioRecording = ({ handleAudioStop }) => {
  const [url, setUrl] = useState("");
  const audioRef = useRef();
  const [isAudioPlaying, setAudioPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
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

  const theme = useContext(ThemeContext);
  const {
    widgets: { form },
  } = theme;

  useInterval(() => {
    isAudioPlaying && setRecordingTime(recordingTime + 0.5);
  }, 500);

  const onInitialStart = useCallback(() => {
    setUrl("");
    //setup stream & recorder then start recording
    register(() => {
      startRecording();
      setAudioPlaying(true);
    });
  }, [url]);

  const playButtonHandle = () => {
    switch (status) {
      case "init":
        onInitialStart();
        break;
      case "idle":
        setUrl("");
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
  };

  useEffect(() => {
    if (url !== "") {
      handleAudioStop({
        url: url,
        videoDuration: recordingTime,
      });
    }
  }, [url, recordingTime]);

  const onStop = useCallback(
    (blob, blobUrl) => {
      setUrl(blobUrl);
    },
    [recordingTime]
  );

  const handleStopClick = useCallback(() => {
    setAudioPlaying(false);
    const handleRecordingStop = stopRecording(onStop);
    handleRecordingStop();
  }, [recordingTime]);

  const CurrentButton = useMemo(() => {
    return (
      <>
        {status === "init" || status === "idle" ? (
          <button className="fk-capture-button" onClick={playButtonHandle}>
            <RecordingIcon customClass="play-icon" />
          </button>
        ) : null}

        {status === "recording" || status === "paused" ? (
          <button className="fk-capture-button" onClick={handleStopClick}>
            <StopIcon customClass="stop-icon" />
          </button>
        ) : null}
      </>
    );
  }, [status]);
  return (
    <AudioRecordingStyled
      className="recorder-container"
      id="fk-recorder-container"
    >
      {isAudioPlaying ? (
        <Visualizer stream={stream} isAudioPlaying={isAudioPlaying} />
      ) : (
        <article className="fk-mic-wrapper">
          <span>
            <MicIcon customClass="mic-icon" height="35px" />
          </span>
        </article>
      )}

      {CurrentButton}
    </AudioRecordingStyled>
  );
};
