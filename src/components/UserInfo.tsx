import React from 'react'
import { useCountUp } from 'react-countup'
import { User } from '../interfaces/User'
import { Avatar } from '@chakra-ui/core'
import useKarma from '../hooks/useKarma'
import useGradiant from '../hooks/useGradiant'

const UserInfo = ({ profile }: { profile: User }) => {
  const karma = useKarma(profile.karma)
  const { countUp: karmaCounter } = useCountUp({ end: karma, duration: 2 })
  const { countUp: topicsCounter } = useCountUp({
    end: profile.topics?.length || 0,
    duration: 2
  })
  const { countUp: commentsCounter } = useCountUp({
    end: profile.comments?.length || 0,
    duration: 2
  })
  const { countUp: membershipsCounter } = useCountUp({
    end: profile.memberships?.length || 0,
    duration: 2
  })
  const [, , [bg]] = useGradiant()

  return (
    <div
      className={`grid w-1/4 mx-auto text-center gap-2 p-2 rounded-md shadow-md ${bg}`}>
      <Avatar
        className='mx-auto bg-blue-500'
        size='xl'
        name='Dan Abrahmov'
        src='https://bit.ly/dan-abramov'
      />
      <h2 className='text-lg font-bold'>{profile.name}</h2>
      <p className='text-blue-400 font-semibold'>{karmaCounter} Karma</p>
      <p className='text-gray-600'>{topicsCounter} Topics</p>
      <p className='text-gray-600'>{commentsCounter} Comments</p>
      <p className='text-gray-600'>{membershipsCounter} Subscription</p>
    </div>
  )
}

export default UserInfo
