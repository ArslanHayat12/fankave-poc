import React, { useContext } from "react";
import { ThemeContext } from "styled-components";

import Header from "./../Header/Header";
import Footer from "./../Footer/Footer";
import { PageWrapperStyled } from "./style";

import { BackgroundVideo } from "../BackgroundVideo/BackgroundVideo";
import themeConfigs from "../../theme";

function PageWrapper(props) {
  const { children } = props;
  const theme = useContext(ThemeContext);
  console.log("themeConfigs", themeConfigs);
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
      <PageWrapperStyled className={customClass}>
        {type === "video" ? (
          <BackgroundVideo url={backgroundUrl} />
        ) : (
          <img src={backgroundUrl} className="background-image" />
        )}
        <Header
          mainLogoSrc={mainLogoUrl}
          subLogoSrc={subLogoUrl}
          position={position}
        />
        {children}
        {footerLogoUrl && (
          <Footer src={logoUrl} position={footerLogoPosition} />
        )}
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
