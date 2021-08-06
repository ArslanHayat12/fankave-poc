import React from "react";
import { RecordingCardStyled } from "./style";
import { CameraIcon, MicIcon } from "../../assets/index";

const RecordingCard = (props) => {
  const { recordingType, handleClick } = props;
  const description =
    recordingType === "video" ? "RECORD VIDEO" : "RECORD AUDIO";
  const icon = recordingType === "video" ? <CameraIcon /> : <MicIcon />;

  return (
    <RecordingCardStyled
      className="card-wrapper"
      onClick={handleClick}
      id="fk-card-wrapper"
    >
      {icon}
      <p className="card-description">{description}</p>
    </RecordingCardStyled>
  );
};

export default RecordingCard;
