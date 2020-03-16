import { Vote } from './Vote'
import { Topic } from './Topic'
import { Comment } from './Comment'
import { Membership } from './Membership'

export interface User {
  // Mandatory
  id: string
  identifier: string
  name: string
  email: string
  karma: Vote[]

  // Optional
  memberships?: Membership[]
  topics?: Topic[]
  comments?: Comment[]
  votes?: Vote[]
  createdAt?: string
  updatedAt?: string
}
