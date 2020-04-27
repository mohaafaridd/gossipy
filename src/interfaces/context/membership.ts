import { Membership } from '../Membership'

export interface State {
  memberships?: Membership[]
  membership?: Membership
}

export interface Methods {
  createMembership(membership: Membership): void
  updateMembership(membership: Membership): void
  deleteMembership(membership: Membership): void
  setMemberships(memberships: Membership[]): void
  setMembership(membership?: Membership): void
}

export interface Action {
  type: ActionTypes
  payload: State
}

export type ActionTypes =
  | 'CREATE_MEMBERSHIP'
  | 'UPDATE_MEMBERSHIP'
  | 'DELETE_MEMBERSHIP'
  | 'SET_MEMBERSHIPS'
  | 'SET_MEMBERSHIP'
