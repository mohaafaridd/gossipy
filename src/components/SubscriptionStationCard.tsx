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
  const [[bg, shade]] = useGradiant()

  const joinDate = moment(membership.createdAt).format('Do MMM YYYY')

  return (
    <div className={`station-subscription-card ${shade}`}>
      <div className='body'>
        <h2>
          {membership.station.name}{' '}
          <Badge className='badge' variantColor='green'>
            {membership.role}
          </Badge>
        </h2>{' '}
        <small>Member since {joinDate}</small>
      </div>

      <div className='buttons'>
        {membership.role !== 'MEMBER' && (
          <Button className='manage-btn'>Manage Station</Button>
        )}
        {membership.role !== 'FOUNDER' && (
          <StationLeaveButton membership={membership} />
        )}
      </div>
    </div>
  )
}

export default SubscriptionStationCard
