import styled from "styled-components";

export const HeaderStyled = styled.section`
  margin: 20px 20px 0;

  img {
    width: 50px;
    height: 50px;
  }

  @media (max-width: 768px) {
    margin: 10px 10px 0;

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
