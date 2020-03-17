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
    <div id='user-info' className={bg}>
      <Avatar
        className='avatar'
        size='2xl'
        name='Dan Abrahmov'
        src='https://bit.ly/dan-abramov'
      />
      <h2>{profile.name}</h2>

      <div className='counters'>
        <div className='karma counter'>
          <div>{karmaCounter}</div>Karma
        </div>

        <div className='counter'>
          <div>{topicsCounter}</div>Topics
        </div>

        <div className='counter'>
          <div>{commentsCounter}</div>Comments
        </div>

        <div className='counter'>
          <div>{membershipsCounter}</div>Subscription
        </div>
      </div>
    </div>
  )
}

export default UserInfo
