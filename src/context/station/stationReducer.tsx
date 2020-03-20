import { State, Action } from '../../interfaces/context/station'

export default (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_STATION':
      return {
        ...state,
        station: action.payload?.station
      }

    case 'SET_MEMBERSHIP':
      return {
        ...state,
        membership: action.payload?.membership
      }
  }
}
