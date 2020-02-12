import React, { FC } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Chakra from './chakra'

import Signup from './pages/Signup'
import Signin from './pages/Signin'
import { CSSReset } from '@chakra-ui/core'

const App: FC = () => {
  return (
    <Chakra>
      <CSSReset />

      <Router>
        <Switch>
          <Route exact path='/sign-in' component={Signin} />
          <Route exact path='/sign-up' component={Signup} />
          <Route exact path='/' />
          <Route path='/g/:id' />
          <Route path='/s/:id' />
        </Switch>
      </Router>
    </Chakra>
  )
}

export default App
