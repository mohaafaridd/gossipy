import { createContext } from 'react'
import { State, Methods } from '../../interfaces/context/membership'

const MembershipContext = createContext<State & Methods>({
  createMembership: () => undefined,
  updateMembership: () => undefined,
  deleteMembership: () => undefined,
  setMemberships: () => undefined,
  setMembership: () => undefined
})

export const { Provider: MembershipProvider, Consumer } = MembershipContext
export default MembershipContext
