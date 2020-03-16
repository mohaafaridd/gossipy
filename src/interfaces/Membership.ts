import { User } from './User'
import { Station } from './Station'
import { Topic } from './Topic'
import { Comment } from './Comment'
import { Vote } from './Vote'

export interface Membership {
  // Mandatory
  id: string
  user: User
  station: Station
  topics: Topic[]
  comments: Comment[]
  votes: Vote[]

  // Optional
  createdAt?: string
  updatedAt?: string
}
