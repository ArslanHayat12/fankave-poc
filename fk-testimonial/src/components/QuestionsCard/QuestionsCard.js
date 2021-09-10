import React, { useCallback, useContext, useState, useEffect } from "react";
import { ThemeContext } from "styled-components";
import { TestimonialContext } from "../../context/TestimonialContext";
import { SET_INDEX } from "../../constants";
import { QuestionCardStyled } from "./style";

const QuestionsCard = ({ handleNextPrevClick }) => {
  const { state, dispatch } = useContext(TestimonialContext);
  const theme = useContext(ThemeContext);
  const questionArray = state.questions;
  const currentIndex = state.currentQuestionIndex;

  const {
    default: {
      widget: {
        recordingScreen: {
          video: {
            nextPreviousButtons: { display: nextPreviousButtonsDisplay },
            videoChunks: { available: chunksAvailable },
          },
        },
      },
    },
  } = theme;

  const gotToPrevQuestion = useCallback(() => {
    console.log("prev", currentIndex);
    if (currentIndex > 0) {
      dispatch({
        type: SET_INDEX,
        payload: currentIndex - 1,
      });
      chunksAvailable && handleNextPrevClick(true);
    }
  }, [state]);

  const gotToNextQuestion = useCallback(() => {
    console.log("next", currentIndex);
    if (currentIndex < questionArray.length - 1) {
      dispatch({
        type: SET_INDEX,
        payload: currentIndex + 1,
      });
      chunksAvailable &&
        handleNextPrevClick(
          false,
          state.questionIndex < questionArray.length - 1
        );
      chunksAvailable && handleNextPrevClick(false);
    }
  }, [state]);

  const VideoQuestionCard = () => {
    return (
      <article className="question-buttons-wrapper">
        {nextPreviousButtonsDisplay && (
          <button
            className={`question-button prev-button ${
              currentIndex === 0 ? "disabled" : ""
            }`}
            onClick={state.questionIndex === 0 ? undefined : gotToPrevQuestion}
          >
            <span>&#8249;</span>
            {` Prev`}
          </button>
        )}{" "}
        <span className="question-count">
          {currentIndex + 1}/{questionArray.length}
        </span>
        {nextPreviousButtonsDisplay && (
          <button
            className={`question-button next-button${
              currentIndex === questionArray.length - 1 ? " disabled" : ""
            }`}
            onClick={
              currentIndex === questionArray.length - 1
                ? undefined
                : gotToNextQuestion
            }
          >
            {`Next `}
            <span>&#8250;</span>
          </button>
        )}
      </article>
    );
  };

  const AudioQuestionCard = () => {
    return (
      <article className="audio-question-buttons-wrapper">
        <button
          className={`question-button prev-button ${
            currentIndex === 0 ? "disabled" : ""
          }`}
          onClick={state.questionIndex === 0 ? undefined : gotToPrevQuestion}
        >
          <span>&#8249;</span>
          {` Prev`}
        </button>
        <span className="question-count">
          {currentIndex + 1}/{questionArray.length}
        </span>
        <button
          className={`question-button next-button${
            currentIndex === questionArray.length - 1 ? " disabled" : ""
          }`}
          onClick={
            currentIndex === questionArray.length - 1
              ? undefined
              : gotToNextQuestion
          }
        >
          {`Next `}
          <span>&#8250;</span>
        </button>
      </article>
    );
  };

  return (
    <QuestionCardStyled className={`question-card`} id="fk-question-card">
      <p className="questions">{questionArray[currentIndex].question}</p>

      {state.type === "video" ? <VideoQuestionCard /> : <AudioQuestionCard />}
    </QuestionCardStyled>
  );
};

export default QuestionsCard;
