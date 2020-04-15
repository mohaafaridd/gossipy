import React, { useContext, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import TopicCard from './TopicCard'
import { Topic } from '../interfaces/Topic'
import Loading from './Loading'
import TopicContext from '../context/topics/topicContext'
import BackgroundMessage from './BackgroundMessage'
import { GET_TOPICS } from '../graphql/queries'

const Topics = ({
  user,
  station,
  explore
}: {
  user?: number
  station?: number
  explore?: boolean
}) => {
  const { sortType, dateRange, setTopics, topics } = useContext(TopicContext)
  const { loading, data, error } = useQuery(GET_TOPICS, {
    variables: { sortType, dateRange, user, station, explore }
  })

  useEffect(() => {
    if (data) {
      // console.log('data.topics.data', data.topics.data)
      setTopics(data.topics.data)
    }
    // eslint-disable-next-line
  }, [data])

  if (error) {
    return (
      <BackgroundMessage
        message={
          error.graphQLErrors[0]?.message ||
          "Couldn't get topics, try again later"
        }
        type='Error'
      />
    )
  }

  if (loading) return <Loading message='Loading Posts' />

  if ((topics || []).length === 0) {
    return <BackgroundMessage message='No topics were found' type='Warning' />
  }
  return (
    <div id='topics'>
      {topics &&
        topics.map((topic: Topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
    </div>
  )
}

export default Topics
