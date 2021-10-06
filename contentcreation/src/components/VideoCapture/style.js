import styled from "styled-components";

export const VideoCaptureStyled = styled.article`
  overflow: hidden;
  display: grid;
  grid-gap: 10px;
  position: relative;
  .video-capture {
    width: 100%;
    height: 375px;
  }
  .capture-canvas {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
  }
  .capture-overlay {
    position: absolute;
    top: 0;
    left: 0;
    display: grid;
    justify-content: center;
    align-items: center;
    font-size: 50px;
  }

  .timer-overlay {
    position: absolute;
    color: white;
    justify-self: center;
    top: 0;
    right: 0;
  }

  .stop-button {
    background: transparent;
    border: none;
    width: 50px;
    padding: 0;
    justify-self: center;
    cursor: pointer;
  }

  .pre-capture-filters {
  }

  .camera-error {
    .error {
    }
  }
`;
