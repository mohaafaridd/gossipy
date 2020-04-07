import React from 'react'
import moment from 'moment'
import { Topic } from '../interfaces/Topic'
import { User } from '../interfaces/User'
import { Comment } from '../interfaces/Comment'
import { Vote } from '../interfaces/Vote'
import LinkButton from './LinkButton'
import useGradient from '../hooks/useGradient'
import { Tooltip } from '@chakra-ui/core'

function instanceOfTopic(object: any): object is Topic {
  return 'title' in object
}

function instanceOfComment(object: any): object is Comment {
  return 'content' in object
}

const MiniActivityCard = ({
  background,
  activity
}: {
  background: string
  activity: Topic | Comment | Vote
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
    <div className={`card ${background}`}>
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
  const [[bg]] = useGradient()
  const { topics = [], comments = [], votes = [] } = profile

  const activities = [...topics, ...comments].sort(
    (a, b) => moment(b.createdAt).unix() - moment(a.createdAt).unix()
  )

  return (
    <div id='user-activity'>
      {activities.map(activity => (
        <MiniActivityCard
          key={activity.id}
          background={bg}
          activity={activity}
        />
      ))}
    </div>
  )
}

export default UserActivity
