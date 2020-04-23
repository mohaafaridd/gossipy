import { Station } from './Station'
import { Topic } from './Topic'

export interface Tag {
  id: number
  name: string
  stationId: number
  station: Station
  topics: Topic[]
  createdAt: string
  updatedAt: string
}
