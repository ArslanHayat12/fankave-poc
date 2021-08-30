import styled from "styled-components";

export const RecordingCardStyled = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: ${(props) =>
    props.theme.default.widget.homeScreen.videoBox.border ||
    "2px solid transparent"};
  padding: 20px;
  border-radius: ${(props) =>
    props.theme.default.widget.homeScreen.videoBox.borderRadius || "18px"};
  text-decoration: none;
  color: #000;
  background: ${(props) =>
    props.theme.default.widget.homeScreen.videoBox.background || "transparent"};
  cursor: pointer;

  .card-description {
    margin-bottom: 0;
    color: ${(props) =>
      props.theme.default.widget.homeScreen.videoBox.fontColor || "#000"};
    font-size: ${(props) =>
      props.theme.default.widget.homeScreen.videoBox.fontSize || "16px"};
  }
`;
