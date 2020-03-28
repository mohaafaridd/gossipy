import React from 'react'
import moment from 'moment'
import useGradient from '../hooks/useGradient'
import { Membership } from '../interfaces/Membership'
import { Badge } from '@chakra-ui/core'
import StationLeaveButton from './StationLeaveButton'
import StationManageButton from './StationManageButton'
import { Link } from 'react-router-dom'

const SubscriptionStationCard = ({
  membership
}: {
  membership: Membership
}) => {
  const [[, shade]] = useGradient()

  const joinDate = moment(membership.createdAt).format('Do MMM YYYY')

  return (
    <div className={`station-subscription-card ${shade}`}>
      <div className='body'>
        <Link to={`/s/${membership.station.identifier}`}>
          <h2>
            {membership.station.name}{' '}
            <Badge className='badge' variantColor='green'>
              {membership.role}
            </Badge>
          </h2>{' '}
        </Link>
        <small>Member since {joinDate}</small>
      </div>

      <div className='buttons'>
        {membership.role !== 'MEMBER' && (
          <StationManageButton station={membership.station} />
        )}
        {membership.role !== 'FOUNDER' && (
          <StationLeaveButton membership={membership} />
        )}
      </div>
    </div>
  )
}

export default SubscriptionStationCard
