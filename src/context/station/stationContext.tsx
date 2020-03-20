import { createContext } from 'react'
import { State, Methods } from '../../interfaces/context/station'

const StationContext = createContext<State & Methods>({})

export const { Provider: StationProvider, Consumer } = StationContext
export default StationContext
