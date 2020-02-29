import React, { useContext, useEffect, Fragment, useRef } from 'react'
import {
  Button,
  Avatar,
  Box,
  useColorMode,
  Icon,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  IconButton
} from '@chakra-ui/core'

import { TiHome, TiUser, TiCog, TiBell, TiWorld, TiGlobe } from 'react-icons/ti'
import { FiLogOut } from 'react-icons/fi'
import useWindowDimensions from '../hooks/useWindowDimensions '
import AuthContext from '../context/auth/authContext'

const Nav = () => {
  const authContext = useContext(AuthContext)
  const { colorMode, toggleColorMode } = useColorMode()
  const { width } = useWindowDimensions()
  const btnRef = useRef()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const isDarkMode = colorMode === 'dark'
  const bg = isDarkMode ? 'gray.900' : 'gray.300'
  const btnColor = 'blue'
  const isPC = width > 1366

  const { authenticated, user } = authContext

  return (
    <Box bg={bg} id='nav'>
      <IconButton
        aria-label='Open navbar'
        icon={TiUser}
        ref={btnRef}
        variantColor='teal'
        onClick={onOpen}></IconButton>
      <Drawer isOpen={isOpen} placement='left' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            {authenticated ? 'Welcome User' : 'Welcome Stranger'}
          </DrawerHeader>

          <DrawerBody>
            <Button leftIcon={TiHome}>Home</Button>
            <Button leftIcon={TiGlobe}>Explore</Button>
            <Button leftIcon={TiUser}>Profile</Button>
            <Button leftIcon={TiBell}>Notifications</Button>
            <Button leftIcon={TiCog}>Settings</Button>
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant='outline'
              onClick={toggleColorMode}
              leftIcon={isDarkMode ? 'sun' : 'moon'}>
              Theme
            </Button>
            <Button variant='outline' color='red' leftIcon={FiLogOut}>
              Logout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}

export default Nav
