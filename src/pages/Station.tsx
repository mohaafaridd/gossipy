import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import TopicsOption from '../components/TopicsOption'
import Topics from '../components/Topics'
import Loading from '../components/Loading'
import StationInfo from '../components/StationInfo'
import { GET_STATION } from '../graphql/queries'
import BackgroundMessage from '../components/BackgroundMessage'
import { StationContext, MembershipContext } from '../context/'
import { Station as IStation } from '../interfaces/Station'

const Station = () => {
  const { identifier } = useParams()
  const { setMembership } = useContext(MembershipContext)
  const { station, setStation } = useContext(StationContext)

  const { loading, data, error } = useQuery(GET_STATION, {
    variables: { identifier }
  })

  useEffect(() => {
    if (data) {
      const { station }: { station: IStation } = data
      if (station) {
        setStation(station)
      } else {
        setMembership(undefined)
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
      <Topics station={station?.id || undefined} explore={true} />
    </div>
  )
}

export default Station
