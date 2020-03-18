import React from 'react'
import { gql } from 'apollo-boost'
import { useParams } from 'react-router-dom'
import TopicsOption from '../components/TopicsOption'
import Topics from '../components/Topics'
import { useQuery } from '@apollo/react-hooks'
import Loading from '../components/Loading'
import StationInfo from '../components/StationInfo'

const GET_STATION = gql`
  query getStation($identifier: ID!) {
    station(identifier: $identifier) {
      id
      name
      identifier
      description
      public
      members {
        id
        state
      }
      topics {
        id
      }
      createdAt
    }
  }
`

const Station = () => {
  const { identifier } = useParams()

  const { loading, data } = useQuery(GET_STATION, {
    variables: { identifier }
  })

  if (loading) return <Loading message='Loading Station Info' />

  return (
    <div id='station'>
      <StationInfo station={data.station} />
      <TopicsOption />
      <Topics station={identifier} />
    </div>
  )
}

export default Station
