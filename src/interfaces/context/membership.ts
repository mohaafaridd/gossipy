import { Membership } from '../Membership'

export interface State {
  memberships: Membership[]
  membership: Membership
}

export interface Methods {
  createMembership(membership: Membership): void
  updateMembership(membership: Membership): void
  deleteMembership(membership: Membership): void
  setMembership(membership: Membership): void
  clearMembership(): void
}

export interface Action {
  type: ActionTypes
  payload?: State
}

export type ActionTypes =
  | 'CREATE_MEMBERSHIP'
  | 'UPDATE_MEMBERSHIP'
  | 'DELETE_MEMBERSHIP'
  | 'SET_MEMBERSHIP'
  | 'CLEAR_MEMBERSHIP'
