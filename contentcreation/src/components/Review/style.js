import styled from 'styled-components'

export const ReviewStyled = styled.article`
  display: grid;
  grid-gap: 20px;
  .fk-message {
    height: 150px;
    justify-content: center;
    display: grid;
    align-items: center;
    background: white;
    .fk-message-text {
      font-size: 24px;
    }
  }
  .fk-share-area {
    display: flex;
    justify-content: center;
    .fk-share-button {
      cursor: pointer;
      width: 40px;
      height: 40px;
      background-size: contain;
      margin: 5px;
    }
  }
  .fk-download-area {
    display: grid;
    grid-template-columns: auto auto;
    .fk-download-preview {
      width: 75px;
      height: 100px;
      .fk-download-preview-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border: 2px solid white;
      }
    }
    .fk-download-button {
      height: 40px;
      align-self: end;
    }
  }
`
