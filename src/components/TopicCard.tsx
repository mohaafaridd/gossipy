import React from 'react'
import { useCookies } from 'react-cookie'
import moment from 'moment'
import { IconButton, Button, useToast } from '@chakra-ui/core'
import {
  TiArrowUpThick,
  TiArrowDownThick,
  TiMessage,
  TiLocationArrow
} from 'react-icons/ti'
import { Link } from 'react-router-dom'
import copy from 'copy-to-clipboard'

import { CREATE_VOTE, DELETE_VOTE, UPDATE_VOTE } from '../graphql/mutations'
import { Topic } from '../interfaces/Topic'
import { User } from '../interfaces/User'
import { Vote, VoteType } from '../interfaces/Vote'
import LinkButton from './LinkButton'
import useGradient from '../hooks/useGradient'
import { useMutation } from '@apollo/react-hooks'

const TopicCard = ({
  topic,
  charLimit = true,
  useLinks = true
}: {
  topic: Topic
  charLimit?: boolean
  useLinks?: boolean
}) => {
  const toast = useToast()
  const [cookies] = useCookies(['token', 'user'])

  const user: User = cookies.user
  let { votes } = topic

  if (!votes) votes = []

  // Get User Vote
  const userVote = user?.id
    ? votes.find(vote => vote.user?.id === user.id)
    : null
  const votedClass = userVote ? 'voted' : ''

  // Votes Count
  const upVotes = votes.filter(vote => vote.type === 'UPVOTE')
  const downVotes = votes.filter(vote => vote.type === 'DOWNVOTE')
  const votesCount = upVotes.length - downVotes.length

  // Mutations
  const [createVote] = useMutation(CREATE_VOTE)
  const [updateVote] = useMutation(UPDATE_VOTE)
  const [deleteVote] = useMutation(DELETE_VOTE)

  // Date and Time
  const date = moment(topic.createdAt).format('Do MMM YYYY')
  const time = moment(topic.createdAt).format('LT')

  // Gradiants
  const [[bg, shade]] = useGradient()

  const getVoteVariables = (type: VoteType) => {
    const variables = {
      id: userVote ? userVote.id : undefined,
      data: {
        topic: topic.id,
        type
      }
    }
    return variables
  }

  return (
    <article className={`topic-card ${bg}`}>
      <aside className={shade}>
        <IconButton
          className='vote-btn'
          variant='ghost'
          aria-label='upvote'
          icon={TiArrowUpThick}
          variantColor={userVote?.type === 'UPVOTE' ? 'blue' : 'gray'}
          onClick={async () => {
            const variables = getVoteVariables('UPVOTE')
            const { data } =
              userVote?.type === 'UPVOTE'
                ? await deleteVote({ variables })
                : userVote?.type === 'DOWNVOTE'
                ? await updateVote({ variables })
                : await createVote({ variables })
            const vote =
              data.deleteVote || data.updateVote || data.createVote || undefined

            console.log('vote', vote)
          }}
        />
        <p className={`votes-count ${votedClass}`}>{votesCount}</p>
        <IconButton
          className='vote-btn'
          variant='ghost'
          aria-label='downvote'
          icon={TiArrowDownThick}
          variantColor={userVote?.type === 'DOWNVOTE' ? 'red' : 'gray'}
        />
      </aside>

      <header>
        <h6>
          <LinkButton
            className='link'
            to={`/s/${topic.station?.identifier}`}
            variant='link'>
            {topic.station?.name}
          </LinkButton>
          {' • '}
          <LinkButton
            className='link'
            to={`/u/${topic.user?.identifier}`}
            variant='link'>
            {topic.user?.name}
          </LinkButton>{' '}
          <small className='date'>
            {date} <span className='time'>{time}</span>
          </small>
        </h6>
        {useLinks ? (
          <Link to={`/s/${topic.station?.identifier}/${topic.identifier}`}>
            <h3 className='title'>{topic.title}</h3>
          </Link>
        ) : (
          <h3 className='title'>{topic.title}</h3>
        )}
      </header>

      {useLinks ? (
        <Link
          className='main-link'
          to={`/s/${topic.station?.identifier}/${topic.identifier}`}>
          <main>
            <p>
              {topic.content.length > 120 && charLimit
                ? topic.content?.substr(0, 120) + '...'
                : topic.content}
            </p>
          </main>
        </Link>
      ) : (
        <main className='main-link'>
          <p>
            {topic.content.length > 120 && charLimit
              ? topic.content?.substr(0, 120) + '...'
              : topic.content}
          </p>
        </main>
      )}

      <footer>
        <Button className='btn' variant='ghost' leftIcon={TiMessage}>
          Comments
        </Button>
        <Button
          onClick={() => {
            copy(
              window.location.href
                .replace(window.location.pathname, '')
                .concat(`s/${topic.station?.identifier}/${topic.identifier}`)
            )

            toast({
              title: 'Topic link is copied!',
              status: 'success'
            })
          }}
          className='btn'
          variant='ghost'
          leftIcon={TiLocationArrow}>
          Share
        </Button>
      </footer>
    </article>
  )
}

export default TopicCard
