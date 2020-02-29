import React, { useContext, useRef } from 'react'
import {
  Button,
  Box,
  useColorMode,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  IconButton,
  Stack
} from '@chakra-ui/core'

import {
  TiHome,
  TiUser,
  TiCog,
  TiBell,
  TiGlobe,
  TiThMenu
} from 'react-icons/ti'
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
  const isPC = width > 1366

  const { authenticated, user } = authContext

  return (
    <Box bg={bg} id='nav'>
      <IconButton
        aria-label='Open navbar'
        icon={TiThMenu}
        ref={btnRef}
        variantColor='blue'
        onClick={onOpen}
      />

      <Drawer isOpen={isOpen} placement='left' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            {authenticated ? `Welcome ${user?.name}` : 'Welcome Stranger'}
          </DrawerHeader>

          <DrawerBody className='nav-drawer-body'>
            {authenticated ? (
              <Stack spacing='2'>
                <Button leftIcon={TiHome}>Home</Button>
                <Button leftIcon={TiGlobe}>Explore</Button>
                <Button leftIcon={TiUser}>Profile</Button>
                <Button leftIcon={TiBell}>Notifications</Button>
                <Button leftIcon={TiCog}>Settings</Button>
              </Stack>
            ) : (
              <Stack spacing='2'>
                <Button>Sign up</Button>
                <Button>Sign in</Button>
              </Stack>
            )}
          </DrawerBody>

          <DrawerFooter>
            <Stack isInline={isPC} spacing='2'>
              <Button
                variant='outline'
                onClick={toggleColorMode}
                leftIcon={isDarkMode ? 'sun' : 'moon'}>
                Theme
              </Button>
              <Button variant='outline' variantColor='red' leftIcon={FiLogOut}>
                Logout
              </Button>
            </Stack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}

export default Nav
