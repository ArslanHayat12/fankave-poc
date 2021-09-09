import React, { useCallback, useContext, useState, useEffect } from "react";
import { ThemeContext } from "styled-components";
import { TestimonialContext } from "../../context/TestimonialContext";
import { SET_INDEX } from "../../constants";
import { QuestionCardStyled } from "./style";

const QuestionsCard = ({ handleNextPrevClick }) => {
  const { state, dispatch } = useContext(TestimonialContext);
  const [pulse, setPulse] = useState(false);
  const theme = useContext(ThemeContext);
  const questionArray = state.questions;
  const currentIndex = state.currentQuestionIndex;

  const {
    default: {
      widget: {
        recordingScreen: {
          video: {
            nextPreviousButtons: { display: nextPreviousButtonsDisplay },
          },
        },
      },
    },
  } = theme;

  const gotToPrevQuestion = useCallback(() => {
    if (currentIndex > 0) {
      dispatch({
        type: SET_INDEX,
        payload: currentIndex - 1,
      });
      handleNextPrevClick(true);
      handleNextPrevClick(true);
    }
  }, [state]);

  const gotToNextQuestion = useCallback(() => {
    if (currentIndex < questionArray.length - 1) {
      dispatch({
        type: SET_INDEX,
        payload: currentIndex + 1,
      });
      handleNextPrevClick(
        false,
        state.questionIndex < questionArray.length - 1
      );
      handleNextPrevClick(false);
    }
  }, [state]);

  useEffect(() => {
    setPulse(true);

    const timer = setTimeout(() => {
      setPulse(false);
    }, 1000);
    return () => {
      setPulse(false);
      clearTimeout(timer);
    };
  }, [currentIndex]);

  return (
    <QuestionCardStyled
      className={`question-card ${pulse && "pulse"}`}
      id="fk-question-card"
    >
      <p className="questions">{questionArray[currentIndex].question}</p>
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
    </QuestionCardStyled>
  );
};

export default QuestionsCard;
