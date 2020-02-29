import React, { useContext, useEffect, Fragment } from 'react'
import { Button, Avatar, Box, useColorMode, Icon } from '@chakra-ui/core'
import { TiHome, TiUser, TiCog, TiBell, TiWorld, TiGlobe } from 'react-icons/ti'
import { FiLogOut } from 'react-icons/fi'
import useWindowDimensions from '../hooks/useWindowDimensions '
import AuthContext from '../context/auth/authContext'

const Nav = () => {
  const authContext = useContext(AuthContext)
  const { colorMode, toggleColorMode } = useColorMode()
  const { width } = useWindowDimensions()

  const isDarkMode = colorMode === 'dark'
  const bg = isDarkMode ? 'gray.900' : 'gray.300'
  const btnColor = 'blue'
  const isPC = width > 1366

  const { authenticated, user } = authContext

  return (
    <Box bg={bg} id='nav'>
      <Button leftIcon={TiHome}>Home</Button>
      <Button leftIcon={TiGlobe}>Explore</Button>
      <Button leftIcon={TiUser}>Profile</Button>
      <Button leftIcon={TiBell}>Notifications</Button>
      <Button leftIcon={TiCog}>Settings</Button>
      <Button leftIcon={FiLogOut}>Logout</Button>
      <Button onClick={toggleColorMode} leftIcon={isDarkMode ? 'sun' : 'moon'}>
        Theme
      </Button>
    </Box>
  )
}

export default Nav
