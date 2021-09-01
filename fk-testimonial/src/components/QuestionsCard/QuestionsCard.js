import React, { useReducer, useEffect, useMemo, useCallback, useContext } from "react";
import { ThemeContext } from "styled-components";
import { questionReducer } from "../../reducers/reducers";
import { initialState, QuestionContext } from "../../context/QuestionContext";
import { SET_INDEX } from "../../constants";
import { QuestionCardStyled } from "./style";

const QuestionsCard = ({setCurrentQuestion, handleStartCaptureClick}) => {
  const [state, dispatch] = useReducer(questionReducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  const theme = useContext(ThemeContext);

  const questionArray =
    theme.default?.widget?.recordingScreen?.video?.questionsList || [];

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

  useEffect(()=>{
    setCurrentQuestion(questionArray[state.questionIndex])
  },[state.questionIndex])

  return (
    <QuestionContext.Provider value={value}>
      <QuestionCardStyled className="question-card" id="fk-question-card">
        {/* <p className="questions">{questionArray[state.questionIndex]}</p> */}

        <article className="question-buttons-wrapper">
          <button
            className={`question-button prev-button${
              state.questionIndex === 0 ? " disabled" : ""
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
            className={`question-button next-button${
              state.questionIndex === questionArray.length - 1
                ? " disabled"
                : ""
            }`}
            onClick={ () => {
              state.questionIndex === questionArray.length - 1
                ? undefined
                : gotToNextQuestion();
                handleStartCaptureClick();
            }
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
