import React from 'react'

import Widget from './components/Widget/Widget'

import themeConfigs from './configs'
import ThemeProvider from './theme/ThemeProvider'

import './App.css'

function App() {
  //context wrapping
  return (
    <ThemeProvider styledTheme={themeConfigs}>
      <Widget />
    </ThemeProvider>
  )
}

export default App
