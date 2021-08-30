import styled from "styled-components";

export const FooterStyled = styled.section`
  display: flex;
  justify-content: flex-end;
  align-items: ${(props) =>
    props.theme.default.widget.logo.position || "flex-end"};
  width: 100%;
  z-index: 1;
  margin-top: 20px;

  img {
    height: ${(props) => props.theme.default.widget.logo.height};
  }

  @media (max-width: 768px) {
    // margin: 0 10px 10px;
  }

  @media (max-width: 425px) {
  }
`;
