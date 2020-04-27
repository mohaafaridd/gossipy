import { useContext } from 'react'
import { MembershipContext, StationContext } from '../context/'

interface SubscriptionProps {
  color: string
  message: string
  disabled: boolean
}

export default function useSubscriptionBtnProps(): SubscriptionProps {
  const { station } = useContext(StationContext)
  const { membership } = useContext(MembershipContext)

  switch (membership?.state) {
    case 'ACTIVE':
      return {
        color: 'red',
        disabled: true,
        message: 'Leave Station'
      }
    case 'BANNED':
      return {
        color: 'red',
        disabled: true,
        message: "You're banned"
      }

    case 'PENDING':
      return {
        color: 'gray',
        disabled: true,
        message: 'Request Pending'
      }

    default:
      return {
        color: 'green',
        disabled: false,
        message: `${station?.public ? '' : 'Request '}Join`
      }
  }
}
