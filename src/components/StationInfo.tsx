import React, { useContext, useEffect } from 'react'
import moment from 'moment'
import { useQuery } from '@apollo/react-hooks'
import { Station } from '../interfaces/Station'
import { Membership } from '../interfaces/Membership'
import useGradiant from '../hooks/useGradiant'
import Loading from './Loading'
import AuthContext from '../context/auth/authContext'
import StationSubscribeButton from './StationSubscribeButton'
import StationContext from '../context/station/stationContext'
import StationLeaveButton from './StationLeaveButton'
import { GET_MEMBERSHIP } from '../graphql/queries'

const StationInfo = ({ station }: { station: Station }) => {
  const [, , [bg]] = useGradiant()
  const stationContext = useContext(StationContext)
  const authContext = useContext(AuthContext)

  const { data, loading } = useQuery(GET_MEMBERSHIP, {
    variables: {
      station: station.identifier
    }
  })

  const { topics, members } = station

  const activeMembers = members?.filter(
    membership => membership.state === 'ACTIVE'
  )

  const date = moment(station.createdAt).format('Do MMM YYYY')

  useEffect(() => {
    if (data) {
      const { userMembership }: { userMembership: Membership } = data
      stationContext.setMembership(userMembership)
    }
    // eslint-disable-next-line
  }, [data])

  if (loading) return <Loading message='Loading Membership Information' />

  return (
    <div id='station-info' className={bg}>
      <h2>{station.name}</h2>

      <small>{date}</small>

      <div className='counters'>
        <div className='counter'>
          <div>{activeMembers?.length} Members</div>
        </div>
        <div className='counter'>
          <div>{topics?.length} Topics</div>
        </div>
      </div>

      {authContext.authenticated &&
        stationContext.membership?.state !== 'ACTIVE' && (
          <StationSubscribeButton station={station} />
        )}

      {authContext.authenticated &&
        stationContext.membership?.state === 'ACTIVE' &&
        stationContext.membership.role !== 'FOUNDER' && (
          <StationLeaveButton membership={stationContext.membership} />
        )}
    </div>
  )
}

export default StationInfo
