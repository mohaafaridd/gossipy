import { createContext } from 'react'
import { State, Methods } from '../../interfaces/context/station'

const StationContext = createContext<State & Methods>({
  setMembership: membership => undefined,
  setStation: station => undefined,
  getSubscriptionProps: () => ({ color: 'gray', disabled: true, message: '' })
})

export const { Provider: StationProvider, Consumer } = StationContext
export default StationContext
