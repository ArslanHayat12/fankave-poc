import React from "react";

import Header from "./../Header/Header";
import Footer from "./../Footer/Footer";
import { Wrapper } from "./style";

import "./style.css";

function PageWrapper(props) {
  const { children } = props;
  console.log(window.self.ctag);
  return (
    <Wrapper>
      {/* <video
        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        className="background-video"
        autoplay="true"
        muted
        minWidth="100%"
        minHeight="100%"
        id="fk-bg-video"
      /> */}
      <Header />
      {children}
      <Footer />
    </Wrapper>
  );
}

export default PageWrapper;
