import React, { useContext, useEffect } from 'react'
import moment from 'moment'
import { useQuery } from '@apollo/react-hooks'
import { Membership } from '../interfaces/Membership'
import useGradient from '../hooks/useGradient'
import Loading from './Loading'
import AuthContext from '../context/auth/authContext'
import StationSubscribeButton from './StationSubscribeButton'
import StationContext from '../context/station/stationContext'
import StationLeaveButton from './StationLeaveButton'
import { GET_MEMBERSHIP } from '../graphql/queries'
import StationManageButton from './StationManageButton'
import BackgroundMessage from './BackgroundMessage'

const StationInfo = () => {
  const [, , [bg]] = useGradient()
  const { station, setMembership, membership } = useContext(StationContext)
  const authContext = useContext(AuthContext)

  const { data, loading, error } = useQuery(GET_MEMBERSHIP, {
    variables: {
      stationId: station?.id || 0
    }
  })

  useEffect(() => {
    if (data) {
      const { membership }: { membership: Membership } = data
      if (membership) {
        setMembership(membership)
      } else {
        setMembership(undefined)
      }
    }
    // eslint-disable-next-line
  }, [data])

  if (error) console.log('error in station info queries')

  if (loading) return <Loading message='Loading Membership Information' />

  if (!station)
    return <BackgroundMessage type='Error' message='Error getting station' />

  const { topics, members } = station

  const activeMembers = members?.filter(
    membership => membership.state === 'ACTIVE'
  )

  const date = moment(station.createdAt)
    .utc()
    .format('Do MMM YYYY')

  return (
    <div id='station-info' className={bg}>
      <h2>{station.name}</h2>

      <small>Founded on {date}</small>

      <div className='counters'>
        <div className='counter'>
          <div>{activeMembers?.length} Members</div>
        </div>
        <div className='counter'>
          <div>{topics?.length} Topics</div>
        </div>
      </div>

      <div className='buttons'>
        {authContext.authenticated && membership?.state !== 'ACTIVE' && (
          <StationSubscribeButton station={station} />
        )}

        {authContext.authenticated &&
          membership?.state === 'ACTIVE' &&
          membership?.role !== 'MEMBER' && (
            <StationManageButton station={station} />
          )}

        {authContext.authenticated &&
          membership?.state === 'ACTIVE' &&
          membership.role !== 'FOUNDER' && (
            <StationLeaveButton membership={membership} />
          )}
      </div>
    </div>
  )
}

export default StationInfo
