import React, { useContext } from 'react'
import { Membership } from '../interfaces/Membership'
import { Badge, Button, Menu, MenuList, MenuItem } from '@chakra-ui/core'
import useBadgeColor from '../hooks/useBadgeColor'
import StationContext from '../context/station/stationContext'
import MenuButton from './MenuButton'
import usePermissions from '../hooks/usePermissions'
import useGradient from '../hooks/useGradient'

const MemberCard = ({ membership }: { membership: Membership }) => {
  const { membership: userMembership } = useContext(StationContext)
  const [permission, action] = usePermissions(
    userMembership?.role,
    membership.state
  )
  const [[, shade]] = useGradient()
  const isFounder = membership.role === 'FOUNDER'
  const isSelf = membership.id === userMembership?.id

  return (
    <div className={`${shade} member-card`}>
      <h2>{membership.user.name}</h2>

      <div className='badges'>
        <Badge
          className='badge'
          variantColor={useBadgeColor(membership.role || 'PENDING')}>
          {membership.role}
        </Badge>
        <Badge
          className='badge'
          variantColor={useBadgeColor(membership.state || 'PENDING')}>
          {membership.state}
        </Badge>
      </div>

      <div className='action-buttons'>
        {permission.accept && action.accept && (
          <Button variantColor='green' className='action-button'>
            Accept
          </Button>
        )}

        {permission.ban && action.ban && !isFounder && !isSelf && (
          <Button
            className='action-button'
            variant='outline'
            variantColor='red'>
            Ban
          </Button>
        )}

        {permission.kick && action.kick && !isFounder && !isSelf && (
          <Button
            className='action-button'
            variant='outline'
            variantColor='teal'>
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

        {permission.unban && action.unban && (
          <Button
            variant='outline'
            variantColor='red'
            className='action-button'>
            Unbanned
          </Button>
        )}
      </div>
    </div>
  )
}

export default MemberCard
