import React, { useContext } from 'react'
import { Helmet } from 'react-helmet'
import { Redirect } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import AuthContext from '../context/auth/authContext'
import Loading from '../components/layout/Loading'
import { Membership } from '../interfaces/Membership'
import SubscriptionStationCard from '../components/stations/SubscriptionStationCard'
import { GET_MEMBERSHIPS } from '../graphql/queries'
import BackgroundMessage from '../components/layout/BackgroundMessage'

const Subscriptions = () => {
  const { authenticated, user } = useContext(AuthContext)
  const { loading, data, error } = useQuery(GET_MEMBERSHIPS, {
    variables: {
      user: user?.id
    }
  })

  if (!authenticated) return <Redirect to='/explore' />

  if (loading) return <Loading message='Loading your subscriptions' />

  if (error)
    return (
      <BackgroundMessage message='Error loading subscriptions' type='Error' />
    )

  const {
    memberships
  }: {
    memberships: {
      data: Membership[]
      count: number
    }
  } = data

  memberships.data = memberships.data.filter(
    membership => membership.state === 'ACTIVE'
  )
  memberships.count = memberships.data.length

  if (memberships.count === 0)
    return (
      <BackgroundMessage type='Check' message='No Subscriptions were found' />
    )

  return (
    <div id='subscriptions'>
      <Helmet>
        <title>Subscriptions Page</title>
      </Helmet>
      {memberships.data.map(membership => (
        <SubscriptionStationCard key={membership.id} membership={membership} />
      ))}
    </div>
  )
}

export default Subscriptions
