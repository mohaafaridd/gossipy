import React from 'react'
import { Route } from 'react-router-dom'
import Nav from '../components/Nav'

// Pages
import Explore from './Explore'
import Station from './Station'

const Home = () => {
  return (
    <div id='home'>
      <Nav />

      <main className='w-screen'>
        <Route path='/explore' component={Explore} />
        <Route path='/u/:id' />
        <Route path='/s/:id' component={Station} />
      </main>
    </div>
  )
}

export default Home
