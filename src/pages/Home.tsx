import React from 'react'
import Nav from '../components/Nav'
import Topic from '../components/Topic'
import { Topic as ITopic } from '../interfaces/Topic'
const Home = () => {
  const topic: ITopic = {
    id: 'topic123',
    title: 'Testing Topic',
    content: 'This is a small test for the upcoming topic card',
    station: {
      id: 'station123',
      identifier: 'station123',
      name: 'Station 123'
    },

    votes: {
      count: 3
    }
  }

  return (
    <div id='home'>
      <Nav />

      <main className='w-screen'>
        <Topic topic={topic} />
      </main>
    </div>
  )
}

export default Home
