import styled from "styled-components";

export const QuestionCardStyled = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  .questions {
    width: 90%;
    text-align: center;
    line-height: 1.5;
    color: #fff;
    margin-bottom: 0;
    font-size: 19px;
    font-weight: 500;
  }

  .question-button {
    background: none;
    outline: none;
    border: none;
    color: #35a4ff;
    font-size: 14px;
    cursor: pointer;
    padding: 10px;
  }

  .disabled {
    opacity: 0.3;
    cursor: default;
  }

  .question-buttons-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .question-count {
    font-size: 12px;
    color: #35a4ff;
  }
`;