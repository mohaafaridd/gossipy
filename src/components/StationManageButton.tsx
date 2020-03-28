import React from 'react'
import LinkButton from './LinkButton'
import { Station } from '../interfaces/Station'

const StationManageButton = ({ station }: { station: Station }) => {
  return (
    <LinkButton
      to={`/s/${station.identifier}/manage/info`}
      className='manage-btn'>
      Manage Station
    </LinkButton>
  )
}

export default StationManageButton
