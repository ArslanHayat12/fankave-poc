import styled from "styled-components";

export const CaptureStyled = styled.article`
  overflow: hidden;
  display: grid;
  grid-gap: 10px;
  position: relative;
  
  .image-capture {
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

  .pre-capture-filters {
  }

  .camera-error {
    .error {
    }
  }
`;
