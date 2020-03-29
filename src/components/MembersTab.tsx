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
  roles = []
}: {
  state?: MembershipState
  roles?: Role[]
}) => {
  const [memberships, setMemberships] = useState<Membership[]>([])
  const [page, setPage] = useQueryParam('page', NumberParam)
  const stationContext = useContext(StationContext)

  if (!page) setPage(1)

  const variables = {
    page: page ? page : 1,
    state,
    roles,
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

  if (memberships.length === 0)
    return (
      <BackgroundMessage
        type='Check'
        message={`No ${state?.toLowerCase() ||
          roles.join('& ').toLowerCase()} users were found`}
      />
    )

  return (
    <div className='p-2'>
      {memberships.map(membership => (
        <MemberCard key={membership.id} membership={membership} />
      ))}
    </div>
  )
}

export default ManageStationMembers
