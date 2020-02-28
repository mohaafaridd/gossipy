import React, { useContext, useEffect, Fragment } from 'react'
import { Button, Avatar, Box, useColorMode, Icon } from '@chakra-ui/core'
import useWindowDimensions from '../../hooks/useWindowDimensions '
import AuthContext from '../../context/auth/authContext'

const Profile = () => {
  const authContext = useContext(AuthContext)
  const { colorMode, toggleColorMode } = useColorMode()
  const { width } = useWindowDimensions()

  const isDarkMode = colorMode === 'dark'
  const bg = isDarkMode ? 'gray.900' : 'gray.300'
  const btnColor = 'blue'
  const isPC = width > 1366

  const { authenticated, user } = authContext

  // const authenticated = true
  // const user = {
  //   id: 'xyz',
  //   identifier: 'Cats',
  //   image: 'https://i.imgur.com/4clqUdj.jpg'
  // }

  return (
    <Box bg={bg} id='home-profile'>
      <Box borderWidth='1px' rounded='md' className='card'>
        <Avatar
          className='avatar'
          name={authenticated ? user?.identifier : undefined}
          src='https://i.imgur.com/4clqUdj.jpg'
        />
        {authenticated ? (
          <Fragment>
            <Button variantColor={btnColor} className='btn'>
              Home
            </Button>
            <Button variantColor={btnColor} className='btn'>
              Profile
            </Button>
          </Fragment>
        ) : (
          <Fragment>
            <Button variantColor={btnColor} className='btn'>
              Sign up
            </Button>
            <Button variantColor={btnColor} className='btn'>
              Sign in
            </Button>
          </Fragment>
        )}
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

        {authenticated && (
          <Button variant='outline' variantColor='red' className='logout-btn'>
            Logout
          </Button>
        )}
      </div>
    </Box>
  )
}

export default Profile
