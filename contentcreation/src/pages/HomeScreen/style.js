import styled from "styled-components";
export const HomeScreenStyled = styled.article`
  display: grid;
  grid-row-gap: 30px;
  z-index: 1;
  height: 100%;
  animation: pulse 1s linear;

  .description {
    font-size: 25px;
    font-weight: 500;
    color: #000;
    max-width: 400px;
    margin: 0;
    text-align: center;
    line-height: 1.26;
  }

  .widgets-wrapper {
    display: grid;
    grid-template-columns: ${(props) =>
      props.theme.default.widget.homeScreen.cardStyle === "columns"
        ? "1fr 1fr"
        : "none"};
    grid-template-rows: ${(props) =>
      props.theme.default.widget.homeScreen.cardStyle === "rows"
        ? "1fr 1fr"
        : "none"};
    grid-gap: 10px;
  }

  .widgets-wrapper .card-wrapper {
    text-align: center;
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
