import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import Topic from './Topic'
import { Topic as ITopic, SortType, DateRange } from '../interfaces/Topic'
import Loading from './Loading'
import { useToast } from '@chakra-ui/core'

const GET_TOPICS = gql`
  query getTopics($sort: SortType!, $dateRange: DateRange!) {
    topics(sortType: $sort, dateRange: $dateRange) {
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
  sort,
  dateRange
}: {
  sort: SortType
  dateRange: DateRange
}) => {
  const toast = useToast()
  const { loading, error, data } = useQuery(GET_TOPICS, {
    variables: { sort, dateRange }
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
