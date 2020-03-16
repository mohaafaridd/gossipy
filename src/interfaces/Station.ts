import { Topic } from './Topic'
import { Comment } from './Comment'
import { Vote } from './Vote'

export interface Station {
  // Mandatory
  id: string
  name: string
  identifier: string
  public: boolean

  // Optional
  description?: string
  topics?: Topic[]
  comments?: Comment[]
  votes?: Vote[]
  createdAt?: string
  updatedAt?: string
}
