import React, { useContext } from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import Topic from './Topic'
import { Topic as ITopic } from '../interfaces/Topic'
import Loading from './Loading'
import { useToast } from '@chakra-ui/core'
import TopicContext from '../context/topics/topicContext'

const GET_TOPICS = gql`
  query getTopics(
    $sortType: SortType!
    $dateRange: DateRange!
    $user: ID
    $station: ID
    $subscribed: Boolean
  ) {
    topics(
      sortType: $sortType
      dateRange: $dateRange
      user: $user
      station: $station
      subscribed: $subscribed
    ) {
      id
      title
      content

      user {
        id
        identifier
        name
      }

      station {
        id
        identifier
        name
      }

      votes {
        id
        type
        user {
          id
        }
      }

      createdAt
    }
  }
`

const Topics = ({
  user,
  station,
  subscribed
}: {
  user?: string
  station?: string
  subscribed?: boolean
}) => {
  const { sortType, dateRange } = useContext(TopicContext)

  const toast = useToast()
  const { loading, data } = useQuery(GET_TOPICS, {
    variables: { sortType, dateRange, user, station, subscribed }
  })

  if (loading) return <Loading message='Loading Posts' />

  if (data.topics.length === 0) {
    toast({
      title: 'No topics were found',
      isClosable: true,
      duration: 3000,
      status: 'info',
      variant: 'solid',
      position: 'bottom-right'
    })
    return <h1>No Topics 🙃</h1>
  }

  toast({
    title: 'Topics fetched',
    isClosable: true,
    duration: 3000,
    status: 'success',
    variant: 'solid',
    position: 'bottom-right'
  })

  return (
    <div id='topics'>
      {data.topics.map((topic: ITopic) => (
        <Topic key={topic.id} topic={topic} />
      ))}
    </div>
  )
}

export default Topics
