import styled from "styled-components";

export const RecordingCardStyled = styled.a`
  .card-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 10px;
    text-decoration: none;
    color: #000;
    cursor: pointer;
  }

  .card-wrapper .card-description {
    margin-bottom: 0;
  }
`;
