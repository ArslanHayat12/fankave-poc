import styled from "styled-components";
export const VideoRecorderStyled = styled.article`
  .button-container {
    display: flex;
    justify-content: center;
    margin: 15px auto 0;
    font-size: 12px;
  }

  .time-left {
    color: #fff;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    left: 0;
    right: 0;
    height: 100%;
    font-size: 36px;
  }

  .button-container .record-button {
    display: flex;
    background: transparent;
    cursor: pointer;
    border: none;
    align-items: center;
    justify-content: center;

    &.disable-button {
      pointer-event: none;
      opacity: 0.6;
      cursor: none;
    }
  }

  .record-button .disable-button {
    pointer-event: none;
    opacity: 0.6;
  }

  .video-recording-container {
    z-index: 2;
  }

  .video-recording-container video {
    width: 100%;
  }

  .timer-button-container {
    display: flex;
    justify-content: center;
    margin: 15px auto 0;
    font-size: 12px;
    align-items: center;
    padding: 0 12px;
  }

  .video-timer {
    position: absolute;
    z-index: 1;
    color: #fff;
    top: 5px;
    font-size: 16px;

    margin: auto;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
  }

  .timer-button-container .stop-button-container {
    justify-self: center;
  }

  .stop-button-container .stop-button {
    border: none;
    background: transparent;
    cursor: pointer;
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

  @media (max-width: 420px) {
    .video-recording-container {
      height: 100%;
    }

    .video-recording-container video {
      height: 100%;
    }
  }
`;

export const ListingLinkStyled = styled.span`
  position: absolute;
  color: #fff;
  margin: 5px 10px;
  font-size: 12px;
  z-index: 10;
  cursor: pointer;
`;
