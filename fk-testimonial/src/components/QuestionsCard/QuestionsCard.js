import React , {useState} from "react";
import "./style.css";

const QuestionsCard = () => {
  const [questionIndex, setQuestionIndex] = useState(0);

  const questionArray = [
    "What is your name, title and company?",
    "Q2",
    "Q3",
    "Q4",
  ];

  const gotToPrevQuestion = () => {
    if (questionIndex === 0) {
    } else {
      setQuestionIndex(questionIndex - 1);
    }
  };

  const gotToNextvQuestion = () => {
    if (questionIndex === questionArray.length - 1) {
    } else {
      setQuestionIndex(questionIndex + 1);
    }
  };

  return (
    <article className="question-card">
      <p className="questions">{questionArray[questionIndex]}</p>

      <article className="question-buttons-wrapper">
        <button className="question-button prev-button" onClick={gotToPrevQuestion}>
          {`< Prev`} 
        </button>
        <button className="question-button next-button" onClick={gotToNextvQuestion}>
          {`Next >`} 
        </button>
      </article>
    </article>
  );
};

export default QuestionsCard;
