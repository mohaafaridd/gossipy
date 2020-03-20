import React, { useContext } from 'react'
import AuthContext from '../context/auth/authContext'
import { Redirect } from 'react-router-dom'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import Loading from '../components/Loading'
import { Membership } from '../interfaces/Membership'
import SubscriptionStationCard from '../components/SubscriptionStationCard'

const GET_SUBSCRIPTIONS = gql`
  query getSubscriptions {
    userMemberships {
      id
      state
      role
      station {
        id
        name
        public
      }

      createdAt
    }
  }
`

const Subscriptions = () => {
  const { authenticated } = useContext(AuthContext)

  const { loading, data } = useQuery(GET_SUBSCRIPTIONS)

  if (!authenticated) return <Redirect to='/explore' />

  if (loading) return <Loading message='Loading your subscriptions' />

  const { userMemberships }: { userMemberships: Membership[] } = data

  return (
    <div className='flex-grow'>
      {userMemberships.map(membership => (
        <SubscriptionStationCard membership={membership} />
      ))}
    </div>
  )
}

export default Subscriptions
