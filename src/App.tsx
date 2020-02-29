import React, { FC, useEffect, useContext } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import AuthContext from './context/auth/authContext'

import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Home from './pages/Home'
import { Spinner } from '@chakra-ui/core'

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
      <Switch>
        <Route exact path='/sign-in' component={Signin} />
        <Route exact path='/sign-up' component={Signup} />
        <Route path='/' component={Home} />
        <Route path='/u/:id' />
        <Route path='/s/:id' />
      </Switch>
    </Router>
  )
}

export default App
