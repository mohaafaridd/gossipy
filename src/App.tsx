import React, { FC } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import Chakra from './chakra'
import './App.css'

const App: FC = () => {
  return (
    <Chakra>
      <Router>
        <Switch>
          <Route exact path='/sign-in' />
          <Route exact path='/sign-up' />
          <Route exact path='/' />
          <Route path='/g/:id' />
          <Route path='/s/:id' />
        </Switch>
      </Router>
    </Chakra>
  )
}

export default App
