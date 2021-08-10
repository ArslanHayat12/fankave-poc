import styled from "styled-components";

export const FooterStyled = styled.section`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  width: 100%;
  height: 100%;
  z-index: 1;

  img {
    height: ${(props) => props.theme.default.widget.logo.height};
  }

  @media (max-width: 768px) {
    margin: 0 10px 10px;

    img {
      height: 20px;
      margin: 10px;
    }
  }

  @media (max-width: 425px) {
    img {
      height: 20px;
      margin: 10px;
    }
  }
`;
