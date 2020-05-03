import React, { FC, useReducer } from 'react'
import { useCookies } from 'react-cookie'
import moment from 'moment'
import { AuthProvider } from './authContext'
import { State, Methods } from '../../interfaces/context/auth'
import reducer from './authReducer'

const AuthState: FC = ({ children }) => {
  const initialState: State = {
    authenticated: false,
    token: undefined,
    user: undefined,
    loading: true
  }

  const [cookies, setCookie, removeCookies] = useCookies(['token', 'user'])

  const [state, dispatch] = useReducer(reducer, initialState)

  const methods: Methods = {
    getUser: () => {
      dispatch({
        type: 'SIGN_USER',
        payload: {
          authenticated: !!cookies.user,
          token: cookies.token,
          user: cookies.user,
          loading: false
        }
      })
    },

    setUser(user) {
      dispatch({
        type: 'SET_USER',
        payload: {
          authenticated: true,
          user
        }
      })
    },

    signUser: (user, token) => {
      setCookie('token', token, {
        maxAge: moment.duration(1, 'month').asSeconds(),
        sameSite: true,
        path: '/'
      })

      setCookie('user', user, {
        maxAge: moment.duration(1, 'month').asSeconds(),
        sameSite: true,
        path: '/'
      })

      dispatch({
        type: 'SIGN_USER',
        payload: { authenticated: true, token, user }
      })
    },

    removeUser: () => {
      removeCookies('token', {
        path: '/',
        sameSite: true
      })
      removeCookies('user', {
        sameSite: true,
        path: '/'
      })
      dispatch({ type: 'REMOVE_USER' })
    }
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
