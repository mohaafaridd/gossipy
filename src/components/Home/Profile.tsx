import React from 'react'
import { Button, Avatar, Box, useColorMode, Icon } from '@chakra-ui/core'
import useWindowDimensions from '../../hooks/useWindowDimensions '

const Profile = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const { width } = useWindowDimensions()
  const isDarkMode = colorMode === 'dark'
  const bg = isDarkMode ? 'gray.900' : 'gray.300'
  const btnColor = 'blue'
  const isPC = width > 1366

  return (
    <Box bg={bg} id='home-profile'>
      <Box rounded='md' className='card'>
        <Avatar
          className='avatar'
          name='Mohammed Farid'
          src='https://i.imgur.com/4clqUdj.jpg'
        />
        <Button variantColor={btnColor} className='btn'>
          Home
        </Button>
        <Button variantColor={btnColor} className='btn'>
          Profile
        </Button>
      </Box>

      <div className='options-btn'>
        {isPC && (
          <Button
            variant='solid'
            variantColor={btnColor}
            className='theme-btn'
            onClick={toggleColorMode}>
            <Icon name={isDarkMode ? 'sun' : 'moon'} />
          </Button>
        )}
        <Button variant='outline' variantColor='red' className='logout-btn'>
          Logout
        </Button>
      </div>
    </Box>
  )
}

export default Profile
