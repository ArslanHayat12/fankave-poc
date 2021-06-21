import React, { useEffect, useContext } from "react";
import "./style.css";
import { CameraIcon, MicIcon } from "../../assets/index";
import { TestimonialContext } from "../../context/TestimonialContext";
import { SET_TYPE } from "../../actions/action";

const RecordingCard = (props) => {
  const { recordingType } = props;
  const description =
    recordingType === "video" ? "RECORD VIDEO" : "RECORD AUDIO";
  const icon = recordingType === "video" ? <CameraIcon /> : <MicIcon />;
  const { state, dispatch } = useContext(TestimonialContext);


  return (
    <a className="card-wrapper" href="/TestimonialScreen">
      {icon}
      <p className="card-description">{description}</p>
    </a>
  );
};

export default RecordingCard;
