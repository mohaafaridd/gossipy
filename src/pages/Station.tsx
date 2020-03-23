import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import TopicsOption from '../components/TopicsOption'
import Topics from '../components/Topics'
import Loading from '../components/Loading'
import StationInfo from '../components/StationInfo'
import { GET_STATION } from '../graphql/queries'
import BackgroundMessage from '../components/BackgroundMessage'

const Station = () => {
  const { identifier } = useParams()

  const { loading, data, error } = useQuery(GET_STATION, {
    variables: { identifier }
  })

  if (loading) return <Loading message='Loading Station Info' />

  if (error) return <BackgroundMessage type='Error' message='Error' />

  return (
    <div id='station'>
      <StationInfo station={data.station} />
      <TopicsOption />
      <Topics station={identifier} />
    </div>
  )
}

export default Station
