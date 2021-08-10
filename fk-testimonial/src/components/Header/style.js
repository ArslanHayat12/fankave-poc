import styled from "styled-components";

export const HeaderStyled = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: ${(props) => props.theme.default.pageLayout.header.position};
  padding: 25px;

  img:first-child {
    z-index: 1;
    height: ${(props) => props.theme.default.pageLayout.header.mainLogoHeight};
    margin: ${(props) => props.theme.default.pageLayout.header.mainLogoMargin};
  }

  img:nth-child(2) {
    z-index: 1;
    height: ${(props) => props.theme.default.pageLayout.header.subLogoHeight};
  }

  @media (max-width: 768px) {
    margin: 10px 10px 0;

    // img {
    //   width: 35px;
    //   height: 35px;
    // }
  }

  @media (max-width: 425px) {
    // img {
    //   width: 30px;
    //   height: 30px;
    // }
  }
`;