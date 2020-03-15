type VoteType = 'UPVOTE' | 'DOWNVOTE'

export interface Vote {
  id: string
  type: VoteType
}
