import React from "react";
import { BackgroundVideoStyled } from "./style";

export const BackgroundVideo = (props) => {
  const { url } = props;

  return (
    <BackgroundVideoStyled>
      <video
        src={url}
        className="background-video"
        autoplay="true"
        muted
        minWidth="100%"
        minHeight="100%"
        id="fk-bg-video"
      />
    </BackgroundVideoStyled>
  );
};

BackgroundVideo.defaultProps = {
  url: "",
};
