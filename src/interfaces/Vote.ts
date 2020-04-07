import { User } from './User'
import { Station } from './Station'
import { Topic } from './Topic'
import { Membership } from './Membership'

export interface Vote {
  // Mandatory
  id: string
  type: VoteType

  // Optional
  membership?: Membership
  user?: User
  station?: Station
  topic?: Topic
  createdAt?: string
  updatedAt?: string
}

export type VoteType = 'UPVOTE' | 'DOWNVOTE'
