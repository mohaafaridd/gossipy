import { User } from './User'
import { Station } from './Station'
import { Topic } from './Topic'
import { Comment } from './Comment'
import { Vote } from './Vote'

export type MembershipState = 'PENDING' | 'ACTIVE' | 'DETACHED' | 'BANNED'
export type Role = 'FOUNDER' | 'ADMIN' | 'MODERATOR' | 'MEMBER'

export interface Membership {
  // Mandatory
  id: string
  user: User
  station: Station
  topics: Topic[]
  comments: Comment[]
  votes: Vote[]

  // Optional
  state?: MembershipState
  role?: Role
  createdAt?: string
  updatedAt?: string
}
