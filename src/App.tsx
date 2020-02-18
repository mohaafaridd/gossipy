import React, { FC } from 'react'
import { CSSReset } from '@chakra-ui/core'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AuthState from './context/auth/AuthState'

import Chakra from './chakra'

import Signup from './pages/Signup'
import Signin from './pages/Signin'

const App: FC = () => {
  return (
    <AuthState>
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
    </AuthState>
  )
}

export default App
