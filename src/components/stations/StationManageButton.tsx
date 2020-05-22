import React from 'react'
import LinkButton from '../common/LinkButton'
import { Station } from '../../interfaces/Station'

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
