import { User } from '../User'

export interface State {
  authenticated: boolean
  token?: string
  user?: User
}

export interface Action {
  type: ActionTypes
  payload?: State
}

export enum ActionTypes {}
