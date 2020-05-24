import React, { useContext, useState } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { AuthContext } from '../context/index'
import Loading from '../components/layout/Loading'
import { GET_TOPIC } from '../graphql/queries'
import { Topic } from '../interfaces'
import BackgroundMessage from '../components/layout/BackgroundMessage'

const UpsertTopic = () => {
  const { authenticated, user } = useContext(AuthContext)
  const { stationIdentifier, topicIdentifier } = useParams()

  // Check if user is topic author
  const variables = {
    identifier: topicIdentifier,
    stationIdentifier
  }

  const { data, error, loading } = useQuery<{
    topic: Topic
  }>(GET_TOPIC, { variables })

  if (!authenticated) return <Redirect to='/' />
  if (loading) return <Loading />
  if (error || typeof data === 'undefined')
    return <BackgroundMessage type='Error' message='Error accrued' />

  const { topic } = data
  if (topic.user.id !== user?.id) return <Redirect to='/gossip' />

  return <div>{stationIdentifier ? 'Edit' : 'Create'}</div>
}

export default UpsertTopic
