import React, { useContext, useEffect, useState } from "react";
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
import VideoModal from "../Modal/VideoModal";
import ApproveTestimonial from "../ApproveTestimonial/ApproveTestimonial";

const VideoChunks = () => {
  const { state, dispatch } = useContext(TestimonialContext);
  const questions = state.questions;
  const [open, setOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

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

  const convertDuration = (urlDuration) => {
    const secondsToHHMMSS = new Date(urlDuration * 1000)
      .toISOString()
      .substr(11, 8);
    return secondsToHHMMSS;
  };

  const getUrl = (id) => {
    dispatch({
      type: SET_INDEX,
      payload: id,
    });
    return setVideoUrl(questions[id].url);
  };

  useEffect(() => {
    if (videoUrl) {
      setOpen(true);
    }
  }, [state.currentQuestionIndex]);

  return (
    <VideoChunksWrapperStyled>
      {questions.map((data, index) => (
        <CardStyled
          key={index}
          onClick={data.url ? () => getUrl(data.questionIndex) : ""}
          alignCenter={data.isAnswered}
          className={`${
            data.questionIndex > 0 &&
            questions[data.questionIndex - 1].isAnswered === false &&
            `disable`
          }`}
        >
          {console.log("current index", state.currentQuestionIndex)}
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
              <span className="time">{convertDuration(data.urlDuration)}</span>
              <img className="thumbnail" src={data.thumbUrl} />
            </ThumnailStyled>
          ) : (
            <ArrowIcon
              customClass="arrow-icon"
              onClick={() => onVideoClick(index)}
            />
          )}
          {videoUrl && data.questionIndex === index && (
            <VideoModal
              openModal={open}
              close={() => setOpen(false)}
              url={videoUrl}
              index={data.questionIndex}
            />
          )}
        </CardStyled>
      ))}
      {state.url && (
        <>
          <video
            src={state.url}
            className="video-chunk"
            id="fk-bg-video"
            width="100%"
            height="100%"
            controls
          />
          <ApproveTestimonial />
        </>
      )}
    </VideoChunksWrapperStyled>
  );
};

export default VideoChunks;
