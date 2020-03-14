import { State, Action } from '../../interfaces/context/topic'

export default (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_TOPICS':
    case 'SET_TOPIC':
      return {
        ...state,
        ...action.payload
      }

    default:
      return state
  }
}
