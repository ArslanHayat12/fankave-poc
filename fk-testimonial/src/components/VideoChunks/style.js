import styled from "styled-components";
import { css } from "styled-components";

export const SlimScrollStyle = css`
  &::-webkit-scrollbar {
    width: 0.6rem;
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: none;
    box-shadow: none;
    border-radius: 1rem;
    border-right: 0.5rem solid transparent;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    -webkit-border-radius: 1rem;
    border-radius: 1rem;
    height: 2rem;
    background: #a5b0bf;
  }
`;

export const VideoChunksWrapperStyled = styled.section`
  ${SlimScrollStyle}

  margin: 10px 0 0;
  height: calc(100% - 90px);
  overflow-y: scroll;
  overflow-x: hidden;
  padding-right: 3px;

  .video-chunk {
    height: 160px;
    background: #000;
  }
`;

export const CardStyled = styled.article`
  display: grid;
  grid-template-columns: 1fr 70px;
  align-items: ${(props) => (props.alignCenter ? "normal" : "center")};
  justify-content: space-between;
  box-shadow: 0 2px 8px 0 rgb(0 0 0 / 16%);
  background-color: #fff;
  margin: 10px 0;

  .arrow-icon {
    height: 60px;
    width: 60px;
    margin-right: 10px;
    cursor: pointer;
  }
`;

export const QuestionDetailsStyled = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;

  .question {
    color: #3c3c3c;
    font-size: 17px;
    font-weight: 500;
    margin: 0 0 10px 0;
  }
`;

export const TagsWrapperStyled = styled.article`
  display: grid;
  grid-template-columns: max-content max-content;
  grid-gap: 5px;
`;

export const TagStyled = styled.span`
  border-radius: 3px;
  background-color: ${(props) =>
    props.theme.default.widget.recordingScreen.video.videoChunks.tags
      .background};
  color: #fff;
  font-size: 12px;
  padding: 2px 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 45px;
  height: 22px;
`;

export const ThumnailStyled = styled.article`
  position: relative;

  .time {
    position: absolute;
    bottom: 5px;
    left: 5px;
    font-size: 13px;
    color: #fff;
  }

  .thumbnail {
    width: ${(props) =>
      props.theme.default.widget.recordingScreen.video.videoChunks.thumbnail
        .width};
    height: 100%;
    object-fit: cover;
  }
`;
