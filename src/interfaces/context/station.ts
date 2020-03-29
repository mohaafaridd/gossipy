import { Membership } from '../Membership'
import { Station } from '../Station'

interface SubscriptionProps {
  color: string
  message: string
  disabled: boolean
}

export interface State {
  station?: Station
  membership?: Membership
}

export interface Methods {
  setStation(station: Station | undefined): void
  setMembership(membership: Membership | undefined): void
  getSubscriptionProps(): SubscriptionProps
}

export interface Action {
  type: ActionTypes
  payload?: State
}

export type ActionTypes = 'SET_STATION' | 'SET_MEMBERSHIP'
