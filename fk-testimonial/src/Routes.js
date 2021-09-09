import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import { waitForAddedNode } from './utils/config'

waitForAddedNode({
  id: 'fk-creation',
  recursive: false,
  done: (element) => {
    ReactDOM.render(<App />, element)
  },
})
