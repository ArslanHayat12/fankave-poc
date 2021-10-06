import React, { useContext, useState, useEffect } from 'react'
import { ThemeContext } from 'styled-components'

import Header from './../Header/Header'
import Footer from './../Footer/Footer'
import { PageWrapperStyled } from './style'

import { BackgroundVideo } from '../BackgroundVideo/BackgroundVideo'
import themeConfigs from '../../configs'

function PageWrapper(props) {
  const { children } = props
  const theme = useContext(ThemeContext)
  console.log('theme: ', theme)
  const [displayVideo, setDisplayVideo] = useState(
    theme.default.onPageLoad.video.display
  )

  const {
    default: {
      customClass = '',
      background: { type, url: backgroundUrl },
      pageLayout: {
        header: { position, mainLogoUrl, subLogoUrl, subLogoText },
        footer: { position: footerLogoPosition, logoUrl: footerLogoUrl },
      },
      onPageLoad: {
        video: { url: backgroundVideoUrl },
      },
    },
  } = themeConfigs

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayVideo(false)
    }, 5000)
    return () => clearTimeout(timer)
  })

  return (
    <>
      {!(window.MediaRecorder || window.webkitMediaRecorder) && (
        <>
          <p className="not-supported-text">
            Unfortunately, this browser does not support the web technology that
            powers this app. We recommend desktop Chrome or Firefox.
          </p>{' '}
          <div className="not-supported-container"></div>
        </>
      )}
      {displayVideo ? (
        <BackgroundVideo url={backgroundVideoUrl} />
      ) : (
        <PageWrapperStyled className={customClass} id="fk-page-wrapper">
          {type === 'video' ? (
            <BackgroundVideo url={backgroundUrl} />
          ) : (
            <img src={backgroundUrl} className="background-image" />
          )}

          {mainLogoUrl && (
            <Header
              mainLogoSrc={mainLogoUrl}
              subLogoSrc={subLogoUrl}
              subLogoText={subLogoText}
              position={position}
            />
          )}
          {children}
          {footerLogoUrl && (
            <Footer src={footerLogoUrl} position={footerLogoPosition} />
          )}
        </PageWrapperStyled>
      )}
    </>
  )
}

export default PageWrapper
