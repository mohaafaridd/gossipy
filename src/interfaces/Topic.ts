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

export interface Topic {
  id: string
  title: string
  content: string

  membership: {
    user: User
    station: Station
  }

  votes: {
    id: string
    type: VoteType
    membership: {
      user: User
    }
  }[]

  createdAt: string
  updatedAt: string
}

type VoteType = 'UPVOTE' | 'DOWNVOTE'

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
