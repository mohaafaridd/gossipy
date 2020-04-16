import { User } from './User'
import { Station } from './Station'
import { Topic } from './Topic'

export interface Search {
  users: User[]
  stations: Station[]
  topics: Topic[]
}
