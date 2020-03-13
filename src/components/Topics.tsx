import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import Topic from './Topic'
import { Topic as ITopic, SortType, DateRange } from '../interfaces/Topic'
import { Stack, Box, Spinner } from '@chakra-ui/core'

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

  console.log('data', data)
  if (loading)
    return (
      <div className='h-screen flex'>
        <div className='m-auto text-center'>
          <Spinner />
          <p>Loading Posts</p>
        </div>
      </div>
    )

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
