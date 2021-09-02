import React, { useContext } from "react";
import { ThemeContext } from "styled-components";

import { TestimonialContext } from "../../context/TestimonialContext";
import { SET_SCREEN, SET_INDEX, RECORD_SCREEN } from "../../constants";
import {
  VideoChunksWrapperStyled,
  CardStyled,
  QuestionDetailsStyled,
  TagsWrapperStyled,
  TagStyled,
  ThumnailStyled,
} from "./style";

import { ArrowIcon } from "../../assets";

const VideoChunks = () => {
  const { state, dispatch } = useContext(TestimonialContext);
  const questions = state.questions;

  const onVideoClick = (index) => {
    dispatch({
      type: SET_INDEX,
      payload: index,
    });

    dispatch({
      type: SET_SCREEN,
      payload: RECORD_SCREEN,
    });
  };

  const theme = useContext(ThemeContext);

  const {
    default: {
      widget: {
        recordingScreen: {
          video: {
            videoChunks: {
              tags: { play, recordAnswer },
            },
          },
        },
      },
    },
  } = theme;
  console.log("questions====================", questions);
  return (
    <VideoChunksWrapperStyled>
      {questions.map((data, index) => (
        <CardStyled
          alignCenter={data.isAnswered}
          className={`${
            data.questionIndex > 0 &&
            questions[data.questionIndex - 1].isAnswered === false &&
            `disable`
          }`}
        >
          <QuestionDetailsStyled>
            <p className="question">{data.question}</p>
            <TagsWrapperStyled>
              {data.isAnswered ? (
                <TagStyled>{play}</TagStyled>
              ) : (
                <TagStyled>{recordAnswer}</TagStyled>
              )}
            </TagsWrapperStyled>
          </QuestionDetailsStyled>
          {data.isAnswered ? (
            <ThumnailStyled>
              <span className="time">{data.thumbUrl}</span>
              <img
                className="thumbnail"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"
              />
            </ThumnailStyled>
          ) : (
            <ArrowIcon
              customClass="arrow-icon"
              onClick={() => onVideoClick(index)}
            />
          )}
        </CardStyled>
      ))}
      {/* <video
        src="https://firebasestorage.googleapis.com/v0/b/optimum-surface-602.appspot.com/o/6833424291913015343.mp4?alt=media"
        className="video-chunk"
        id="fk-bg-video"
        width="100%"
        height="100%"
        controls
      /> */}
    </VideoChunksWrapperStyled>
  );
};

export default VideoChunks;
