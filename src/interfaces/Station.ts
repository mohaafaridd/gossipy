import { Topic } from './Topic'
import { Comment } from './Comment'
import { Vote } from './Vote'
import { Membership } from './Membership'

export interface Station {
  // Mandatory
  id: string
  name: string
  identifier: string
  public: boolean

  // Optional
  memberships?: Membership[]
  description?: string
  topics?: Topic[]
  comments?: Comment[]
  votes?: Vote[]
  createdAt?: string
  updatedAt?: string
}
