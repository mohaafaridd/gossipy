import React from 'react'
import Topics from './Topics'
import TopicsOption from './TopicsOption'
import { useParams } from 'react-router-dom'
import { User } from '../interfaces/User'

const UserTopics = ({ profile }: { profile: User }) => {
  return (
    <div>
      <TopicsOption />
      <Topics user={profile.identifier} />
    </div>
  )
}

export default UserTopics
