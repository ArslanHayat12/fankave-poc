import React, { useContext, useState } from "react";
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
import { VideoModal } from "../Modal/VideoModal/VideoModal";
import ApproveTestimonial from "../ApproveTestimonial/ApproveTestimonial";

const VideoQuestionsListing = () => {
  const { state, dispatch } = useContext(TestimonialContext);
  const questions = state.questions;
  const [open, setOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
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
        previewScreen: {
          video: { mergeVideo },
        },
      },
    },
  } = theme;

  const handleCardClick = (index) => {
    dispatch({
      type: SET_INDEX,
      payload: index,
    });
    dispatch({
      type: SET_SCREEN,
      payload: RECORD_SCREEN,
    });
  };

  const convertDuration = (urlDuration) => {
    const secondsToHHMMSS = new Date(urlDuration * 1000)
      .toISOString()
      .substr(11, 8);
    return secondsToHHMMSS;
  };

  const setVideoChunkUrl = (id) => {
    dispatch({
      type: SET_INDEX,
      payload: id,
    });
    setOpen(true);
    setVideoUrl(questions[id].url);
  };

  return (
    <VideoChunksWrapperStyled>
      {questions.map((data, index) => (
        <CardStyled
          key={index}
          onClick={
            data.url
              ? () => {
                  setVideoChunkUrl(index);
                }
              : () => handleCardClick(index)
          }
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
              <span className="time">{convertDuration(data.urlDuration)}</span>
              <img className="thumbnail" src={data.thumbUrl} />
            </ThumnailStyled>
          ) : (
            <ArrowIcon customClass="arrow-icon" />
          )}
        </CardStyled>
      ))}
      <VideoModal
        openModal={open}
        close={() => setOpen(false)}
        url={videoUrl}
        index={state.currentQuestionIndex}
      />
      {state.url && mergeVideo && (
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
export default VideoQuestionsListing;
