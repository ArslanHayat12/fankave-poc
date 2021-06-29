import {
  PlayButton,
  Timer,
  Progress,
  VolumeControl,
} from "react-soundplayer/components";
import { withCustomAudio } from "react-soundplayer/addons";
import "react-soundplayer/styles/volume.css";
import "./style.css";

export const CustomAudioPlayer = withCustomAudio((props) => {
  const { ref, urlDuration } = props;

  return (
    <div ref={ref} className="custom-audio-player">
      <PlayButton {...props} />
      <Progress {...props} duration={urlDuration} />
      <Timer {...props} duration={urlDuration} />
      <VolumeControl {...props} />
    </div>
  );
});
