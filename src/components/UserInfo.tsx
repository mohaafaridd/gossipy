import React from 'react'
import { useCountUp } from 'react-countup'
import { User } from '../interfaces/User'
import { Avatar } from '@chakra-ui/core'
import useKarma from '../hooks/useKarma'
import useGradient from '../hooks/useGradient'
import { Link } from 'react-router-dom'

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
  const [, , [bg]] = useGradient()

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
          <Link to={`/u/${profile.identifier}/activities`}>
            <div>{karmaCounter}</div>
            Karma
          </Link>
        </div>

        <div className='counter karma'>
          <Link to={`/u/${profile.identifier}/topics`}>
            <div>{topicsCounter}</div>
            Topics
          </Link>
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
