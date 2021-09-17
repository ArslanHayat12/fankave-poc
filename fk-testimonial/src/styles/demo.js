import { darken } from "polished";
import styled from "styled-components";
import { LayoutStyled } from "./default";

export const demoStyled = styled.section`
  ${LayoutStyled}
  .fk-widget-wrapper {
    border: none;

    .fk-filled-button {
      padding: 8px 15px;
      font-size: 13px;
      font-weight: 500;
      background: #1890ff;
      color: #fff;
      outline: none;
      border: 0;
      cursor: pointer;
      transition: all 200ms linear;

      &:hover {
        background: ${darken(0.1, "#1890ff")};
      }
    }
  }
`;
