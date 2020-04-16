import React from 'react'
import { Station } from '../interfaces/Station'
import LinkButton from './LinkButton'
import { Badge } from '@chakra-ui/core'

const StationCard = ({ station }: { station: Station }) => {
  return (
    <div className='rounded p-2 bg-gray-800 w-1/3 my-2 mx-auto'>
      <LinkButton
        to={`/s/${station.identifier}`}
        variant='link'
        className='font-bold'>
        {station.name}
      </LinkButton>

      <Badge variant='subtle' variantColor='green'>
        {station.members?.length} members
      </Badge>
    </div>
  )
}

export default StationCard
