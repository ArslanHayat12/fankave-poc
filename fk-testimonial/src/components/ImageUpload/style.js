import styled from 'styled-components'

export const ImageCaptureWrapperStyled = styled.article`
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

  .capture-button {
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
`

export const ImageProcessorWrapperStyled = styled.article`
  display: grid;
  position: relative;
  .image-container {
  }
  .actions {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
    .continue {
    }
    .back {
    }
  }
`

export const ImagePreviewStyled = styled.article`
  display: grid;
  position: relative;
  .image-container {
  }
  .actions {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
    .continue {
    }
    .back {
    }
  }
`
