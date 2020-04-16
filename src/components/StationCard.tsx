import React from 'react'
import { Station } from '../interfaces/Station'
import LinkButton from './LinkButton'
import { Badge } from '@chakra-ui/core'
import useGradient from '../hooks/useGradient'

const StationCard = ({ station }: { station: Station }) => {
  const [[bg]] = useGradient()

  return (
    <div className={`station-card ${bg}`}>
      <LinkButton
        to={`/s/${station.identifier}`}
        variant='link'
        className='font-bold'>
        {station.name}
      </LinkButton>

      <Badge variant='subtle' variantColor='green'>
        {station.members?.length || 'Happy'} members
      </Badge>
    </div>
  )
}

export default StationCard
