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

  .video-recording-container {
    z-index: 2;
  }

  .video-recording-container video {
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
    display: flex;
    border: none;
    background: transparent;
    cursor: pointer;
    border: 1px solid #e85775;
    border-radius: 50%;
    margin: 1px 6px;
    height: 47px;
    width: 47px;
    align-items: center;
    justify-content: center;
  }

  .stop-button-container .stop-button svg {
    width: 12px;
    height: 12px;
  }

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

  @media (max-width: 420px) {
    .video-recording-container {
      height: 100%;
    }

    .video-recording-container video {
      height: 100%;
    }
  }
`;
