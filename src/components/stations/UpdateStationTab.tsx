import React, { useContext, ChangeEvent } from 'react'
import UpdateStationDescription from './UpdateStationDescription'
import UpdateStationPrivacy from './UpdateStationPrivacy'
import { Membership } from '../../interfaces/Membership'
import { Avatar, Button } from '@chakra-ui/core'
import { StationContext } from '../../context/index'
import { useMutation } from '@apollo/react-hooks'
import { UPDATE_STATION } from '../../graphql/mutations'
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
