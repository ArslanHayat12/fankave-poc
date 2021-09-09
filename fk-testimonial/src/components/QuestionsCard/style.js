import styled from "styled-components";

export const QuestionCardStyled = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  .questions {
    width: 90%;
    text-align: center;
    line-height: 1.5;
    color: #fff;
    margin-bottom: 0;
    font-size: 19px;
    font-weight: 500;
    margin-bottom: 10px;
  }

  .question-button {
    background: none;
    outline: none;
    border: none;
    color: #35a4ff;
    font-size: 14px;
    cursor: pointer;
    padding: 10px;
  }

  .disabled {
    opacity: 0.3;
    cursor: default;
  }

  .question-buttons-wrapper {
    display: ${(props) =>
      props.theme.default.widget.recordingScreen.video.videoChunks.available
        ? "flex"
        : "grid"};
    grid-template-columns: ${(props) =>
      props.theme.default.widget.recordingScreen.video.videoChunks.available &&
      !props.theme.default.widget.recordingScreen.audio.nextPreviousButtons
        .display
        ? "none"
        : "repeat(3,1fr)"};
    align-items: center;
    justify-content: center;
    width: 100%;
    background: ${(props) =>
      props.theme.default.widget.recordingScreen.video.questionCard.background};
  }

  .audio-question-buttons-wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    justify-content: center;
    width: 100%;
    background: ${(props) =>
      props.theme.default.widget.recordingScreen.video.questionCard.background};
    border-radius: 0 0 8px 8px;
  }

  .audio-question-buttons-wrapper .question-button {
    color: #fff;
  }

  .question-count {
    text-align: center;
    font-size: 12px;
    color: #35a4ff;
  }

  @keyframes pulse {
    0% {
      opacity: 0;
    }
    100% {
      opcaity: 1;
    }
  }
`;
