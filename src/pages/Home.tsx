import React from 'react'
import Nav from '../components/Nav'
import Topic from '../components/Topic'
import { Topic as ITopic } from '../interfaces/Topic'
import moment from 'moment'
const Home = () => {
  const topic: ITopic = {
    id: 'topic123',
    title: 'Test Topic',
    content:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores similique velit id officiis possimus earum porro dolores sunt autem laboriosam esse provident obcaecati necessitatibus commodi, quos hic numquam qui explicabo?',
    membership: {
      user: {
        id: 'user1',
        name: 'Farid',
        identifier: 'farid'
      },

      station: {
        id: 'station1',
        name: 'Bayern',
        identifier: 'bayern'
      }
    },
    votes: [
      {
        id: 'vote1',
        membership: {
          user: {
            id: 'user1',
            name: 'Farid',
            identifier: 'farid'
          }
        },
        type: 'UPVOTE'
      },
      {
        id: 'vote2',
        membership: {
          user: {
            id: 'user2',
            name: 'Mohammed',
            identifier: 'mohammed'
          }
        },
        type: 'UPVOTE'
      }
    ],
    createdAt: moment(0).toISOString(),
    updatedAt: moment(0).toISOString()
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
