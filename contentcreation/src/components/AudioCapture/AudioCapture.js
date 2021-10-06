import React, { useReducer, useRef } from "react";
import { useContext } from "react";
import { useState } from "react/cjs/react.development";
import { ThemeContext } from "styled-components";
import { MicIcon } from "../../assets";

import { AudioRecorder } from "../AudioRecorder/Recorder";
import { AudioRecording } from "../AudioRecording/AudioRecording";
import { Preview } from "../Preview/Preview";
import { AudioCaptureStyled } from "./styled";

const initialState = {
  recordedAudio: null,
  audioDuration: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "set_recorded_audio":
      return {
        ...state,
        recordedAudio: action.payload,
      };

    case "set_audio_duration":
      return {
        ...state,
        audioDuration: action.payload,
      };

    case "reset_audio":
      return {
        ...state,
        recordedAudio: null,
      };

    default:
      return state;
  }
};

export const AudioCapture = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const audioRef = useRef();

  const theme = useContext(ThemeContext);
  const {
    widgets: { form },
  } = theme;

  const handleAudioStop = (data) => {
    dispatch({
      type: "set_recorded_audio",
      payload: data.url,
    });

    dispatch({
      type: "set_audio_duration",
      payload: data.videoDuration,
    });
  };

  const handleBackButtonClick = () => {
    dispatch({
      type: "reset_audio",
    });
  };

  return (
    <AudioCaptureStyled>
      <h2 className="fk-heading">Audio Capture</h2>
      {!state.recordedAudio ? (
        <AudioRecording handleAudioStop={handleAudioStop} />
      ) : (
        <Preview
          type="audio"
          onApprove={() => {
            alert("Continue");
          }}
          onReProcess={handleBackButtonClick}
          meta={{
            audioRef: audioRef,
            url: state.recordedAudio,
            duration: state.audioDuration,
          }}
          src={state.recordedAudio}
          formMeta={form}
        />
      )}
    </AudioCaptureStyled>
  );
};
