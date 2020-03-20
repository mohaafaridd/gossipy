import React, { useContext } from 'react'
import AuthContext from '../context/auth/authContext'
import { Redirect } from 'react-router-dom'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import Loading from '../components/Loading'
import { Membership } from '../interfaces/Membership'
import useGradiant from '../hooks/useGradiant'
import moment from 'moment'
import { Badge, Button } from '@chakra-ui/core'
import StationLeaveButton from '../components/StationLeaveButton'

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

  const [[bg, shade]] = useGradiant()

  if (!authenticated) return <Redirect to='/explore' />

  if (loading) return <Loading message='Loading your subscriptions' />

  const { userMemberships }: { userMemberships: Membership[] } = data

  const memberSince = (date: string) => moment(date).format('Do MMM YYYY')

  return (
    <div className='flex-grow'>
      {userMemberships.map(membership => (
        <div key={membership.id} className={`${bg} rounded-md p-2`}>
          <h1>{membership.station.name}</h1>
          <small>Member since {memberSince(membership.createdAt || '')}</small>
          <div>
            <Badge variantColor='green'>{membership.role}</Badge>
          </div>
          {membership.role !== 'FOUNDER' && (
            <StationLeaveButton membership={membership} />
          )}
          {membership.role === 'FOUNDER' && <Button>Manage Station</Button>}
        </div>
      ))}
    </div>
  )
}

export default Subscriptions
