import React, { useContext, useReducer } from "react";
import { ThemeContext } from "styled-components";

import {
  initialState,
  TestimonialContext,
} from "../../context/TestimonialContext";
import {
  QuestionContext,
  questionInitialState,
} from "./../../context/QuestionContext";
import { questionReducer } from "../../reducers/reducers";

import { SET_SCREEN, SET_INDEX, TESTIMONIAL_SCREEN } from "../../constants";

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
  const { dispatch } = useContext(TestimonialContext);

  const onVideoClick = (index) => {
    dispatch({
      type: SET_INDEX,
      payload: index,
    });

    dispatch({
      type: SET_SCREEN,
      payload: TESTIMONIAL_SCREEN,
    });
  };

  const theme = useContext(ThemeContext);

  const {
    default: {
      widget: {
        recordingScreen: {
          video: {
            questionDetails,
            videoChunks: {
              tags: { preview, redo, recordAnswer },
            },
          },
        },
      },
    },
  } = theme;

  return (
    <VideoChunksWrapperStyled>
      {questionDetails.map((data, index) => (
        <CardStyled alignCenter={data.chunkSize}>
          <QuestionDetailsStyled>
            <p className="question">{data.text}</p>
            <TagsWrapperStyled>
              {data.chunkSize ? (
                <>
                  <TagStyled>{preview}</TagStyled>
                  <TagStyled>{redo}</TagStyled>
                </>
              ) : (
                <TagStyled>{recordAnswer}</TagStyled>
              )}
            </TagsWrapperStyled>
          </QuestionDetailsStyled>
          {data.chunkSize ? (
            <ThumnailStyled>
              <span className="time">{data.chunkSize}</span>
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
      <video
        src="https://firebasestorage.googleapis.com/v0/b/optimum-surface-602.appspot.com/o/6833424291913015343.mp4?alt=media"
        className="video-chunk"
        id="fk-bg-video"
        width="100%"
        height="100%"
        controls
      />
    </VideoChunksWrapperStyled>
  );
};

export default VideoChunks;
