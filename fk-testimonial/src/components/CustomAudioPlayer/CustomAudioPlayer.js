import React from "react";
import { PlayButton, Timer, Progress } from "react-soundplayer/components";
import { withCustomAudio } from "react-soundplayer/addons";
import "./style.css";

export const CustomAudioPlayer = withCustomAudio((props) => {
  const { ref, urlDuration } = props;

  return (
    <div ref={ref} className="custom-audio-player" id="fk-audio-player">
      <PlayButton {...props} />
      <Progress {...props} duration={urlDuration} />
      <Timer {...props} duration={urlDuration} />
    </div>
  );
});
