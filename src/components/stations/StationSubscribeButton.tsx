import React, { useContext } from 'react'
import { Button, useToast } from '@chakra-ui/core'
import { useMutation } from '@apollo/react-hooks'
import { MembershipContext } from '../../context/index'
import { Station, Membership } from '../../interfaces'
import { CREATE_MEMBERSHIP } from '../../graphql/mutations'
import useSubscriptionBtnProps from '../../hooks/useSubscriptionBtnProps'

const StationSubscribeButton = ({ station }: { station: Station }) => {
  const toast = useToast()
  const { setMembership } = useContext(MembershipContext)
  const [subscribe, { loading }] = useMutation(CREATE_MEMBERSHIP)
  // const [props, setProps] = useState(useSubscriptionBtnProps())
  const props = useSubscriptionBtnProps()

  const handleSubscribe = async () => {
    try {
      console.log('station', station)
      const { id } = station
      console.log('id', id)
      const { data } = await subscribe({ variables: { stationId: id } })
      const { createMembership }: { createMembership: Membership } = data
      setMembership(createMembership)
      toast({
        status: 'success',
        title:
          createMembership.state === 'ACTIVE'
            ? `You've joined to ${station.name}!`
            : 'Your request has been sent to station admins'
      })
    } catch (error) {
      toast({
        status: 'error',
        title: 'Join request not sent'
      })
    }
  }

  // useEffect(() => {
  //   setProps(useSubscriptionBtnProps())
  //   // eslint-disable-next-line
  // }, [membership])

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
