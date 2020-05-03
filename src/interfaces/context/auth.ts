import { User } from '../User'

export interface State {
  authenticated: boolean
  token?: string
  user?: User
  loading?: boolean
}

export interface Methods {
  signUser(user: User, token: string): void
  removeUser(): void
  getUser(): void
  setUser(user: User): void
}

export interface Action {
  type: ActionTypes
  payload?: State
}

export type ActionTypes = 'SIGN_USER' | 'REMOVE_USER' | 'SET_USER'
