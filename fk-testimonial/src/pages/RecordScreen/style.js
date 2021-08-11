import styled from "styled-components";
export const RecordingScreenStyled = styled.article`
  width: 100%;
  height: 100%;
  z-index: 1;

  .video {
    position: relative;
    width: 100%;
    height: 500px;
    border-radius: 8px;

    object-fit: cover;
  }

  video {
    border-radius: 8px;
  }

  .video-wrapper:after {
    position: absolute;
    content: "";
    background-image: linear-gradient(to bottom, rgba(32, 42, 98, 0), #1a1e33);
    left: 0;
    right: 0;
    height: 200px;
    bottom: 0;
    border-radius: 8px;
  }

  .video-wrapper {
    position: relative;
    height: ${(props) =>
      props.theme.default.widget.recordingScreen.video.height}px;
    margin: 15px 0 0;
    border: 1px solid #c9c9c9;
    border-radius: 8px;
  }

  .audio-wrapper:after {
    position: absolute;
    content: "";
    background-image: linear-gradient(to bottom, rgba(32, 42, 98, 0), #1a1e33);
    left: 0;
    right: 0;
    height: 200px;
    bottom: 0;
    border-radius: 8px;
  }

  .audio-wrapper {
    position: relative;
    height: 462px;
    margin: 15px 0 0;
    border: 1px solid #c9c9c9;
    border-radius: 8px;
  }

  .testimonial-questions-wrapper {
    position: absolute;
    bottom: 5px;
    z-index: 1;
    width: 100%;
  }

  .heading {
    margin-bottom: 0;
    font-size: 25px;
    font-weight: normal;
    margin-top: 0;
    text-align: center;
  }

  .mic-icon path {
    fill: #fff;
  }

  .mic-wrapper {
    background: ${(props) =>
      props.theme.default.widget.recordingScreen.audio.micIcon.background};
    height: 90px;
    width: 90px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 12;
    margin-top: 84px;
  }

  .audio-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    height: 85%;
  }

  .timer {
    margin: 52px 0 15px;
    z-index: 2;
  }
`;
