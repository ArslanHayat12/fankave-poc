import styled from "styled-components";

export const FooterStyled = styled.section`
  display: flex;
  justify-content: flex-end;
  margin: 0 20px 20px;

  img {
    width: 50px;
    height: 50px;
  }

  @media (max-width: 768px) {
    margin: 0 10px 10px;

    img {
      width: 35px;
      height: 35px;
    }
  }

  @media (max-width: 425px) {
    img {
      width: 30px;
      height: 30px;
    }
  }
`;
