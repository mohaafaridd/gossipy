import React from 'react'
import { Button, Avatar } from '@chakra-ui/core'

const Profile = () => {
  return (
    <div id='home-profile'>
      <div className='card'>
        <Avatar
          className='avatar'
          rounded='full'
          name='Mohammed Farid'
          src='https://i.imgur.com/4clqUdj.jpg'
        />
        <Button className='btn'>Home</Button>
        <Button className='btn'>Profile</Button>
      </div>
    </div>
  )
}

export default Profile
