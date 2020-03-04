import React from 'react'
import { Topic as ITopic } from '../interfaces/Topic'
import {
  Box,
  Stack,
  IconButton,
  Heading,
  Text,
  Button,
  ButtonGroup,
  Flex
} from '@chakra-ui/core'
import {
  TiArrowUpThick,
  TiArrowDownThick,
  TiMessage,
  TiLocationArrow,
  TiInfo
} from 'react-icons/ti'
import LinkButton from './LinkButton'

const Topic = ({ topic }: { topic: ITopic }) => {
  const userId = 'user1'
  const [userVote] = topic.votes.filter(
    vote => vote.membership.user.id === userId
  )
  const votesCount: number =
    topic.votes.filter(vote => vote.type === 'UPVOTE').length -
    topic.votes.filter(vote => vote.type === 'DOWNVOTE').length

  return (
    <Box className='border w-1/3 p-2 rounded-md'>
      <Stack>
        <Stack isInline spacing={2}>
          <Stack spacing={2} justify='between'>
            <IconButton
              aria-label='upvote'
              icon={TiArrowUpThick}
              variantColor={userVote?.type === 'UPVOTE' ? 'blue' : 'gray'}
            />
            <Text className='text-center font-bold text-lg'>{votesCount}</Text>
            <IconButton
              aria-label='downvote'
              icon={TiArrowDownThick}
              variantColor={userVote?.type === 'DOWNVOTE' ? 'red' : 'gray'}
            />
          </Stack>

          <Stack spacing={2}>
            <Stack isInline spacing={1}>
              <LinkButton
                to={`/s/${topic.membership.station.identifier}`}
                variant='link'>
                {topic.membership.station.name}
              </LinkButton>
              <Text>•</Text>
              <LinkButton
                to={`/u/${topic.membership.user.identifier}`}
                variant='link'>
                {topic.membership.user.name}
              </LinkButton>
            </Stack>

            <Heading size='md'>{topic.title}</Heading>
            <Text>
              {topic.content.length > 120
                ? topic.content.substr(0, 120) + '...'
                : topic.content}
            </Text>
          </Stack>
        </Stack>
        <Flex>
          <Button roundedRight='0' className='flex-grow' leftIcon={TiMessage}>
            Comments
          </Button>
          <Button rounded='0' className='flex-grow' leftIcon={TiLocationArrow}>
            Share
          </Button>
          <Button roundedLeft='0' className='flex-grow' leftIcon={TiInfo}>
            Report
          </Button>
        </Flex>
      </Stack>
    </Box>
  )
}

export default Topic
