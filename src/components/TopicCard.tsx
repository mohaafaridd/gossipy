import React, { useState, useEffect } from 'react'
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

type Operation = 'CREATE' | 'UPDATE' | 'DELETE'

interface VoteOperation {
  operation: Operation
  vote: Vote
}

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
  const [cookies] = useCookies(['user'])
  const user: User = cookies.user

  // Topic Votes
  const [votes, setVotes] = useState(topic.votes || [])

  // User Vote
  const [userVote, setUserVote] = useState(
    votes.find(vote => vote.user?.id === user?.id)
  )

  // Class
  const [votedClass, setVotedClass] = useState(userVote ? 'voted' : '')

  // Votes Count
  const [upVotes, setUpVotes] = useState(
    votes.filter(vote => vote.type === 'UPVOTE')
  )
  const [downVotes, setDownVotes] = useState(
    votes.filter(vote => vote.type === 'DOWNVOTE')
  )
  const [votesCount, setVotesCount] = useState(
    upVotes.length - downVotes.length
  )

  useEffect(() => {
    setVotedClass(userVote ? 'voted' : '')
    setUpVotes(votes.filter(vote => vote.type === 'UPVOTE'))
    setDownVotes(votes.filter(vote => vote.type === 'DOWNVOTE'))
    setVotesCount(upVotes.length - downVotes.length)
    // eslint-disable-next-line
  }, [votes, userVote])

  // Mutations
  const [createVote] = useMutation(CREATE_VOTE)
  const [updateVote] = useMutation(UPDATE_VOTE)
  const [deleteVote] = useMutation(DELETE_VOTE)

  // Date and Time
  const date = moment(topic.createdAt)
    .utc()
    .format('Do MMM YYYY')

  const time = moment(topic.createdAt)
    .utc()
    .format('LT')

  // Gradients
  const [[bg, shade]] = useGradient()

  const onVote = async (type: VoteType) => {
    try {
      const { data } =
        userVote && userVote.type === type
          ? await deleteVote({ variables: { id: userVote.id } })
          : userVote && userVote.type !== type
          ? await updateVote({
              variables: { id: userVote?.id, data: { type } }
            })
          : await createVote({
              variables: {
                data: {
                  topic: topic.id,
                  type
                }
              }
            })

      const vote: VoteOperation = data.deleteVote
        ? { operation: 'DELETE', vote: data.deleteVote }
        : data.updateVote
        ? { operation: 'UPDATE', vote: data.updateVote }
        : { operation: 'CREATE', vote: data.createVote }

      if (vote.operation === 'CREATE') {
        setVotes(prev => prev.concat(vote.vote))
        setUserVote(vote.vote)
      } else if (vote.operation === 'DELETE') {
        setVotes(prev => prev.filter(prevVote => prevVote.id !== vote.vote.id))
        setUserVote(undefined)
      } else {
        setVotes(prev =>
          prev.map(prevVote =>
            prevVote.id !== vote.vote.id ? prevVote : vote.vote
          )
        )
        setUserVote(vote.vote)
      }
    } catch (error) {
      console.log('error', error)
    }
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
          onClick={() => onVote('UPVOTE')}
        />
        <p className={`votes-count ${votedClass}`}>{votesCount}</p>
        <IconButton
          className='vote-btn'
          variant='ghost'
          aria-label='downvote'
          icon={TiArrowDownThick}
          variantColor={userVote?.type === 'DOWNVOTE' ? 'red' : 'gray'}
          onClick={() => onVote('DOWNVOTE')}
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
