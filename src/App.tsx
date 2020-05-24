import React, { FC, useEffect, useContext } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params'

import AuthContext from './context/auth/authContext'

import Nav from './components/layout/Nav'

import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Home from './pages/Home'
import Explore from './pages/Explore'
import Loading from './components/layout/Loading'
import Profile from './pages/Profile'
import CreateStation from './pages/CreateStation'
import Station from './pages/Station'
import Subscriptions from './pages/Subscriptions'
import ManageStation from './pages/ManageStation'
import Topic from './pages/Topic'
import CreateTopic from './pages/CreateTopic'
import EditTopic from './pages/EditTopic'
import SearchBar from './components/SearchBar'
import SearchPage from './pages/SearchPage'

const App: FC = () => {
  const authContext = useContext(AuthContext)

  const { loading, getUser } = authContext

  useEffect(() => {
    getUser()
    // eslint-disable-next-line
  }, [])

  if (loading)
    return <Loading coverScreen message='Loading Info' props={{ size: 'xl' }} />

  return (
    <Router>
      <QueryParamProvider ReactRouterRoute={Route}>
        <div id='router'>
          <aside>
            <Nav />
          </aside>
          <main id='main'>
            <SearchBar />
            <Switch>
              <Route exact path='/sign-in' component={Signin} />
              <Route exact path='/sign-up' component={Signup} />
              <Route exact path='/' component={Home} />
              <Route exact path='/explore' component={Explore} />
              <Route exact path='/gossip' component={CreateTopic} />
              <Route
                exact
                path='/edit/:stationIdentifier/:topicIdentifier'
                component={EditTopic}
              />
              <Route path='/u/:identifier' component={Profile} />

              <Route exact path='/s/create' component={CreateStation} />
              <Route exact path='/s/:identifier' component={Station} />
              <Route path='/s/:identifier/manage' component={ManageStation} />
              <Route exact path='/s' component={Subscriptions} />
              <Route exact path='/s/:station/:topic' component={Topic} />
              <Route exact path='/search' component={SearchPage} />
            </Switch>
          </main>
        </div>
      </QueryParamProvider>
    </Router>
  )
}

export default App
