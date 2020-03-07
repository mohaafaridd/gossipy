import React from 'react'
import { Route } from 'react-router-dom'
import Nav from '../components/Nav'

// Pages
import Explore from './Explore'

const Home = () => {
  return (
    <div id='home'>
      <Nav />

      <main className='w-screen'>
        <Route path='/explore' component={Explore} />
      </main>
    </div>
  )
}

export default Home
