import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/auth/authContext'
import { useParams, Redirect } from 'react-router-dom'
import StationContext from '../context/station/stationContext'
import { GET_MEMBERSHIP } from '../graphql/queries'
import { useQuery } from '@apollo/react-hooks'
import Loading from '../components/Loading'
import { Membership } from '../interfaces/Membership'

const ManageStation = () => {
  const { authenticated } = useContext(AuthContext)
  const stationContext = useContext(StationContext)
  const { identifier } = useParams()
  const [loading, setLoading] = useState(true)

  const { loading: fetchLoading, data } = useQuery(GET_MEMBERSHIP, {
    variables: { station: identifier }
  })

  useEffect(() => {
    if (data) {
      const { userMembership }: { userMembership: Membership } = data
      stationContext.setMembership(userMembership)
      stationContext.setStation(userMembership.station)
      setLoading(false)
    }
    // eslint-disable-next-line
  }, [data])

  if (!authenticated) return <Redirect to={`/s/${identifier}`} />

  if (loading || fetchLoading) return <Loading message='Loading Station Info' />

  if (stationContext.station?.identifier !== identifier)
    return <Redirect to={`/s/${identifier}`} />

  return (
    <div>
      <h1>Manage Station</h1>
    </div>
  )
}

export default ManageStation
