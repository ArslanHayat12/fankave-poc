import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'

import Header from './../Header/Header'
import Footer from './../Footer/Footer'

import { styles } from '../../styles'

export const Layout = (props) => {
  const { children } = props
  const theme = useContext(ThemeContext)
  console.log('theme: ', theme)

  const { experience = 'demo', customClass = 'fk-demo' } = theme

  const PageWrapper = styles[experience] || styles.demo

  return (
    <>
      {!(window.MediaRecorder || window.webkitMediaRecorder) && (
        <>
          <p className="fk-not-supported-text">
            Unfortunately, this browser does not support the web technology that
            powers this app. We recommend desktop Chrome or Firefox.
          </p>{' '}
          <div className="fk-not-supported-container"></div>
        </>
      )}
      <PageWrapper className={customClass} id={customClass}>
        {headerEnabled && (headerLogo || headerText) && (
          <Header logo={headerLogo} heading={headerText} />
        )}
        {children}
        {footerEnabled && (footerLogo || footerText) && (
          <Footer logo={footerLogo} heading={footerText} />
        )}
      </PageWrapper>
    </>
  )
}
