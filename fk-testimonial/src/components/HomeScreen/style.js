import styled from "styled-components";
import { getGridAreas } from "../../styles/default";

export const HomeScreenStyled = styled.article`
  display: grid;
  grid-row-gap: 20px;
  z-index: 1;
  justify-content: center;
  .fk-screen-description {
    font-size: 20px;
    font-weight: 500;
    color: ${({ theme }) => theme?.brand?.pallete?.text || "black"};
  }
  .fk-widget-icons {
    display: grid;
    grid-gap: 10px;
    grid-template-areas: ${({ theme }) =>
      getGridAreas(theme?.widgets || {})[0]};
    grid-template-columns: ${({ theme }) =>
      getGridAreas(theme?.widgets || {})[1]};
    grid-template-rows: ${({ theme }) => getGridAreas(theme?.widgets || {})[2]};
    .fk-widget-icon {
      display: grid;
      align-self: center;
      justify-content: center;
      border: 1px solid black;
      border-radius: 10px;
      padding: 10px;
      cursor: pointer;
      &.fk-video-capture-icon {
        grid-area: video-capture;
      }
      &.fk-video-testimonial-icon {
        grid-area: video-testimonial;
      }
      &.fk-image-capture-icon {
        grid-area: image-capture;
      }
      &.fk-image-upload-icon {
        grid-area: image-upload;
      }
      &.fk-audio-capture-icon {
        grid-area: audio-capture;
      }
      &.fk-audio-testimonial-icon {
        grid-area: audio-testimonial;
      }
      .fk-widget-icon-image {
        width: 40px;
        height: 40px;
        display: grid;
        align-self: center;
        width: 100%;
        img {
          width: inherit;
          height: inherit;
          object-fit: contain;
        }
      }
      .fk-widget-icon-text {
        color: ${({ theme }) => theme?.brand?.pallete?.text || "black"};
        font-size: 12px;
      }
    }
  }
`;
