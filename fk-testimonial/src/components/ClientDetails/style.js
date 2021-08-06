import styled from "styled-components";

export const ClientDetailsStyled = styled.article`
  width: 100%;

  .client-name {
    font-size: 27px;
    margin: 0;
  }

  .client-name-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 12px;
  }

  .client-name-wrapper svg,
  .client-email-company-wrapper svg {
    cursor: pointer;
  }

  .input-name {
    margin-top: 12px;
    padding: 7px 7px;
  }

  .client-email-company-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .client-details {
    font-size: 16px;
    margin: 0;
  }

  input {
    font-family: "Poppins", sans-serif;
    font-size: 12px;
    background-color: rgb(255, 255, 255);
    width: 90%;
    display: block;
    transition: all 0.3s;
    margin-bottom: 5px;
    border: 1px solid #ccc;
    padding: 10px 7px;
    border-radius: 5px;
    color: #000;
    outline: #35a4ff;
  }

  :-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px white inset;
    background-color: transparent;
  }
`;
