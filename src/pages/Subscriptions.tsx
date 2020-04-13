import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import AuthContext from '../context/auth/authContext'
import Loading from '../components/Loading'
import { Membership } from '../interfaces/Membership'
import SubscriptionStationCard from '../components/SubscriptionStationCard'
import { GET_MEMBERSHIPS } from '../graphql/queries'
import BackgroundMessage from '../components/BackgroundMessage'

const Subscriptions = () => {
  const { authenticated, user } = useContext(AuthContext)
  const { loading, data } = useQuery(GET_MEMBERSHIPS, {
    variables: {
      user: user?.id
    }
  })

  if (!authenticated) return <Redirect to='/explore' />

  if (loading) return <Loading message='Loading your subscriptions' />

  const {
    memberships
  }: {
    memberships: {
      data: Membership[]
      count: number
    }
  } = data

  if (memberships.count === 0)
    return (
      <BackgroundMessage type='Check' message='No Subscriptions were found' />
    )

  return (
    <div id='subscriptions'>
      {memberships.data.map(membership => (
        <SubscriptionStationCard key={membership.id} membership={membership} />
      ))}
    </div>
  )
}

export default Subscriptions
