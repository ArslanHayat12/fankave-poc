import styled from "styled-components";

export const ApproveButtonWrapper = styled.article`
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
    outline: none;
    border: none;
    cursor: pointer;
    margin-right: 3px;
  }
`;
