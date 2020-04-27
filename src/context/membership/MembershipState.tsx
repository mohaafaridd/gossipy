import React, { FC, useReducer } from 'react'
import { State, Methods } from '../../interfaces/context/membership'
import reducer from './membershipReducer'
import { MembershipProvider } from './membershipContext'
const MembershipState: FC = ({ children }) => {
  const initialState: State = {
    membership: undefined,
    memberships: []
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const methods: Methods = {
    createMembership(membership) {
      dispatch({
        type: 'CREATE_MEMBERSHIP',
        payload: {
          membership
        }
      })
    },

    updateMembership(membership) {
      dispatch({
        type: 'UPDATE_MEMBERSHIP',
        payload: {
          membership
        }
      })
    },

    deleteMembership(membership) {
      dispatch({
        type: 'DELETE_MEMBERSHIP',
        payload: {
          membership
        }
      })
    },

    setMembership(membership) {
      dispatch({
        type: 'SET_MEMBERSHIP',
        payload: {
          membership
        }
      })
    },

    setMemberships(memberships) {
      dispatch({
        type: 'SET_MEMBERSHIPS',
        payload: {
          memberships
        }
      })
    }
  }

  return (
    <MembershipProvider
      value={{
        ...state,
        ...methods
      }}>
      {children}
    </MembershipProvider>
  )
}

export default MembershipState
