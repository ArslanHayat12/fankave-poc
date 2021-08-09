import React, { useContext } from "react";
import { ThemeContext } from "styled-components";

import { RecordingCardStyled } from "./style";
import { CameraIcon, MicIcon } from "../../assets/index";

const RecordingCard = (props) => {
  const { recordingType, handleClick } = props;
  const theme = useContext(ThemeContext);
  console.log("theme-----", theme);
  const {
    default: {
      widget: {
        homeScreen: {
          videoBox: { icon: cameraIcon },
          audioBox: { icon: micIcon },
        },
      },
    },
  } = theme;
  const description =
    recordingType === "video" ? "RECORD VIDEO" : "RECORD AUDIO";
  const icon = recordingType === "video" ? <CameraIcon /> : <MicIcon />;

  return (
    <RecordingCardStyled
      className="card-wrapper"
      onClick={handleClick}
      id="fk-card-wrapper"
    >
      {cameraIcon ? (
        <img src={recordingType === "video" ? cameraIcon : micIcon} />
      ) : (
        { icon }
      )}
      <p className="card-description">{description}</p>
    </RecordingCardStyled>
  );
};

export default RecordingCard;
