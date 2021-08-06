import React from "react";

import Header from "./../Header/Header";
import Footer from "./../Footer/Footer";
import { PageWrapperStyled } from "./style";

import { BackgroundVideo } from "../BackgroundVideo/BackgroundVideo";
import { configs } from "../../configs";

function PageWrapper(props) {
  const { children } = props;

  if (configs) {
    const {
      default: {
        loadingMedia: { url: BackgroundVideoUrl },
        background = "",
        containerCssClassname = "",
        layout: {
          regular: {
            header: { leftLogoUrl = "" },
            footer: { logoUrl = "" },
          },
        },
      },
    } = configs;

    return (
      <PageWrapperStyled
        // background={background}
        className={containerCssClassname}
      >
        <BackgroundVideo url={BackgroundVideoUrl} />
        <Header src={leftLogoUrl} />
        {children}
        <Footer src={logoUrl} />
      </PageWrapperStyled>
    );
  } else {
    return (
      <PageWrapperStyled>
        <BackgroundVideo
          url={
            window.self.ctag === "cisco" ? "/testimonial-poc/bg-video.mp4" : ""
          }
        />
        <Header />
        {children}
        <Footer />
      </PageWrapperStyled>
    );
  }
}

export default PageWrapper;
