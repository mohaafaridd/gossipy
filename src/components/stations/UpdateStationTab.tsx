import React from 'react'
import UpdateStationDescription from './UpdateStationDescription'
import UpdateStationPrivacy from './UpdateStationPrivacy'
import { Membership } from '../../interfaces/Membership'
import UpdateStationAvatar from './UpdateStationAvatar'

const UpdateStationTab = ({ membership }: { membership: Membership }) => {
  return (
    <div id='update-info' className='p-2'>
      <UpdateStationAvatar />
      <UpdateStationDescription membership={membership} />
      <UpdateStationPrivacy membership={membership} />
    </div>
  )
}

export default UpdateStationTab
