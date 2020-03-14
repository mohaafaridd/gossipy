import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import Topic from './Topic'
import { Topic as ITopic, SortType, DateRange } from '../interfaces/Topic'
import { Stack, Box, Spinner } from '@chakra-ui/core'
import Loading from './Loading'

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
  const { loading, error, data } = useQuery(GET_TOPICS, {
    variables: { sort, dateRange }
  })

  if (loading) return <Loading message='Loading Posts' />

  return (
    <Box>
      <Stack spacing={2} shouldWrapChildren>
        {data.topics.map((topic: ITopic) => (
          <Topic key={topic.id} topic={topic} />
        ))}
      </Stack>
    </Box>
  )
}

export default Topics
