import React, { useContext } from 'react'
import { Membership } from '../interfaces/Membership'
import { Badge, Button, Menu, MenuList, MenuItem } from '@chakra-ui/core'
import useBadgeColor from '../hooks/useBadgeColor'
import StationContext from '../context/station/stationContext'
import MenuButton from './MenuButton'

const MemberCard = ({ membership }: { membership: Membership }) => {
  const { membership: userMembership } = useContext(StationContext)
  const { role: userRole } = userMembership as Membership

  const isFounder = userRole === 'FOUNDER'
  const isAdmin = userRole === 'ADMIN'
  const isModerator = userRole === 'MODERATOR'
  const isMember = userRole === 'MEMBER'
  const notFounder = membership.role !== 'FOUNDER'

  const kickable = membership.state === 'ACTIVE' && notFounder
  const canKick = isFounder || isAdmin || isModerator
  const canBan = isFounder || isAdmin
  const canUpgrade = isFounder

  return (
    <div className='my-2 p-2 bg-gray-800 rounded-md w-full'>
      <h1>{membership.user.name}</h1>
      <Badge variantColor={useBadgeColor(membership.role || 'PENDING')}>
        {membership.role}
      </Badge>
      <Badge variantColor={useBadgeColor(membership.state || 'PENDING')}>
        {membership.state}
      </Badge>

      {canKick && kickable && (
        <Button variant='outline' variantColor='teal'>
          Kick
        </Button>
      )}

      {canBan && notFounder && (
        <Button variant='outline' variantColor='red'>
          Ban
        </Button>
      )}

      {canUpgrade && notFounder && (
        <Menu>
          <MenuButton as={Button} rightIcon='chevron-down'>
            Change Level
          </MenuButton>
          <MenuList>
            <MenuItem>Admin</MenuItem>
            <MenuItem>Moderator</MenuItem>
            <MenuItem>Member</MenuItem>
          </MenuList>
        </Menu>
      )}
    </div>
  )
}

export default MemberCard
