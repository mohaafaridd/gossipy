import React, { useState } from 'react'
import { User } from '../interfaces/User'
import { Badge, useColorMode } from '@chakra-ui/core'
import LinkButton from './common/LinkButton'
import useGradient from '../hooks/useGradient'
import useKarma from '../hooks/useKarma'

const UserCard = ({ user }: { user: User }) => {
  const [karma] = useState(useKarma(user.karma))
  const [[bg]] = useGradient()
  const { colorMode } = useColorMode()
  const borderClass = colorMode === 'light' ? 'border' : ''

  return (
    <div className={`user-card ${bg} ${borderClass}`}>
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
