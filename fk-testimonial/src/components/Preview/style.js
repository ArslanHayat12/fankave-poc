import { Form } from 'formik'
import styled from 'styled-components'

export const PreviewStyled = styled.article`
  overflow: hidden;
  display: grid;
  position: relative;
  .image-container {
  }
  .actions {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
    margin-top: 20px;
  }
`

export const StoryFormStyled = styled(Form)`
  background: #fff;
  padding: 30px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  grid-gap: 15px;

  .fk-user-form {
    display: grid;
    grid-gap: 15px;
    width: 100%;
  }

  .fk-input-error {
    color: red;
    font-size: 10px;
  }

  .fk-input {
    padding: 15px 20px;
    border: 1px solid #d3d3d3;
    outline: none;
    &.fk-error {
      border: 1px solid red;
      &::placeholder {
        color: red;
      }
    }
  }

  .fk-story-form {
    width: 100%;

    .fk-story {
      outline: none;
      resize: none;
      width: 100%;
      padding: 15px 20px;
      box-sizing: border-box;
    }
  }

  .fk-tag-input {
    width: 100%;

    .fk-input {
      width: 100%;
    }
  }

  .fk-tags {
    .fk-tag {
      background: #2db7f5;
      font-size: 12px;
      color: #fff;
      padding: 0 7px;
      line-height: 20px;
      border-radius: 2px;
      height: unset;
    }
  }
`
