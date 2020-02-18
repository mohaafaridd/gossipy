import { State, Action, ActionTypes } from '../../interfaces/context/auth'

export default (state: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.SIGN_USER:
      return {
        ...state,
        ...action.payload
      }

    case ActionTypes.REMOVE_USER:
      return {
        ...state,
        authenticated: false,
        token: undefined,
        user: undefined
      }
    default:
      return state
  }
}
