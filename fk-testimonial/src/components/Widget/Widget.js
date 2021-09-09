import React, { useReducer, useMemo, useContext } from 'react'
import { ThemeContext } from 'styled-components'

import { HomeScreen } from '../HomeScreen/HomeScreen'
import {
  TestimonialContext,
  initialState,
} from './../../context/TestimonialContext'
import { reducer } from './../../reducers/reducers'
import Footer from './../Footer/Footer'

function Widget() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch])
  const theme = useContext(ThemeContext)

  const { logo = '' } = theme
  return (
    <TestimonialContext.Provider value={value}>
      <section className="fk-widget-container" id="fk-widget-container">
        <article className="fk-widget-wrapper" id="fk-widget-wrapper">
          <HomeScreen />
          {logo && <Footer logo={logo} />}
        </article>
      </section>
    </TestimonialContext.Provider>
  )
}

export default Widget
