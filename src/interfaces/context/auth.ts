import { User } from '../User'

export interface State {
  authenticated: boolean
  token?: string
  user?: User
}

export interface Methods {
  signUser(user: User, token: string): void
  removeUser(): void
}

export interface Action {
  type: ActionTypes
  payload?: State
}

export enum ActionTypes {
  SIGN_USER = 'SIGN_USER',
  REMOVE_USER = 'REMOVE_USER'
}
