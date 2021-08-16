import styled from "styled-components";
export const ThankyouScreenStyled = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;

  .heading {
    font-size: 27px;
    font-weight: bold;
    color: #000;
    margin-bottom: 10px;
  }

  .description {
    font-size: 27px;
    font-weight: 500;
    line-height: 1.28;
    text-align: center;
    color: #2d2d2d;
    margin-top: 0;
  }

  .back-button {
    font-size: 14px;
    cursor: pointer;
    color: #35a4ff;
  }

  .button-wrapper {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 25px;
  }

  .twitter-icon{
    height:${(props) =>
      props.theme.default.widget.thankyouScreen.tweetIcon.height};
    display: flex;
    margin: 20px auto;
  }

  .share-button {
    color:#fff;
    font-size: 17px;
    margin-top:10px;
    border: none;
    border-radius: 30px;
    box-shadow: 0px 6px 10px 0 rgba(44, 91, 203, 0.45);
    background:${(props) =>
      props.theme.default.widget.thankyouScreen.button.backgroundColor};
    height:${(props) =>
      props.theme.default.widget.thankyouScreen.button.height};
    width:${(props) => props.theme.default.widget.thankyouScreen.button.width}}

  .icon-button {
    background-color: transparent;
    color: #fff;
    border: none;
    cursor: pointer;
    margin-right: 3px;
    border-radius:${(props) =>
      props.theme.default.widget.thankyouScreen.shareIcon.borderRadius}
    padding: 4px 5px 0;

    img{
      height:${(props) =>
        props.theme.default.widget.thankyouScreen.shareIcon.height}
    }
   
  }

  .back-button svg {
    width: 20px;
    height: 20px;
  }

  .tweet-container {
    margin-top: 25px;
  }

  .text-area {
    height: ${(props) =>
      props.theme.default.widget.thankyouScreen.input.height};
    width: 90%;
    margin-bottom: 10px;
    resize: none;
    font-family: "Poppins";
    padding:15px;
    box-shadow: 0px 1px 2px 0 rgba(0, 0, 0, 0.14);
    border: solid 2px rgba(218, 218, 218, 0.21);
    border-radius:22px
  }

  .tweet-button {
    font-family: "Poppins", sans-serif;
    background-color: ${(props) =>
      props.theme.default.widget.thankyouScreen.twitterButton.bgColor};
    color: #fff;
    border-radius:${(props) =>
      props.theme.default.widget.thankyouScreen.twitterButton.borderRadius};
    padding: 6px 18px;
    outline: none;
    border: none;
    cursor: pointer;
    margin-right: 3px;
    box-shadow: 0px 1px 2px 0 rgba(0, 0, 0, 0.14);
    // height: 61px;
    // width: 180px;
    border-radius: 30px;
    font-size: 15px;

    img{
      height:${(props) =>
        props.theme.default.widget.thankyouScreen.tweetIcon.height}
    }
    
  }

  .success {
    color: green;
    font-size: 14px;
    margin-top: 25px;
  }

  .error{
    margin-top:10px;
  }
`;
