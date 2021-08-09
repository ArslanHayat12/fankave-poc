import React, { useReducer, useMemo, useCallback } from "react";
import { questionReducer } from "../../reducers/reducers";
import { initialState, QuestionContext } from "../../context/QuestionContext";
import { SET_INDEX } from "../../constants";
import { QuestionCardStyled } from "./style";

const QuestionsCard = () => {
  const [state, dispatch] = useReducer(questionReducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  const questionArray = [
    "What is your name and title? What team do you report into?",
    "How long have you been working at Bevi?",
    "What excites you most about coming to work at Bevi every day?",
    "How would you describe the Bevi company culture?",
    "Why would you recommend Bevi as a great place to work?"
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
      <QuestionCardStyled className="question-card" id="fk-question-card">
        <p className="questions">{questionArray[state.questionIndex]}</p>

        <article className="question-buttons-wrapper">
          <button
            className={`question-button prev-button${state.questionIndex === 0 ? " disabled" : ""
              }`}
            onClick={state.questionIndex === 0 ? undefined : gotToPrevQuestion}
          >
            <span>&#8249;</span>
            {` Prev`}
          </button>
          <span className="question-count">
            {state.questionIndex + 1}/{questionArray.length}
          </span>
          <button
            className={`question-button next-button${state.questionIndex === questionArray.length - 1
              ? " disabled"
              : ""
              }`}
            onClick={
              state.questionIndex === questionArray.length - 1
                ? undefined
                : gotToNextQuestion
            }
          >
            {`Next `}
            <span>&#8250;</span>
          </button>
        </article>
      </QuestionCardStyled>
    </QuestionContext.Provider>
  );
};

export default QuestionsCard;
