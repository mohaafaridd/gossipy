import React, { FC, useReducer } from 'react'
import { AuthProvider } from './authContext'
import { State, ActionTypes, Methods } from '../../interfaces/context/auth'
import reducer from './authReducer'

const AuthState: FC = ({ children }) => {
  const initialState: State = {
    authenticated: false,
    token: undefined,
    user: undefined
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const methods: Methods = {
    signUser: (user, token) =>
      dispatch({
        type: ActionTypes.SIGN_USER,
        payload: { authenticated: true, token, user }
      }),
    removeUser: () => dispatch({ type: ActionTypes.REMOVE_USER })
  }

  return (
    <AuthProvider
      value={{
        ...state,
        ...methods
      }}>
      {children}
    </AuthProvider>
  )
}

export default AuthState
