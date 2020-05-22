import React from 'react'
import moment from 'moment'
import * as uuid from 'uuid'
import { Topic } from '../interfaces/Topic'
import { User } from '../interfaces/User'
import { Comment } from '../interfaces/Comment'
import { Vote } from '../interfaces/Vote'
import LinkButton from './common/LinkButton'
import useGradient from '../hooks/useGradient'
import { Tooltip, useColorMode } from '@chakra-ui/core'

function instanceOfTopic(object: any): object is Topic {
  return 'title' in object
}

function instanceOfComment(object: any): object is Comment {
  return 'content' in object
}

const MiniActivityCard = ({
  background,
  activity,
  borderClass
}: {
  background: string
  activity: Topic | Comment | Vote
  borderClass: string
}) => {
  const { station, createdAt } = activity
  const topic = instanceOfTopic(activity) ? activity : activity.topic
  const message = instanceOfTopic(activity)
    ? 'Posted'
    : instanceOfComment(activity)
    ? 'Commented On'
    : activity.type.charAt(0) + activity.type.slice(1).toLowerCase() + 'd'
  const date = moment(createdAt).format('Do MMM YYYY LT')
  const longName = (name: string = '') =>
    name.length > 16 ? name.substr(0, 16) + '...' : name
  const topicTitle = longName(topic?.title)
  const stationName = longName(station?.name)

  return (
    <div className={`card ${background} ${borderClass}`}>
      {message}{' '}
      <Tooltip
        aria-label={topic?.title || 'Topic Title'}
        label={topic?.title || 'Topic Title'}>
        <LinkButton
          variant='link'
          to={`/s/${station?.identifier}/${topic?.identifier}`}>
          {topicTitle}
        </LinkButton>
      </Tooltip>{' '}
      in{' '}
      <Tooltip
        aria-label={station?.name || 'Station name'}
        label={station?.name || 'Station name'}>
        <LinkButton variant='link' to={`/s/${station?.identifier}`}>
          {stationName}
        </LinkButton>
      </Tooltip>{' '}
      <small className='date'>on {date}</small>.
    </div>
  )
}

const UserActivity = ({ profile }: { profile: User }) => {
  const [[bg, shade]] = useGradient()
  const { colorMode } = useColorMode()
  const { topics = [], comments = [] } = profile
  const borderClass = colorMode === 'light' ? 'border' : ''

  const activities = [...topics, ...comments].sort(
    (a, b) => moment(b.createdAt).unix() - moment(a.createdAt).unix()
  )

  return (
    <div id='user-activity'>
      {activities.length === 0 && (
        <div
          className={`${shade} p-2 rounded-md text-center text-gray-500 uppercase tracking-widest cursor-default mx-2 
          md:w-2/3 xl:w-1/3 mx-auto ${borderClass}`}>
          This user has no activities
        </div>
      )}

      {activities.map(activity => (
        <MiniActivityCard
          borderClass={borderClass}
          key={uuid.v4()}
          background={bg}
          activity={activity}
        />
      ))}
    </div>
  )
}

export default UserActivity
