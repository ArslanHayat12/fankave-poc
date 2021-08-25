import React, { useContext } from "react";
import { ThemeContext } from "styled-components";

import { RecordingCardStyled } from "./style";

const RecordingCard = (props) => {
  const { recordingType, handleClick } = props;
  const theme = useContext(ThemeContext);

  const {
    default: {
      widget: {
        homeScreen: {
          videoBox: { icon: cameraIcon, text: videoDescription },
          audioBox: { icon: micIcon, text: audioDescription },
          imageCaptureBox: {
            icon: imageCaptureIcon,
            text: imageCaptureDescription,
          },
          imageUploadBox: {
            icon: imageUploadIcon,
            text: imageUploadDescription,
          },
        },
      },
    },
  } = theme;

  const Description = () => {
    switch (recordingType) {
      case "video":
        return videoDescription;
      case "audio":
        return audioDescription;
      case "imageCapture":
        return imageCaptureDescription;
      case "imageUpload":
        return imageUploadDescription;
      default:
        return videoDescription;
    }
  };

  const Icon = () => {
    switch (recordingType) {
      case "video":
        return cameraIcon;
      case "audio":
        return micIcon;
      case "imageCapture":
        return imageCaptureIcon;
      case "imageUpload":
        return imageUploadIcon;
      default:
        return cameraIcon;
    }
  };

  const description = Description();
  const icon = Icon();

  return (
    <RecordingCardStyled
      className="card-wrapper"
      onClick={handleClick}
      id="fk-card-wrapper"
    >
      <img src={icon} alt="icon" />

      <p className="card-description">{description}</p>
    </RecordingCardStyled>
  );
};

export default RecordingCard;
