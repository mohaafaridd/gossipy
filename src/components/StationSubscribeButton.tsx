import React, { useContext, useState, useEffect } from 'react'
import { Button, useToast } from '@chakra-ui/core'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'
import StationContext from '../context/station/stationContext'
import { Station } from '../interfaces/Station'
import { Membership } from '../interfaces/Membership'

const CREATE_MEMBERSHIP = gql`
  mutation($stationId: ID!) {
    createMembership(stationId: $stationId) {
      id
      state
      role
    }
  }
`

const StationSubscribeButton = ({ station }: { station: Station }) => {
  const toast = useToast()
  const stationContext = useContext(StationContext)
  const [subscribe, { loading }] = useMutation(CREATE_MEMBERSHIP)
  const [props, setProps] = useState(stationContext.getSubscriptionProps())

  const handleSubscribe = async () => {
    const { data } = await subscribe({ variables: { stationId: station.id } })
    const { createMembership }: { createMembership: Membership } = data
    stationContext.setMembership(createMembership)
    toast({
      status: 'success',
      title:
        createMembership.state === 'ACTIVE'
          ? `You've joined to ${station.name}!`
          : 'Your request has been sent to station admins'
    })
  }

  useEffect(() => {
    setProps(stationContext.getSubscriptionProps())
    // eslint-disable-next-line
  }, [stationContext.membership])

  return (
    <Button
      className='main-btn'
      onClick={handleSubscribe}
      variantColor={props.color}
      isDisabled={props.disabled}
      isLoading={loading}>
      {props.message}
    </Button>
  )
}

export default StationSubscribeButton
