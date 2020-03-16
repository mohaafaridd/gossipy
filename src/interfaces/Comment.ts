import { User } from './User'
import { Station } from './Station'
import { Topic } from './Topic'
import { Vote } from './Vote'

export interface Comment {
  // Mandatory
  id: string
  content: string

  // Optional
  user?: User
  station?: Station
  topic?: Topic
  votes?: Vote[]
  createdAt?: string
  updatedAt?: string
}
