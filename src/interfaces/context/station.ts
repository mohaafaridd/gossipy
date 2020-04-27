import { Station } from '../Station'

export interface State {
  stations?: Station[]
  station?: Station
}

export interface Methods {
  createStation(station: Station): void
  updateStation(station: Station): void
  deleteStation(station: Station): void
  setStations(stations: Station[]): void
  setStation(station?: Station): void
}

export interface Action {
  type: ActionTypes
  payload: State
}

export type ActionTypes =
  | 'CREATE_STATION'
  | 'UPDATE_STATION'
  | 'DELETE_STATION'
  | 'SET_STATIONS'
  | 'SET_STATION'
