import { Vote } from '../interfaces/Vote'

export default function useKarma(karma: Vote[]) {
  const upVotes = karma.filter(vote => vote.type === 'UPVOTE')
  const downVotes = karma.filter(vote => vote.type === 'DOWNVOTE')

  const count = upVotes.length - downVotes.length

  return count
}
