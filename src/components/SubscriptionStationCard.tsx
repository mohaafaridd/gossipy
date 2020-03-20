import React from 'react'
import moment from 'moment'
import useGradiant from '../hooks/useGradiant'
import { Membership } from '../interfaces/Membership'
import { Badge, Button } from '@chakra-ui/core'
import StationLeaveButton from './StationLeaveButton'

const SubscriptionStationCard = ({
  membership
}: {
  membership: Membership
}) => {
  const [[bg]] = useGradiant()

  const joinDate = moment(membership.createdAt).format('Do MMM YYYY')

  return (
    <div className={`rounded-md p-2 ${bg}`}>
      <div>
        <h2 className='inline-block'>{membership.station.name}</h2>{' '}
        <Badge variantColor='green'>{membership.role}</Badge>
      </div>
      <small>Member since {joinDate}</small>
      {membership.role !== 'FOUNDER' && (
        <StationLeaveButton membership={membership} />
      )}
      {membership.role === 'FOUNDER' && <Button>Manage Station</Button>}
    </div>
  )
}

export default SubscriptionStationCard
