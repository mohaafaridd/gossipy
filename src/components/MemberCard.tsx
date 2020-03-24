import React from 'react'
import { Membership } from '../interfaces/Membership'
import { Badge } from '@chakra-ui/core'
import useBadgeColor from '../hooks/useBadgeColor'

const MemberCard = ({ membership }: { membership: Membership }) => {
  return (
    <div className='my-2 p-2 bg-gray-800 rounded-md w-full'>
      <h1>{membership.user.name}</h1>
      <Badge variantColor={useBadgeColor(membership.role || 'PENDING')}>
        {membership.role}
      </Badge>
      <Badge variantColor={useBadgeColor(membership.state || 'PENDING')}>
        {membership.state}
      </Badge>
    </div>
  )
}

export default MemberCard
