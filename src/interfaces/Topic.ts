import { Station } from './Station'
import { Vote } from './Vote'
import { User } from './User'
import { Comment } from './Comment'

export interface Topic {
  // Mandatory
  id: string
  title: string
  content: string

  // Optional
  user?: User
  station?: Station
  comments?: Comment[]
  votes?: Vote[]
  createdAt?: string
  updatedAt?: string
}

export type SortType = 'HOT' | 'TOP' | 'NEW'
export type DateRange =
  | 'TODAY'
  | 'THREE_DAYS'
  | 'WEEK'
  | 'MONTH'
  | 'THREE_MONTH'
  | 'SIX_MONTH'
  | 'YEAR'
  | 'EVER'
