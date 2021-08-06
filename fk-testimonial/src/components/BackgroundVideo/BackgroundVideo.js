import React from "react";

export const BackgroundVideo = (props) => {
  const { url, width, height } = props;
  return (
    <video
      src={url}
      className="background-video"
      autoplay="true"
      muted
      minWidth={width}
      minHeight={height}
      id="fk-bg-video"
    />
  );
};

BackgroundVideo.defaultProps = {
  url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  width: "100%",
  height: "100%",
};
