import React, { useState, useEffect } from 'react'
import { User } from '../interfaces/User'
import { Badge, Divider } from '@chakra-ui/core'
import LinkButton from './LinkButton'

const UserCard = ({ user }: { user: User }) => {
  const [karma, setKarma] = useState(0)

  useEffect(() => {
    setKarma(
      user.karma.filter(vote => vote.type === 'UPVOTE').length -
        user.karma.filter(vote => vote.type === 'DOWNVOTE').length
    )
  })

  return (
    <div className='rounded p-2 bg-gray-800 w-1/3 my-2 mx-auto'>
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
