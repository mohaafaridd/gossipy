import React from 'react'
import { User } from '../interfaces/User'
import { Topic } from '../interfaces/Topic'
import TopicCard from './TopicCard'

const UserTopics = ({ profile }: { profile: User }) => {
  return (
    <div id='topics'>
      {profile.topics &&
        profile.topics.map((topic: Topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
    </div>
  )
}

export default UserTopics
