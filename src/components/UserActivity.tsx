import React from 'react'
import moment from 'moment'
import { Topic } from '../interfaces/Topic'
import { User } from '../interfaces/User'
import { Comment } from '../interfaces/Comment'
import { Vote } from '../interfaces/Vote'
import LinkButton from './LinkButton'
import useGradiant from '../hooks/useGradiant'

const TopicCard = ({
  topic,
  background
}: {
  topic: Topic
  background: string
}) => {
  const { station } = topic

  return (
    <div className={`card ${background}`}>
      Posted{' '}
      <LinkButton
        variant='link'
        to={`/g/${station?.identifier}?topic=${topic?.id}`}>
        {topic?.title}
      </LinkButton>
      .
    </div>
  )
}

const CommentCard = ({
  comment,
  background
}: {
  comment: Comment
  background: string
}) => {
  const { topic, station } = comment
  return (
    <div className={`card ${background}`}>
      Commented on{' '}
      <LinkButton
        variant='link'
        to={`/g/${station?.identifier}?topic=${topic?.id}`}>
        {topic?.title}
      </LinkButton>
      .
    </div>
  )
}

const VoteCard = ({ vote, background }: { vote: Vote; background: string }) => {
  const { topic, station, type } = vote
  const normalized = type.charAt(0) + type.slice(1).toLowerCase() + 'd'

  return (
    <div className={`card ${background}`}>
      {normalized}{' '}
      <LinkButton
        variant='link'
        to={`/g/${station?.identifier}?topic=${topic?.id}`}>
        {topic?.title}
      </LinkButton>
      .
    </div>
  )
}

const UserActivity = ({ profile }: { profile: User }) => {
  const [[bg, shade]] = useGradiant()
  const { topics = [], comments = [], votes = [] } = profile

  const activities = [...topics, ...comments, ...votes].sort(
    (a, b) =>
      moment(b.createdAt).milliseconds() - moment(a.createdAt).milliseconds()
  )

  function instanceOfTopic(object: any): object is Topic {
    return 'title' in object
  }

  function instanceOfComment(object: any): object is Comment {
    return 'content' in object
  }

  return (
    <div id='user-activity'>
      {activities.map(activity =>
        instanceOfTopic(activity) ? (
          <TopicCard key={activity.id} topic={activity} background={bg} />
        ) : instanceOfComment(activity) ? (
          <CommentCard key={activity.id} comment={activity} background={bg} />
        ) : (
          <VoteCard key={activity.id} vote={activity} background={bg} />
        )
      )}
    </div>
  )
}

export default UserActivity
