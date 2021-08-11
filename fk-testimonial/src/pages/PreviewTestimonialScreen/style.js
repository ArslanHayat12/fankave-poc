import styled from "styled-components";
export const PreviewScreenStyled = styled.article`
  width: 100%;
  z-index: 1;

  &.audio-preview-screen {
    height: 100%;
  }

  .cross-icon {
    height: 15px;
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
    z-index: 1;
  }

  .heading {
    margin-bottom: 0;
    font-size: 25px;
    font-weight: normal;
    margin-top: 0;
    text-align: center;
  }

  .video-wrapper {
    position: relative;
    margin: 15px 0 0;
    border: 1px solid #c9c9c9;
    border-radius: 8px;
    /* height: 325px; */
    height: ${(props) =>
      props.theme.default.widget.previewScreen.video.height}px;
  }

  .play-button {
    outline: none;
    border: none;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    top: 45%;
    width: 100%;
    background-color: transparent;
    cursor: pointer;
    transform: translate(5px, 0px);
  }

  .video {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    object-fit: cover;
  }

  .edit-testimonial {
    position: absolute;
    right: 5px;
    z-index: 1;
    top: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: #0000009e;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    cursor: pointer;
  }

  .edit-testimonial > svg {
    width: 10px;
    height: 10px;
  }

  .approve-button {
    font-family: "Poppins", sans-serif;
    background-color: ${(props) =>
      props.theme.default.widget.previewScreen.video.button.backgroundColor};
    color: ${(props) =>
      props.theme.default.widget.previewScreen.video.button.color};
    text-transform: ${(props) =>
      props.theme.default.widget.previewScreen.video.button.textTransform};
    width: ${(props) =>
      props.theme.default.widget.previewScreen.video.button.width};
    height: ${(props) =>
      props.theme.default.widget.previewScreen.video.button.height};
    font-size: ${(props) =>
      props.theme.default.widget.previewScreen.video.button.fontSize};
    font-weight: ${(props) =>
      props.theme.default.widget.previewScreen.video.button.fontWeight};
    border-radius: ${(props) =>
      props.theme.default.widget.previewScreen.video.button.borderRadius};
    padding: 8px 20px;
    outline: none;
    border: none;
    cursor: pointer;
    margin-right: 3px;
  }

  .button-wrapper {
    width: 100%;
    margin-top: 10px;
  }

  .hide-icon {
    display: none;
  }

  audio::-webkit-media-controls-panel {
    display: flex;
    flex-direction: row;
    align-items: center;
    /* We use flex-start here to ensure that the play button is visible even
   * if we are too small to show all controls.
   */
    justify-content: flex-start;
    -webkit-user-select: none;
    position: relative;
    width: 100%;
    z-index: 0;
    overflow: hidden;
    text-align: right;
    bottom: auto;
    height: 30px;
    background-color: #35a4ff;
    color: #fff;
    border-radius: 5px;
    /* The duration is also specified in MediaControlElements.cpp and LayoutTests/media/media-controls.js */
    transition: opacity 0.3s;
  }

  audio {
    width: 100%;
    height: 30px;
    color: #fff;
    margin: 30px 0 28px 0;
  }

  .audio-wrapper {
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    font-size: 12px;
    justify-content: space-between;
    height: 120px;
    align-items: flex-end;
    padding: 20px;
    border-radius: 25px;
    padding: 0 15px;
    margin: 30px 0;
    height: 30px;
  }

  .audio-card {
    background: #95bafe;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 17px;
    padding: 15px;
    height: 120px;
    margin-top: 20px;
  }

  .audio-card .mic-icon {
    height: 50px;
    width: 30px;
    margin-top: 30px;
  }

  .preview-audio-canvas {
    display: block;
    position: absolute;
    left: -26px;
    right: -52px;
    bottom: -28px;
    width: 389px;
  }

  .audio-edit-button {
    display: flex;
    cursor: pointer;
    border: none;
    outline: none;
    background-color: transparent;
  }

  /*  .edit-icon {
	position: absolute;
}

 .edit-icon path {
	fill: #000;
}

 .audio-edit-button {
	cursor: pointer;
	border: none;
	outline: none;

	background: #35a4ff;
	height: 30px;
	border-radius: 0 20px 20px 0;
	width: 53px;
	display: flex;
	justify-content: center;
	align-items: center;
	right: 14px;
	position: relative;
	padding: 0;
	margin: 0;
	top: 1px;
} */

  .video-retake-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .text-area {
    height: 50px;
    width: 97%;
    margin-top: 10px;
    resize: none;
  }

  .button-wrapper {
    display: flex;
    align-items: center;
  }

  .share-button {
    border-radius: 50%;
    padding: 4px 5px;
    padding-bottom: 0;
    height: fit-content;
  }

  .error {
    color: red;
    font-size: 14px;
  }
`;
