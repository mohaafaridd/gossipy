import { State, Action } from '../../interfaces/context/auth'

export default (state: State, action: Action): State => {
  switch (action.type) {
    case 'SIGN_USER':
      return {
        ...state,
        ...action.payload
      }

    case 'REMOVE_USER':
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
