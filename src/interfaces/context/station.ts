import { Membership } from '../Membership'
import { Station } from '../Station'

export interface State {
  station?: Station
  membership?: Membership
}

export interface Methods {
  setStation?(station: Station): void
  setMembership?(membership: Membership): void
}

export interface Action {
  type: ActionTypes
  payload?: State
}

export type ActionTypes = 'SET_STATION' | 'SET_MEMBERSHIP'
