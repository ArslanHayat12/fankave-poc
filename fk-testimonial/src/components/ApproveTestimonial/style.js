import styled from "styled-components";

export const ApproveButtonWrapper = styled.article`
  .approve-button {
    font-family: "Poppins", sans-serif;
    background-color: ${(props) =>
      props.theme.default.widget.previewScreen.video.button
        .backgroundColor} !important;
    color: ${(props) =>
      props.theme.default.widget.previewScreen.video.button.color} !important;
    text-transform: ${(props) =>
      props.theme.default.widget.previewScreen.video.button
        .textTransform} !important;
    width: ${(props) =>
      props.theme.default.widget.previewScreen.video.button.width} !important;
    height: ${(props) =>
      props.theme.default.widget.previewScreen.video.button.height} !important;
    font-size: ${(props) =>
      props.theme.default.widget.previewScreen.video.button
        .fontSize} !important;
    font-weight: ${(props) =>
      props.theme.default.widget.previewScreen.video.button
        .fontWeight} !important;
    border-radius: ${(props) =>
      props.theme.default.widget.previewScreen.video.button
        .borderRadius} !important;
    outline: none;
    border: none;
    cursor: pointer;
    margin-right: 3px;
    margin-top: 10px;
  }
`;
