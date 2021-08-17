import React, { useContext } from "react";
import { ThemeContext } from "styled-components";

import Header from "./../Header/Header";
import Footer from "./../Footer/Footer";
import { PageWrapperStyled } from "./style";

import { BackgroundVideo } from "../BackgroundVideo/BackgroundVideo";
import themeConfigs from "../../configs";

function PageWrapper(props) {
  const { children } = props;
  const theme = useContext(ThemeContext);
  if (themeConfigs) {
    const {
      default: {
        customClass = "",
        background: { type, url: backgroundUrl },
        pageLayout: {
          header: { position, mainLogoUrl, subLogoUrl },
          footer: { position: footerLogoPosition, logoUrl: footerLogoUrl },
        },
      },
    } = themeConfigs;

    return (
      <>
        {!(window.MediaRecorder || window.webkitMediaRecorder) && (
          <>
            <p className="not-supported-text">
              Unfortunately, this browser does not support the web technology
              that powers this app. We recommend desktop Chrome or Firefox.
            </p>{" "}
            <div className="not-supported-container"></div>
          </>
        )}
        <PageWrapperStyled className={customClass} id="fk-page-wrapper">
          {type === "video" ? (
            <BackgroundVideo url={backgroundUrl} />
          ) : (
            <img src={backgroundUrl} className="background-image" />
          )}

          {mainLogoUrl && (
            <Header
              mainLogoSrc={mainLogoUrl}
              subLogoSrc={subLogoUrl}
              position={position}
            />
          )}
          {children}
          {footerLogoUrl && (
            <Footer src={logoUrl} position={footerLogoPosition} />
          )}
        </PageWrapperStyled>
      </>
    );
  } else {
    return (
      <>
        {!(window.MediaRecorder || window.webkitMediaRecorder) && (
          <>
            <p className="not-supported-text">
              Unfortunately, this browser does not support the web technology
              that powers this app. We recommend desktop Chrome or Firefox.
            </p>{" "}
            <div className="not-supported-container"></div>
          </>
        )}
        <PageWrapperStyled>
          <BackgroundVideo
            url={
              window.self.ctag === "cisco" ? "/testimonials/bg-video.mp4" : ""
            }
          />

          <Header />
          {children}
          <Footer />
        </PageWrapperStyled>
      </>
    );
  }
}

export default PageWrapper;
