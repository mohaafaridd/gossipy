import React, { FC, useEffect, useContext } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Spinner } from '@chakra-ui/core'

import AuthContext from './context/auth/authContext'

import Nav from './components/Nav'

import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Home from './pages/Home'
import Explore from './pages/Explore'
import Loading from './components/Loading'

const App: FC = () => {
  const authContext = useContext(AuthContext)

  const { loading, getUser } = authContext

  useEffect(() => {
    setTimeout(() => {
      getUser()
    }, 1000)
    // eslint-disable-next-line
  }, [])

  if (loading) return <Loading message='Loading Info' props={{ size: 'xl' }} />

  return (
    <Router>
      <div id='router'>
        <aside>
          <Nav />
        </aside>
        <main id='main'>
          <Switch>
            <Route exact path='/sign-in' component={Signin} />
            <Route exact path='/sign-up' component={Signup} />
            <Route exact path='/' component={Home} />
            <Route exact path='/explore' component={Explore} />
          </Switch>
        </main>
      </div>
    </Router>
  )
}

export default App
