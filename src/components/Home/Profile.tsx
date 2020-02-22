import React from 'react'
import { Button, Avatar, Box, useColorMode } from '@chakra-ui/core'

const Profile = () => {
  const { colorMode } = useColorMode()

  const bg = colorMode === 'dark' ? 'gray.900' : 'gray.300'

  return (
    <Box bg={bg} id='home-profile'>
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

      <Button variant='outline' variantColor='red' className='logout-btn'>
        Logout
      </Button>
    </Box>
  )
}

export default Profile
