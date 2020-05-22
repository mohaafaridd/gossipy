import React, { useContext, useEffect } from 'react'
import moment from 'moment'
import { useColorMode, Avatar } from '@chakra-ui/core'
import { useQuery } from '@apollo/react-hooks'
import { Membership } from '../interfaces/Membership'
import useGradient from '../hooks/useGradient'
import Loading from './layout/Loading'
import { AuthContext, StationContext, MembershipContext } from '../context/'
import StationSubscribeButton from './StationSubscribeButton'
import StationLeaveButton from './StationLeaveButton'
import { GET_MEMBERSHIP } from '../graphql/queries'
import StationManageButton from './StationManageButton'
import BackgroundMessage from './layout/BackgroundMessage'
import LinkButton from './common/LinkButton'

const StationInfo = () => {
  const [, , [bg]] = useGradient()
  const { station } = useContext(StationContext)
  const { setMembership, membership } = useContext(MembershipContext)
  const authContext = useContext(AuthContext)
  const { colorMode } = useColorMode()
  const borderClass = colorMode === 'light' ? 'border' : ''
  const formation =
    membership?.role === 'ADMIN' || membership?.role === 'MODERATOR'
      ? 'three-btns-formation'
      : membership?.state === 'ACTIVE'
      ? 'two-btns-formation'
      : 'one-btn-formation'

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

  if (loading) return <Loading message='Loading Membership Information' />

  if (!station || error)
    return <BackgroundMessage type='Error' message='Error getting station' />

  const { topics, members } = station

  const activeMembers = members?.filter(
    membership => membership.state === 'ACTIVE'
  )

  const date = moment(station.createdAt)
    .utc()
    .format('Do MMM YYYY')

  return (
    <div id='station-info' className={`${bg} ${borderClass}`}>
      <h2>{station.name}</h2>
      <Avatar
        id='station-avatar'
        alignSelf='center'
        size='2xl'
        src={`${process.env.REACT_APP_S3}/${station?.image}`}
      />
      <small>Founded on {date}</small>

      <div className='counters'>
        <div className='counter'>
          <div>{activeMembers?.length} Members</div>
        </div>
        <div className='counter'>
          <div>{topics?.length} Topics</div>
        </div>
      </div>

      <div className={`buttons ${formation}`}>
        {authContext.authenticated && membership?.state !== 'ACTIVE' && (
          <StationSubscribeButton station={station} />
        )}

        {authContext.authenticated && membership?.state === 'ACTIVE' && (
          <LinkButton to='/submit' variant='solid' variantColor='blue'>
            Gossip
          </LinkButton>
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
