import { createContext } from 'react'
import { State, Methods } from '../../interfaces/context/station'

const StationContext = createContext<State & Methods>({
  createStation: station => undefined,
  updateStation: station => undefined,
  deleteStation: station => undefined,
  setStations: stations => undefined,
  setStation: station => undefined
})

export const { Provider: StationProvider, Consumer } = StationContext
export default StationContext
