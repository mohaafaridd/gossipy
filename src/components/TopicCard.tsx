import React, { useState, useContext, useEffect } from 'react'
import moment from 'moment'
import { IconButton, Button, useToast, useColorMode } from '@chakra-ui/core'
import {
  TiArrowUpThick,
  TiArrowDownThick,
  TiLocationArrow
} from 'react-icons/ti'
import { Link } from 'react-router-dom'
import copy from 'copy-to-clipboard'

import { UPSERT_VOTE, DELETE_VOTE } from '../graphql/mutations'
import { Topic } from '../interfaces/Topic'
import { VoteType, Vote } from '../interfaces/Vote'
import LinkButton from './common/LinkButton'
import useGradient from '../hooks/useGradient'
import { useMutation, useQuery } from '@apollo/react-hooks'
import useKarma from '../hooks/useKarma'
import { AuthContext } from '../context/'
import TopicCardDeleteBtn from './TopicCardDeleteBtn'
import { GET_MEMBERSHIP } from '../graphql/queries'

interface VoteOperation {
  operation: 'CREATE' | 'UPDATE' | 'DELETE'
  type: VoteType
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
  const { user } = useContext(AuthContext)
  const { data: membershipData } = useQuery(GET_MEMBERSHIP, {
    variables: {
      stationId: topic.station.id
    }
  })

  // Topic Votes
  const [votes, setVotes] = useState(topic.votes || [])

  // User Vote
  const [userVote, setUserVote] = useState(
    votes.find(vote => vote.user?.id === user?.id)
  )

  // Class
  const [votedClass] = useState(userVote ? 'voted' : '')

  // Votes Count
  const votesCount = useKarma(votes)

  // Mutations
  const [upsertVote, { loading: upsertLoading }] = useMutation(UPSERT_VOTE)
  const [deleteVote, { loading: deleteLoading }] = useMutation(DELETE_VOTE)

  const date = moment(topic.createdAt).format('Do MMM YYYY')
  const time = moment(topic.createdAt).format('LT')

  // Gradients
  const [[bg, shade]] = useGradient()
  const { colorMode } = useColorMode()
  const borderClass = colorMode === 'light' ? 'border' : ''

  const onVote = async (voteOperation: VoteOperation) => {
    try {
      switch (voteOperation.operation) {
        case 'CREATE': {
          const { data } = await upsertVote({
            variables: {
              data: {
                type: voteOperation.type,
                topic: topic.id
              }
            }
          })
          const { upsertVote: vote }: { upsertVote: Vote } = data
          setVotes([...votes, vote])
          setUserVote(vote)
          break
        }

        case 'UPDATE': {
          const { data } = await upsertVote({
            variables: {
              data: {
                type: voteOperation.type,
                topic: topic.id
              }
            }
          })

          const { upsertVote: vote }: { upsertVote: Vote } = data
          setVotes(votes.map(v => (v.id === vote.id ? vote : v)))
          setUserVote(vote)
          break
        }

        case 'DELETE': {
          const { data } = await deleteVote({
            variables: { id: userVote?.id }
          })

          const { deleteVote: vote }: { deleteVote: Vote } = data
          setVotes(votes.filter(v => v.id !== vote.id))
          setUserVote(undefined)
          break
        }
      }
    } catch (error) {
      const message =
        error.graphQLErrors[0]?.message === 'Authorization Required'
          ? 'You need to be a member to vote'
          : 'Vote field'
      toast({
        title: 'Voting failed',
        status: 'error',
        description: message
      })
    }
  }

  return (
    <article className={`topic-card ${bg} ${borderClass}`}>
      <aside className={shade}>
        <IconButton
          isDisabled={upsertLoading || deleteLoading}
          className='vote-btn'
          variant='ghost'
          aria-label='upvote'
          icon={TiArrowUpThick}
          variantColor={userVote?.type === 'UPVOTE' ? 'green' : 'gray'}
          onClick={() =>
            onVote({
              type: 'UPVOTE',
              operation:
                userVote?.type === 'UPVOTE'
                  ? 'DELETE'
                  : userVote?.type === 'DOWNVOTE'
                  ? 'UPDATE'
                  : 'CREATE'
            })
          }
        />
        <p className={`votes-count ${votedClass}`}>{votesCount}</p>
        <IconButton
          isDisabled={upsertLoading || deleteLoading}
          className='vote-btn'
          variant='ghost'
          aria-label='downvote'
          icon={TiArrowDownThick}
          variantColor={userVote?.type === 'DOWNVOTE' ? 'red' : 'gray'}
          onClick={() =>
            onVote({
              type: 'DOWNVOTE',
              operation:
                userVote?.type === 'DOWNVOTE'
                  ? 'DELETE'
                  : userVote?.type === 'UPVOTE'
                  ? 'UPDATE'
                  : 'CREATE'
            })
          }
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
            to={`/u/${topic.user?.identifier}/activities`}
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
            {topic.image && (
              <img src={`${process.env.REACT_APP_S3}/${topic.image}`} />
            )}
          </main>
        </Link>
      ) : (
        <main className='main-link'>
          <p>
            {topic.content.length > 120 && charLimit
              ? topic.content?.substr(0, 120) + '...'
              : topic.content}
          </p>
          {topic.image && (
            <img src={`${process.env.REACT_APP_S3}/${topic.image}`} />
          )}
        </main>
      )}

      <footer>
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

        {(topic.user.id === user?.id ||
          (membershipData?.membership &&
            membershipData?.membership?.role !== 'MEMBER')) && (
          <TopicCardDeleteBtn topic={topic} />
        )}
      </footer>
    </article>
  )
}

export default TopicCard
