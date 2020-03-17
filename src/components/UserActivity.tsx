import React from 'react'
import moment from 'moment'
import { Topic } from '../interfaces/Topic'
import { User } from '../interfaces/User'
import { Comment } from '../interfaces/Comment'
import { Vote } from '../interfaces/Vote'
import LinkButton from './LinkButton'
import useGradiant from '../hooks/useGradiant'

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

  return (
    <div className={`card ${background}`}>
      {message}{' '}
      <LinkButton
        variant='link'
        to={`/g/${station?.identifier}?topic=${topic?.id}`}>
        {topic?.title}
      </LinkButton>{' '}
      in
      <LinkButton variant='link' to={`/g/${station?.identifier}`}>
        {station?.name}
      </LinkButton>
      <small className='date'>on {date}</small>.
    </div>
  )
}

const UserActivity = ({ profile }: { profile: User }) => {
  const [[bg]] = useGradiant()
  const { topics = [], comments = [], votes = [] } = profile

  const activities = [...topics, ...comments, ...votes].sort(
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
