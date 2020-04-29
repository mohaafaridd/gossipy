import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { Topic as ITopic } from '../interfaces/Topic'
import { GET_TOPIC, GET_MEMBERSHIP } from '../graphql/queries'
import Loading from '../components/Loading'
import BackgroundMessage from '../components/BackgroundMessage'
import TopicCard from '../components/TopicCard'
import Comments from '../components/Comments'
import CommentForm from '../components/CommentForm'
import { Membership } from '../interfaces/Membership'
import {
  AuthContext,
  StationContext,
  TopicContext,
  MembershipContext,
  CommentContext
} from '../context/'

const Topic = () => {
  const { authenticated } = useContext(AuthContext)
  const { setStation } = useContext(StationContext)
  const { setTopic } = useContext(TopicContext)
  const { setMembership } = useContext(MembershipContext)
  const { setComments } = useContext(CommentContext)

  const { station: stationIdentifier, topic: topicIdentifier } = useParams()

  const [canVisit, setCanVisit] = useState(false)
  const [canComment, setCanComment] = useState(false)

  const { data: membershipData, loading: membershipLoading } = useQuery(
    GET_MEMBERSHIP,
    {
      variables: { stationIdentifier }
    }
  )

  const { data, loading, error } = useQuery(GET_TOPIC, {
    variables: {
      stationIdentifier,
      identifier: topicIdentifier
    }
  })

  useEffect(() => {
    if (data && membershipData) {
      const { membership }: { membership: Membership } = membershipData
      const { topic }: { topic: ITopic } = data

      const isActive = membership?.state === 'ACTIVE'
      const isPublic = topic.station?.public === true

      setMembership(membership)
      setStation(topic.station)
      setTopic(topic)
      setComments(topic.comments)

      setCanVisit(isActive || isPublic)
      setCanComment(isActive)
    } else {
      setCanComment(false)
      setCanVisit(false)
      setMembership(undefined)
      setStation(undefined)
    }
    // eslint-disable-next-line
  }, [data, membershipData])

  if (loading || membershipLoading) return <Loading message='Loading Topic' />
  if (error || !canVisit)
    return <BackgroundMessage type='Error' message='Topic was not found' />

  const { topic }: { topic: ITopic } = data

  return (
    <div id='topic'>
      <Helmet>
        <title>{`${topic.title}`}</title>
      </Helmet>
      <TopicCard topic={topic} charLimit={false} useLinks={false} />

      {authenticated && canComment && <CommentForm topic={topic} />}

      <Comments />
    </div>
  )
}

export default Topic
