import React, { useState, useEffect } from 'react'
import { User } from '../interfaces/User'
import { Badge } from '@chakra-ui/core'
import LinkButton from './LinkButton'
import useGradient from '../hooks/useGradient'

const UserCard = ({ user }: { user: User }) => {
  const [karma, setKarma] = useState(0)

  useEffect(() => {
    setKarma(
      user.karma.filter(vote => vote.type === 'UPVOTE').length -
        user.karma.filter(vote => vote.type === 'DOWNVOTE').length
    )
  })
  const [[bg]] = useGradient()
  return (
    <div className={`user-card ${bg}`}>
      {/* TODO: User Avatar */}
      <LinkButton
        to={`/u/${user.identifier}/activities`}
        variant='link'
        className='font-bold'>
        {user.name}
      </LinkButton>

      <Badge variant='subtle' variantColor='purple'>
        {karma} Karma
      </Badge>
    </div>
  )
}

export default UserCard
