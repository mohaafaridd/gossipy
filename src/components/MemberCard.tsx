import React, { useContext } from 'react'
import { Membership } from '../interfaces/Membership'
import { Badge, Button, Menu, MenuList, MenuItem } from '@chakra-ui/core'
import useBadgeColor from '../hooks/useBadgeColor'
import StationContext from '../context/station/stationContext'
import MenuButton from './MenuButton'
import usePermissions from '../hooks/usePermissions'

const MemberCard = ({ membership }: { membership: Membership }) => {
  const { membership: userMembership } = useContext(StationContext)
  const [permission, action] = usePermissions(
    userMembership?.role,
    membership.state
  )
  const isFounder = membership.role === 'FOUNDER'
  const isSelf = membership.id === userMembership?.id

  return (
    <div className='my-2 p-2 bg-gray-800 rounded-md w-full'>
      <h1>{membership.user.name}</h1>
      <Badge variantColor={useBadgeColor(membership.role || 'PENDING')}>
        {membership.role}
      </Badge>
      <Badge variantColor={useBadgeColor(membership.state || 'PENDING')}>
        {membership.state}
      </Badge>

      {permission.accept && action.accept && <Button>Accept</Button>}

      {permission.ban && action.ban && !isFounder && !isSelf && (
        <Button variant='outline' variantColor='red'>
          Ban
        </Button>
      )}

      {permission.kick && action.kick && !isFounder && !isSelf && (
        <Button variant='outline' variantColor='teal'>
          Kick
        </Button>
      )}

      {permission.level && action.level && !isFounder && !isSelf && (
        <Menu>
          <MenuButton
            as={Button}
            rightIcon='chevron-down'
            variant='solid'
            variantColor='green'>
            Change Level
          </MenuButton>
          <MenuList title='Roles'>
            <MenuItem>Admin</MenuItem>
            <MenuItem>Moderator</MenuItem>
            <MenuItem>Member</MenuItem>
          </MenuList>
        </Menu>
      )}

      {permission.unban && action.unban && <Button>Unbanned</Button>}
    </div>
  )
}

export default MemberCard
