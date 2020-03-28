import React from 'react'
import UpdateStationDescription from './UpdateStationDescription'
import UpdateStationPrivacy from './UpdateStationPrivacy'

const UpdateStationTab = () => {
  return (
    <div id='update-info' className='p-2'>
      <UpdateStationDescription />
      <UpdateStationPrivacy />
    </div>
  )
}

export default UpdateStationTab
