import { Vote as IVote } from './Vote'

interface User {
  id: string
  identifier: string
  name: string
}

interface Station {
  id: string
  identifier: string
  name: string
}

interface Vote extends IVote {
  user: User
}

export interface Topic {
  id: string
  title: string
  content: string

  user: User
  station: Station
  votes: Vote[]

  createdAt: string
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
