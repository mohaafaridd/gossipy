import React from 'react'
import { useCookies } from 'react-cookie'
import moment from 'moment'
import { Topic as ITopic } from '../interfaces/Topic'
import { User } from '../interfaces/User'
import { IconButton, Button } from '@chakra-ui/core'
import {
  TiArrowUpThick,
  TiArrowDownThick,
  TiMessage,
  TiLocationArrow
} from 'react-icons/ti'
import LinkButton from './LinkButton'
import useGradiant from '../hooks/useGradiant'

const Topic = ({ topic }: { topic: ITopic }) => {
  const [cookies] = useCookies(['token', 'user'])
  const user: User = cookies.user
  const { votes } = topic

  // Get User Vote
  const userVote = user?.id
    ? votes.find(vote => vote.user.id === user.id)
    : null
  const votedClass = userVote ? 'voted' : ''

  // Votes Count
  const upVotes = votes.filter(vote => vote.type === 'UPVOTE')
  const downVotes = votes.filter(vote => vote.type === 'DOWNVOTE')
  const votesCount = upVotes.length - downVotes.length

  // Date and Time
  const date = moment(topic.createdAt).format('Do MMM YYYY')
  const time = moment(topic.createdAt).format('LT')

  // Gradiants
  const [[bg, shade]] = useGradiant()

  return (
    <article className={`topic ${bg}`}>
      <aside className={shade}>
        <IconButton
          className='vote-btn'
          variant='ghost'
          aria-label='upvote'
          icon={TiArrowUpThick}
          variantColor={userVote?.type === 'UPVOTE' ? 'blue' : 'gray'}
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
            to={`/s/${topic.station.identifier}`}
            variant='link'>
            {topic.station.name}
          </LinkButton>
          {' • '}
          <LinkButton
            className='link'
            to={`/u/${topic.user.identifier}`}
            variant='link'>
            {topic.user.name}
          </LinkButton>{' '}
          <small className='date'>
            {date} <span className='time'>{time}</span>
          </small>
        </h6>
        <h3 className='title'>{topic.title}</h3>
      </header>

      <main>
        <p>
          {topic.content.length > 120
            ? topic.content.substr(0, 120) + '...'
            : topic.content}
        </p>
      </main>

      <footer>
        <Button className='btn' variant='ghost' leftIcon={TiMessage}>
          Comments
        </Button>
        <Button className='btn' variant='ghost' leftIcon={TiLocationArrow}>
          Share
        </Button>
      </footer>
    </article>
  )
  // return <h1>{topic.content}</h1>
  // return (
  //   <Box className='border w-1/3 p-2 rounded-md'>
  //     <Stack>
  //       <Stack isInline spacing={2}>
  //         <Stack spacing={2} justify='between'>
  //           <IconButton
  //             aria-label='upvote'
  //             icon={TiArrowUpThick}
  //             variantColor={userVote?.type === 'UPVOTE' ? 'blue' : 'gray'}
  //           />
  //           <Text className='text-center font-bold text-lg'>{votesCount}</Text>
  //           <IconButton
  //             aria-label='downvote'
  //             icon={TiArrowDownThick}
  //             variantColor={userVote?.type === 'DOWNVOTE' ? 'red' : 'gray'}
  //           />
  //         </Stack>

  //         <Stack spacing={2}>
  //           <Stack isInline spacing={1}>
  //             <LinkButton to={`/s/${topic.station.identifier}`} variant='link'>
  //               {topic.station.name}
  //             </LinkButton>
  //             <Text>•</Text>
  //             <LinkButton to={`/u/${topic.user.identifier}`} variant='link'>
  //               {topic.user.name}
  //             </LinkButton>
  //           </Stack>

  //           <Heading size='md'>{topic.title}</Heading>
  //           <Text>
  //             {topic.content.length > 120
  //               ? topic.content.substr(0, 120) + '...'
  //               : topic.content}
  //           </Text>
  //         </Stack>
  //       </Stack>
  //       <Flex>
  //         <Button roundedRight='0' className='flex-grow' leftIcon={TiMessage}>
  //           Comments
  //         </Button>
  //         <Button rounded='0' className='flex-grow' leftIcon={TiLocationArrow}>
  //           Share
  //         </Button>
  //         <Button roundedLeft='0' className='flex-grow' leftIcon={TiInfo}>
  //           Report
  //         </Button>
  //       </Flex>
  //     </Stack>
  //   </Box>
  // )
}

export default Topic
