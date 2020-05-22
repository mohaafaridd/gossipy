import React, { useContext } from 'react'
import { Badge, Button, Menu, MenuList, useColorMode } from '@chakra-ui/core'
import useBadgeColor from '../hooks/useBadgeColor'
import usePermissions from '../hooks/usePermissions'
import useGradient from '../hooks/useGradient'
import { MembershipContext } from '../context/'
import { Membership } from '../interfaces/Membership'
import MenuButton from './common/MenuButton'
import { MemberCardButton, MemberCardMenuItem } from './MemberCardButtons'
import { Link } from 'react-router-dom'

const MemberCard = ({ membership }: { membership: Membership }) => {
  const { membership: userMembership } = useContext(MembershipContext)
  const [permission, action] = usePermissions(
    userMembership?.role,
    membership.state
  )
  const [[, shade]] = useGradient()
  const isFounder = membership.role === 'FOUNDER'
  const isSelf = membership.id === userMembership?.id
  const { colorMode } = useColorMode()
  const borderClass = colorMode === 'light' ? 'border' : ''

  return (
    <div className={`member-card ${shade} ${borderClass} `}>
      <Link to={`/u/${membership.user.identifier}`}>
        <h2>{membership.user.name}</h2>
      </Link>

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
          <MemberCardButton
            color='green'
            variant='solid'
            membership={membership}
            action='Accept'
          />
        )}

        {permission.ban && action.ban && !isFounder && !isSelf && (
          <MemberCardButton
            color='red'
            variant='outline'
            membership={membership}
            action='Ban'
          />
        )}

        {permission.kick && action.kick && !isFounder && !isSelf && (
          <MemberCardButton
            color='teal'
            variant='solid'
            membership={membership}
            action='Kick'
          />
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
            <MenuList title='Roles' onChange={() => console.log('changed')}>
              <MemberCardMenuItem level='ADMIN' membership={membership} />
              <MemberCardMenuItem level='MODERATOR' membership={membership} />
              <MemberCardMenuItem level='MEMBER' membership={membership} />
            </MenuList>
          </Menu>
        )}

        {permission.unban && action.unban && (
          <MemberCardButton
            color='red'
            variant='outline'
            membership={membership}
            action='Unban'
          />
        )}
      </div>
    </div>
  )
}

export default MemberCard
