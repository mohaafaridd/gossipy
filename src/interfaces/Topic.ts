export interface Topic {
  id: string
  title: string
  content: string
  station: {
    id: string
    identifier: string
    name: string
  }

  votes: {
    count: number
    user?: {
      id: string
      type: VoteType
    }
  }
}

type VoteType = 'UPVOTE' | 'DOWNVOTE'
