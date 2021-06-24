import React, { useReducer, useMemo } from "react";
import { questionReducer } from "../../reducers/reducers";
import { initialState, QuestionContext } from "../../context/QuestionContext";
import { SET_INDEX } from '../../reducers/reducers'
import "./style.css";

const QuestionsCard = () => {
  const [state, dispatch] = useReducer(questionReducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  const questionArray = [
    "What is your name, title and company?",
    "Q2",
    "Q3",
    "Q4",
  ];

  const gotToPrevQuestion = () => {
    if (state.questionIndex > 0) {
      dispatch({
        type: SET_INDEX,
        payload: state.questionIndex - 1,
      });
    }
  };

  const gotToNextvQuestion = () => {
    if (state.questionIndex < questionArray.length - 1) {
      dispatch({
        type: SET_INDEX,
        payload: state.questionIndex + 1,
      });
    }
  };

  return (
    <QuestionContext.Provider value={value}>
      <article className="question-card">
        <p className="questions">{questionArray[state.questionIndex]}</p>

        <article className="question-buttons-wrapper">
          <button
            className="question-button prev-button"
            onClick={gotToPrevQuestion}
          >
            {`< Prev`}
          </button>
          <button
            className="question-button next-button"
            onClick={gotToNextvQuestion}
          >
            {`Next >`}
          </button>
        </article>
      </article>
    </QuestionContext.Provider>
  );
};

export default QuestionsCard;
