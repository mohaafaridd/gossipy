import React, { FC } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import Chakra from './chakra'

import signup from './pages/signup'
import { CSSReset } from '@chakra-ui/core'

const App: FC = () => {
  return (
    <Chakra>
      <CSSReset />

      <Router>
        <Switch>
          <Route exact path='/sign-in' />
          <Route exact path='/sign-up' component={signup} />
          <Route exact path='/' />
          <Route path='/g/:id' />
          <Route path='/s/:id' />
        </Switch>
      </Router>
    </Chakra>
  )
}

export default App
