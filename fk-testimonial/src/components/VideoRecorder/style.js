import styled from "styled-components";
export const VideoRecorderStyled = styled.article`
  .button-container {
    display: flex;
    justify-content: center;
    margin: 15px auto 0;
    font-size: 12px;
  }

  .button-container .record-button {
    display: flex;
    background: transparent;
    cursor: pointer;
    border: none;
    align-items: center;
    justify-content: center;
  }

  .output-canvas {
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 1;
    object-fit: cover;
  }

  .video-recording-container {
    z-index: 2;
  }

  .video-recording-container video, .video-recording-container canvas {
    width: 100%;
  }

  .timer-button-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-content: center;
    margin: 15px auto 0;
    font-size: 12px;
    align-items: center;
    padding: 0 12px;
  }

  .timer-button-container .video-timer {
    color: #6d6d6d;
    font-size: 16px;
  }

  .timer-button-container .stop-button-container {
    justify-self: center;
  }

  .stop-button-container .stop-button {
    border: none;
    background: transparent;
  }

  // .stop-button-container .stop-button svg {
  //   width: 12px;
  //   height: 12px;
  // }

  .video-play-icon path {
    fill: #e85775;

    circle {
      fill: #2771ff;
    }
  }

  .video-play-icon {
    width: 47px;
    height: 47px;
  }

  .text-button {
    border-radius: 30px;
    box-shadow: 0px 6px 10px 0 rgba(44, 91, 203, 0.45);
    background-color: #5089ed;
    border: none;
    color: #fff;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 15px;

    .stop-icon {
      width: 15px;
      height: 15px;
    }

    .play-icon {
      width: 20px;
      height: 20px;
    }
  }

  .select-bg {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (max-width: 420px) {
    .video-recording-container {
      height: 100%;
    }

    .video-recording-container video {
      height: 100%;
    }
  }
`;
