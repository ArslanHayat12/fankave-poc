import React from "react";

import Header from "./../Header/Header";
import Footer from "./../Footer/Footer";

import "./style.css";

function PageWrapper(props) {
  const { children } = props;
  return (
    <>
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
    </>
  );
}

export default PageWrapper;
