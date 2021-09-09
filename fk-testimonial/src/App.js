import React from 'react'

import { Layout } from './components/Layout/Layout'
import Widget from './components/Widget/Widget'

import themeConfigs from './configs'
import ThemeProvider from './theme/ThemeProvider'

import './App.css'

function App() {
  //context wrapping
  return (
    <ThemeProvider styledTheme={themeConfigs}>
      <Layout children={<Widget />}></Layout>
    </ThemeProvider>
  )
}

export default App
