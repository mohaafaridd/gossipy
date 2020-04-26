import React, { FC, useReducer } from 'react'
import { StationProvider } from './stationContext'
import reducer from './stationReducer'
import { State, Methods } from '../../interfaces/context/station'

const StationState: FC = ({ children }) => {
  const initialState: State = {
    stations: [],
    station: undefined
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const methods: Methods = {
    createStation(station) {
      dispatch({
        type: 'CREATE_STATION',
        payload: {
          station
        }
      })
    },

    updateStation(station) {
      dispatch({
        type: 'UPDATE_STATION',
        payload: {
          station
        }
      })
    },

    deleteStation(station) {
      dispatch({
        type: 'DELETE_STATION',
        payload: {
          station
        }
      })
    },

    setStations(stations) {
      dispatch({
        type: 'SET_STATIONS',
        payload: {
          stations
        }
      })
    },

    setStation(station) {
      dispatch({
        type: 'SET_STATION',
        payload: {
          station
        }
      })
    }
  }

  return (
    <StationProvider value={{ ...state, ...methods }}>
      {children}
    </StationProvider>
  )
}

export default StationState
