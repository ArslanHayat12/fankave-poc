import styled from "styled-components";

export const ClientDetailsStyled = styled.article`
  width: 100%;

  .client-name {
    font-size: 27px;
    margin: 0;
  }

  .client-name-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 12px;
  }

  .client-name-wrapper svg,
  .client-email-company-wrapper svg {
    cursor: pointer;
  }

  .input-name {
    margin-top: 12px;
  }

  .client-email-company-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .client-details {
    font-size: 16px;
    margin: 0;
  }

  input {
    font-family: "Poppins", sans-serif;
    font-size: ${(props) =>
      props.theme.default.widget.previewScreen.video.input.placeholders
        .fontSize};
    font-weight: ${(props) =>
      props.theme.default.widget.previewScreen.video.input.placeholders
        .fontWeight};
    background-color: rgb(255, 255, 255);
    width: 90%;
    display: block;
    transition: all 0.3s;
    margin-bottom: 5px;
    border: ${(props) =>
      props.theme.default.widget.previewScreen.video.input.placeholders.border};
    padding: 10px 7px;
    border-radius: ${(props) =>
      props.theme.default.widget.previewScreen.video.input.placeholders
        .borderRadius};
    color: ${(props) =>
      props.theme.default.widget.previewScreen.video.input.placeholders
        .fontColor};
    outline: #35a4ff;
    box-shadow: ${(props) =>
      props.theme.default.widget.previewScreen.video.input.placeholders
        .boxShadow};
  }

  :-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px white inset;
    background-color: transparent;
  }
`;
