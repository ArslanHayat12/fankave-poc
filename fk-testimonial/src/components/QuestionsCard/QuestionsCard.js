import React, { useReducer, useMemo, useCallback } from "react";
import { questionReducer } from "../../reducers/reducers";
import { initialState, QuestionContext } from "../../context/QuestionContext";
import { SET_INDEX } from "../../constants";
import "./style.css";

const QuestionsCard = () => {
  const [state, dispatch] = useReducer(questionReducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  const questionArray = [
    "What is your name, title and company?",
    "What challenge did you have?",
    "What made this partner the obvious choice?",
    "What were the results?",
  ];

  const gotToPrevQuestion = useCallback(() => {
    if (state.questionIndex > 0) {
      dispatch({
        type: SET_INDEX,
        payload: state.questionIndex - 1,
      });
    }
  }, [state]);

  const gotToNextQuestion = useCallback(() => {
    if (state.questionIndex < questionArray.length - 1) {
      dispatch({
        type: SET_INDEX,
        payload: state.questionIndex + 1,
      });
    }
  }, [state]);

  return (
    <QuestionContext.Provider value={value}>
      <article className="question-card">
        <p className="questions">{questionArray[state.questionIndex]}</p>

        <article className="question-buttons-wrapper">
          <button
            className={`question-button prev-button${
              state.questionIndex === 0 ? " disabled" : ""
            }`}
            onClick={state.questionIndex === 0 ? undefined : gotToPrevQuestion}
          >
            {`< Prev`}
          </button>
          <button
            className={`question-button next-button${
              state.questionIndex === questionArray.length - 1
                ? " disabled"
                : ""
            }`}
            onClick={
              state.questionIndex === questionArray.length - 1
                ? undefined
                : gotToNextQuestion
            }
          >
            {`Next >`}
          </button>
        </article>
      </article>
    </QuestionContext.Provider>
  );
};

export default QuestionsCard;
