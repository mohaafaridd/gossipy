import React, { FC, useEffect, useContext } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Spinner } from '@chakra-ui/core'

import AuthContext from './context/auth/authContext'

import Nav from './components/Nav'

import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Home from './pages/Home'
import Explore from './pages/Explore'

const App: FC = () => {
  const authContext = useContext(AuthContext)

  const { loading, getUser } = authContext

  useEffect(() => {
    setTimeout(() => {
      getUser()
    }, 3000)
    // eslint-disable-next-line
  }, [])

  if (loading)
    return (
      <div className='h-screen flex'>
        <Spinner size='xl' color='blue.500' className='m-auto' />
      </div>
    )

  return (
    <Router>
      <div className='router'>
        <aside>
          <Nav />
        </aside>
        <main>
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
