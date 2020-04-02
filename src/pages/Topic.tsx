import React, { useContext, useEffect, useState } from 'react'
import { Topic as ITopic } from '../interfaces/Topic'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { GET_TOPIC, GET_MEMBERSHIP } from '../graphql/queries'
import Loading from '../components/Loading'
import BackgroundMessage from '../components/BackgroundMessage'
import TopicCard from '../components/TopicCard'
import Comments from '../components/Comments'
import CommentForm from '../components/CommentForm'
import AuthContext from '../context/auth/authContext'
import StationContext from '../context/station/stationContext'
import { Membership } from '../interfaces/Membership'

const Topic = () => {
  const { authenticated } = useContext(AuthContext)
  const stationContext = useContext(StationContext)
  const { station: stationIdentifier, topic: topicIdentifier } = useParams()

  const [canVisit, setCanVisit] = useState(false)
  const [canComment, setCanComment] = useState(false)

  const { data: membershipData, loading: membershipLoading } = useQuery(
    GET_MEMBERSHIP,
    {
      variables: { station: stationIdentifier }
    }
  )

  const { data, loading, error } = useQuery(GET_TOPIC, {
    variables: {
      stationIdentifier,
      topicIdentifier
    }
  })

  useEffect(() => {
    if (data && membershipData) {
      const { userMembership }: { userMembership: Membership } = membershipData
      const { topic }: { topic: ITopic } = data

      const isActive = userMembership?.state === 'ACTIVE'
      const isPublic = topic.station?.public === true

      stationContext.setMembership(userMembership ? userMembership : undefined)
      stationContext.setStation(topic.station)

      setCanVisit(isActive || isPublic)
      setCanComment(isActive)
    } else {
      setCanComment(false)
      setCanVisit(false)
      stationContext.setMembership(undefined)
      stationContext.setStation(undefined)
    }
  }, [data, membershipData])

  if (loading || membershipLoading) return <Loading message='Loading Topic' />
  if (error || !canVisit)
    return <BackgroundMessage type='Error' message='Topic was not found' />

  const { topic }: { topic: ITopic } = data

  return (
    <div id='topic'>
      <TopicCard topic={topic} charLimit={false} useLinks={false} />

      {authenticated && canComment && <CommentForm topic={topic} />}

      <Comments comments={topic.comments || []} />
    </div>
  )
}

export default Topic
