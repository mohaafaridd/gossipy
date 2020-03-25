import React, { useContext, useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useQueryParam, NumberParam } from 'use-query-params'

import { MembershipState, Role, Membership } from '../interfaces/Membership'
import StationContext from '../context/station/stationContext'
import { GET_MEMBERSHIPS_STATION } from '../graphql/queries'
import BackgroundMessage from './BackgroundMessage'
import Loading from './Loading'
import MemberCard from './MemberCard'

const ManageStationMembers = ({
  state,
  role
}: {
  state?: MembershipState
  role?: Role
}) => {
  const [memberships, setMemberships] = useState<Membership[]>([])
  const [index, setIndex] = useQueryParam('index', NumberParam)
  const stationContext = useContext(StationContext)

  if (!index) setIndex(1)

  const variables = {
    page: index ? index : 1,
    state,
    role,
    station: stationContext.station?.id
  }

  const { data, loading, error } = useQuery(GET_MEMBERSHIPS_STATION, {
    variables
  })

  useEffect(() => {
    if (data) {
      setMemberships(data.memberships)
    }
  }, [data])

  if (loading) return <Loading message={`Loading users`} />

  if (error)
    return <BackgroundMessage message='Error fetching members' type='Error' />

  return (
    <div className='p-2'>
      {memberships.map(membership => (
        <MemberCard key={membership.id} membership={membership} />
      ))}
    </div>
  )
}

export default ManageStationMembers
