import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import App from './App'
import Users from './Users'
import { waitForAddedNode } from './utils/config'

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <App />
        </Route>
      </Switch>
    </Router>
  )
}
waitForAddedNode({
  id: 'fk-creation',
  recursive: false,
  done: (element) => {
    ReactDOM.render(<Routes />, element)
  },
})
