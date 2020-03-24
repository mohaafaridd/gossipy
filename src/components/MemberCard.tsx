import React from 'react'
import { Membership } from '../interfaces/Membership'
import { Badge } from '@chakra-ui/core'

const MemberCard = ({ membership }: { membership: Membership }) => {
  return (
    <div>
      <h1>{membership.user.name}</h1>
      <Badge variantColor='green'>{membership.role}</Badge>
      <Badge variantColor='green'>{membership.state}</Badge>
    </div>
  )
}

export default MemberCard
