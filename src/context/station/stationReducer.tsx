import { State, Action } from '../../interfaces/context/station'

export default (state: State, action: Action): State => {
  switch (action.type) {
    case 'CREATE_STATION': {
      const { station } = action.payload
      return {
        ...state,
        station
      }
    }

    case 'UPDATE_STATION': {
      const { station } = action.payload
      return {
        ...state,
        station
      }
    }

    case 'DELETE_STATION': {
      const { station } = action.payload
      return {
        ...state,
        stations: state.stations?.filter(item => item.id !== station?.id)
      }
    }

    case 'SET_STATION': {
      const { station } = action.payload
      return {
        ...state,
        station
      }
    }

    case 'SET_STATIONS': {
      const { stations } = action.payload
      return {
        ...state,
        stations
      }
    }

    default:
      return state
  }
}
