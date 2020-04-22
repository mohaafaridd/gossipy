import React from 'react'
import { User } from '../interfaces/User'
import { Topic } from '../interfaces/Topic'
import TopicCard from './TopicCard'
import useGradient from '../hooks/useGradient'

const UserTopics = ({ profile }: { profile: User }) => {
  const [[, shade]] = useGradient()

  return (
    <div id='topics'>
      {profile.topics?.length === 0 && (
        <div
          className={`${shade} p-2 rounded-md text-center text-gray-500 uppercase tracking-widest cursor-default mx-2 
          md:w-2/3 xl:w-1/3 mx-auto border`}>
          This user has no public topics
        </div>
      )}

      {profile.topics &&
        profile.topics.map((topic: Topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
    </div>
  )
}

export default UserTopics
