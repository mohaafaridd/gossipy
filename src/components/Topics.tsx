import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import Topic from './Topic'
import { Topic as ITopic } from '../interfaces/Topic'
import { Stack, Box, Spinner } from '@chakra-ui/core'

type SortType = 'HOT' | 'TOP' | 'NEW'
type DateRange =
  | 'TODAY'
  | 'THREE_DAYS'
  | 'WEEK'
  | 'MONTH'
  | 'THREE_MONTH'
  | 'SIX_MONTH'
  | 'YEAR'
  | 'EVER'

const GET_TOPICS = gql`
  query getTopics($sort: SortType!, $dateRange: DateRange!) {
    topics(sort: $sort, dateRange: $dateRange) {
      id
      title
      content

      membership {
        user {
          id
          name
          identifier
        }

        station {
          id
          name
          identifier
        }
      }

      votes {
        id
        type
        membership {
          user {
            id
            name
          }
        }
      }

      createdAt
      updatedAt
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
