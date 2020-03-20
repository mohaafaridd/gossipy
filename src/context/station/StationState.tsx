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
    },

    getSubscriptionProps() {
      switch (state.membership?.state) {
        case 'ACTIVE':
          return {
            color: 'red',
            disabled: true,
            message: 'Leave Station'
          }
        case 'BANNED':
          return {
            color: 'red',
            disabled: true,
            message: "You're banned"
          }

        case 'PENDING':
          return {
            color: 'gray',
            disabled: true,
            message: 'Request Pending'
          }

        default:
          return {
            color: 'green',
            disabled: false,
            message: `${state.station?.public ? '' : 'Request '}Join`
          }
      }
    }
  }

  return (
    <StationProvider value={{ ...state, ...methods }}>
      {children}
    </StationProvider>
  )
}

export default StationState
