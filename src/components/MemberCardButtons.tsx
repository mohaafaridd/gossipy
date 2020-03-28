import React from 'react'
import { Button, useToast, MenuItem } from '@chakra-ui/core'
import { useMutation } from '@apollo/react-hooks'
import { UPDATE_MEMBERSHIP } from '../graphql/mutations'
import { MembershipState, Role, Membership } from '../interfaces/Membership'

type Actions = 'Accept' | 'Ban' | 'Kick' | 'Level' | 'Unban'
type Variants = 'outline' | 'link' | 'solid' | 'ghost' | 'unstyled'
type VariantColors = 'red' | 'green' | 'blue' | 'teal' | 'teal' | 'purple'
interface Variables {
  id: string
  data: {
    state?: MembershipState
    role?: Role
  }
}

export const MemberCardButton = ({
  membershipId,
  action,
  variant = 'solid',
  color = 'green'
}: {
  membershipId: string
  action: Actions
  variant: Variants
  color: VariantColors
}) => {
  const toast = useToast()
  const [updateMembership, { loading }] = useMutation(UPDATE_MEMBERSHIP)

  const handleOnClick = async () => {
    const variables: Variables = {
      id: membershipId,
      data: {
        state:
          action === 'Accept'
            ? 'ACTIVE'
            : action === 'Ban'
            ? 'BANNED'
            : action === 'Kick' || action === 'Unban'
            ? 'DETACHED'
            : undefined
      }
    }

    await updateMembership({ variables })

    toast({
      title: `Membership is successfully ${action}`
    })
  }

  return (
    <Button
      onClick={handleOnClick}
      isLoading={loading}
      className='action-button'
      variant={variant}
      variantColor={color}>
      {action}
    </Button>
  )
}

export const MemberCardMenuItem = ({
  membership,
  level
}: {
  membership: Membership
  level: Role
}) => {
  const toast = useToast()
  const [updateMembership, { loading }] = useMutation(UPDATE_MEMBERSHIP)

  const handleOnClick = async () => {
    const variables: Variables = {
      id: membership.id,
      data: {
        role: level
      }
    }

    await updateMembership({ variables })

    toast({
      title: `Membership role has been successfully changed`
    })
  }

  return (
    <MenuItem isDisabled={membership.role === level} onClick={handleOnClick}>
      {level.charAt(0) + level.substr(1).toLowerCase()}
    </MenuItem>
  )
}
