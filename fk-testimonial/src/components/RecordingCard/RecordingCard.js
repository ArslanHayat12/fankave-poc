import React from "react";
import "./style.css";
import { CameraIcon, MicIcon } from "../../assets/index";

const RecordingCard = (props) => {
  const { recordingType, handleClick } = props;
  const description =
    recordingType === "video" ? "RECORD VIDEO" : "RECORD AUDIO";
  const icon = recordingType === "video" ? <CameraIcon /> : <MicIcon />;

  return (
    <a className="card-wrapper" onClick={handleClick}>
      {icon}
      <p className="card-description">{description}</p>
    </a>
  );
};

export default RecordingCard;
