import { createContext } from 'react'
import { State } from '../../interfaces/context/auth'

const AuthContext = createContext<State>({
  authenticated: false
})

export const { Provider: AuthProvider, Consumer } = AuthContext
export default AuthContext
