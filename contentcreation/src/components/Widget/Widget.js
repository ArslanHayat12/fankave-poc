import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'

import { HomeScreen } from '../HomeScreen/HomeScreen'
import Footer from './../Footer/Footer'
import { styles } from '../../styles'

function Widget() {
  const theme = useContext(ThemeContext)
  const { logo = '', experience = 'demo', customClass = 'fk-demo' } = theme

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
        <article className="fk-widget-wrapper" id="fk-widget-wrapper">
          <HomeScreen />
          {logo && <Footer logo={logo} />}
        </article>
      </PageWrapper>
    </>
  )
}

export default Widget
