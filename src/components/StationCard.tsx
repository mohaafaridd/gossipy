import React from 'react'
import { Station } from '../interfaces/Station'
import LinkButton from './LinkButton'
import { Badge, useColorMode } from '@chakra-ui/core'
import useGradient from '../hooks/useGradient'

const StationCard = ({ station }: { station: Station }) => {
  const [[bg]] = useGradient()
  const { colorMode } = useColorMode()
  const borderClass = colorMode === 'light' ? 'border' : ''

  return (
    <div className={`station-card ${bg} ${borderClass}`}>
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
