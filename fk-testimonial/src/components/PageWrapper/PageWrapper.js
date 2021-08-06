import React from "react";

import Header from "./../Header/Header";
import Footer from "./../Footer/Footer";
import { PageWrapperStyled } from "./style";

import { BackgroundVideo } from "../BackgroundVideo/BackgroundVideo";

function PageWrapper(props) {
  const { children } = props;
  console.log(window.self.ctag);

  return (
    <PageWrapperStyled>
      <BackgroundVideo />
      <Header />
      {children}
      <Footer />
    </PageWrapperStyled>
  );
}

export default PageWrapper;
