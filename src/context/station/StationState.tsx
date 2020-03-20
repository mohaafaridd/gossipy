import React, { FC, useReducer } from 'react'
import { StationProvider } from './stationContext'
import reducer from './stationReducer'
import { State, Methods } from '../../interfaces/context/station'
import { Membership } from '../../interfaces/Membership'
import { Station } from '../../interfaces/Station'

const StationState: FC = ({ children }) => {
  const initialState: State = {
    station: undefined,
    membership: undefined
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const methods: Methods = {
    setMembership(membership: Membership) {
      dispatch({
        type: 'SET_MEMBERSHIP',
        payload: {
          membership
        }
      })
    },

    setStation(station: Station) {
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
