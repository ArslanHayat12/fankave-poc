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
import { ConfirmationModal } from "../../components/ConfirmationModal/ConfirmationModal";

import { ArrowIcon } from "../../assets";
import Modal from "react-responsive-modal";

const VideoChunks = () => {
  const { state, dispatch } = useContext(TestimonialContext);
  const questions = state.questions;

  const [open, setOpen] = useState(false);

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

  const onCloseModal = () => {
    return setOpen(false);
  };

  return (
    <VideoChunksWrapperStyled>
      {questions.map((data, index) => (
        <CardStyled
          key={index}
          onClick={data.url ? () => setOpen(true) : ""}
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
            <ArrowIcon
              customClass="arrow-icon"
              onClick={() => onVideoClick(index)}
            />
          )}

          <Modal
            id="fk-modal"
            open={open}
            onClose={onCloseModal}
            center
            classNames={{
              overlay: "customOverlay",
              modal: "customModal",
            }}
          >
            <video
              src={index == data.questionIndex && data.url}
              className="video-modal"
              controls
              minWidth="100%"
              minHeight="100%"
              id=""
            />
          </Modal>
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
