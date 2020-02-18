import React, { FC, useReducer } from 'react'
import { AuthProvider } from './authContext'
import { State } from '../../interfaces/context/auth'
import reducer from './authReducer'

const AuthState: FC = ({ children }) => {
  const initialState: State = {
    authenticated: false,
    token: undefined,
    user: undefined
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  return <AuthProvider value={state}>{children}</AuthProvider>
}

export default AuthState
