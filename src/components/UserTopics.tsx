import React from 'react'
import Topics from './Topics'
import TopicsOption from './TopicsOption'
import { User } from '../interfaces/User'

const UserTopics = ({ profile }: { profile: User }) => {
  return (
    <div>
      <TopicsOption validSortTypes={['NEW']} />
      <Topics user={profile.identifier} />
    </div>
  )
}

export default UserTopics
