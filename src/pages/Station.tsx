import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import TopicsOption from '../components/TopicsOption'
import Topics from '../components/Topics'
import Loading from '../components/Loading'
import StationInfo from '../components/StationInfo'
import { GET_STATION } from '../graphql/queries'
import BackgroundMessage from '../components/BackgroundMessage'
import StationContext from '../context/station/stationContext'
import { Station as IStation } from '../interfaces/Station'
const Station = () => {
  const { identifier } = useParams()
  const stationContext = useContext(StationContext)

  const { loading, data, error } = useQuery(GET_STATION, {
    variables: { identifier }
  })

  useEffect(() => {
    if (data) {
      const { station }: { station: IStation } = data
      if (station) {
        stationContext.setStation(station)
      } else {
        stationContext.setMembership(undefined)
      }
    }
    // eslint-disable-next-line
  }, [data])

  if (loading) return <Loading message='Loading Station Info' />

  if (error)
    return (
      <BackgroundMessage type='Error' message="This Station doesn't exist" />
    )

  return (
    <div id='station'>
      <StationInfo />
      <TopicsOption />
      <Topics station={stationContext.station?.id || undefined} />
    </div>
  )
}

export default Station
