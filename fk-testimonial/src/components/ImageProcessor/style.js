import styled from "styled-components";
import { SlimScrollStyle } from "../../styles/common";

export const ImageProcessorStyled = styled.article`
  overflow: hidden;
  display: grid;
  position: relative;
  .image-container {
    overflow: hidden;

    .fk-stickers-preview,
    .fk-bgs-preview {
      ${SlimScrollStyle};

      padding-bottom: 10px;
      display: flex;
      grid-gap: 5px;
    }

    .fk-sticker-wrapper {
      background: #fff;
      padding: 15px 10px;
    }

    .fk-sticker,
    .fk-bg {
      width: 70px;
      height: 70px;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
      border: 1px solid white;
      background-color: black;
      flex-basis: 70px;
      flex-grow: 0;
      flex-shrink: 0;
    }
  }
  .actions {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
    margin-top: 20px;
  }
`;
