import { createContext } from 'react'
import { State, Methods } from '../../interfaces/context/auth'

const AuthContext = createContext<State & Methods>({
  authenticated: false,
  signUser: (user, token) => undefined,
  removeUser: () => undefined,
  getUser: () => undefined,
  setUser: () => undefined
})

export const { Provider: AuthProvider, Consumer } = AuthContext
export default AuthContext
