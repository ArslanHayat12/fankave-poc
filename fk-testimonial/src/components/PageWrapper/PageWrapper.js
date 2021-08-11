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
      <PageWrapperStyled className={customClass} id="fk-page-wrapper">
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
          url={window.self.ctag === "cisco" ? "/sharestories/bg-video.mp4" : ""}
        />
        <Header />
        {children}
        <Footer />
      </PageWrapperStyled>
    );
  }
}

export default PageWrapper;
