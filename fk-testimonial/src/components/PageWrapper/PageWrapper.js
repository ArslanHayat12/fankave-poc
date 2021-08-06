import React from "react";

import Header from "./../Header/Header";
import Footer from "./../Footer/Footer";

import { BackgroundVideo } from "../BackgroundVideo/BackgroundVideo";

function PageWrapper(props) {
  const { children } = props;
  return (
    <>
      <BackgroundVideo />
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default PageWrapper;
