import styled from "styled-components";

export const WidgetStyled = styled.section`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .not-supported-container {
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: 1;
    -webkit-backdrop-filter: blur(2px);
    backdrop-filter: blur(2px);
  }

  .not-supported-container p {
    background: #ffd000;
    padding: 5px 20px;
    margin: 0;
    text-align: center;
  }

  .widget-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 650px;
    background-color: #fff;
    width: 335px;
    border-radius: 5px;
    padding: 28px;
    margin: 15px;
    scrollbar-width: thin !important;
    overflow-x: hidden;
  }

  ::-webkit-scrollbar {
    width: 3px;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: none;
    box-shadow: none;
    border-radius: 1rem;
    border-right: 0.5rem solid transparent;
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    -webkit-border-radius: 1rem;
    border-radius: 1rem;
    height: 2rem;
    background: #a5b0bf;
  }

  @media (max-height: 700px) {
    .widget-wrapper {
      /* height: calc(100vh - 174px); */
      height: calc(100vh - 183px);
      overflow: auto;
      overflow-x: hidden;
    }
  }

  @media (min-height: 700px) and (max-height: 800px) {
    .widget-wrapper {
      /* height: calc(100vh - 158px); */
      height: calc(100vh - 233px);
      overflow: auto;
      overflow-x: hidden;
    }
  }

  @media (max-width: 425px) {
    .widget-wrapper {
      overflow-y: auto;
      overflow-x: hidden;
      padding: 28px 14px;
    }

    .record-screen .heading {
      font-size: 18px;
    }

    .preview-testimonial-screen .heading {
      font-size: 18px;
    }
  }
`;
