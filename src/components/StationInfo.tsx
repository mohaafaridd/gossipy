import React, { useState, useContext, useEffect } from 'react'
import moment from 'moment'
import { Station } from '../interfaces/Station'
import { Membership } from '../interfaces/Membership'
import useGradiant from '../hooks/useGradiant'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from '@apollo/react-hooks'
import Loading from './Loading'
import AuthContext from '../context/auth/authContext'
import { Button, useToast } from '@chakra-ui/core'

const CREATE_MEMBERSHIP = gql`
  mutation($stationId: ID!) {
    createMembership(stationId: $stationId) {
      id
      state
      role
    }
  }
`

const GET_MEMBERSHIP = gql`
  query getMembership($station: ID!) {
    userMembership(station: $station) {
      id
      state
      role
    }
  }
`

interface JoinState {
  color: string
  message: string
  disabled: boolean
}

const generateJoinState = (
  station: Station,
  membership: Membership
): JoinState => {
  switch (membership.state) {
    case 'PENDING':
      return {
        color: 'gray',
        disabled: true,
        message: 'Request Pending'
      }

    case 'BANNED':
      return {
        color: 'red',
        disabled: true,
        message: "You're banned"
      }

    default:
      return {
        color: 'green',
        disabled: false,
        message: `${station.public ? '' : 'Request '}Join`
      }
  }
}

const StationInfo = ({ station }: { station: Station }) => {
  const toast = useToast()

  const authContext = useContext(AuthContext)

  const [isActiveMember, setIsActiveMember] = useState(false)

  const [joinState, setJoinState] = useState<JoinState>({
    message: 'Join',
    color: 'green',
    disabled: false
  })

  const { data, loading } = useQuery(GET_MEMBERSHIP, {
    variables: {
      station: station.id
    }
  })

  const [joinStation, { loading: joinLoading }] = useMutation(CREATE_MEMBERSHIP)

  const [, , [bg]] = useGradiant()
  const { topics, members } = station

  const activeMembers = members?.filter(
    membership => membership.state === 'ACTIVE'
  )

  const date = moment(station.createdAt).format('Do MMM YYYY')

  useEffect(() => {
    if (data) {
      const { userMembership }: { userMembership: Membership } = data
      if (userMembership) {
        const state = generateJoinState(station, userMembership)
        setJoinState(state)
        setIsActiveMember(userMembership.state === 'ACTIVE')
      }
    }
    // eslint-disable-next-line
  }, [data])

  if (loading) return <Loading message='Loading Membership Information' />

  const handleJoinRequest = async () => {
    const { data } = await joinStation({ variables: { stationId: station.id } })
    const { createMembership }: { createMembership: Membership } = data
    const state = generateJoinState(station, createMembership)
    setJoinState(state)
    setIsActiveMember(createMembership.state === 'ACTIVE')
    toast({
      status: 'success',
      title:
        createMembership.state === 'ACTIVE'
          ? `You've joined to ${station.name}!`
          : 'Your request has been sent to station admins'
    })
  }

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

      {authContext.authenticated && !isActiveMember && (
        <Button
          className='main-btn'
          onClick={handleJoinRequest}
          variantColor={joinState.color}
          isDisabled={joinState.disabled}
          isLoading={joinLoading}>
          {joinState.message}
        </Button>
      )}
    </div>
  )
}

export default StationInfo
