import React from "react";
import "./style.css";

const QuestionsCard = () => {
  return (
    <article className="question-card">
      <p className="questions">What is your name, title and company?</p>

      <article className='question-buttons-wrapper'>
        <button className="question-button prev-button">{`< Prev`} </button>
        <button className="question-button next-button">{`Next >`}</button>
      </article>
    </article>
  );
};

export default QuestionsCard;
