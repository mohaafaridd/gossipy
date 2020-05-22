import React, { useContext, useRef, useState, FC, useEffect } from 'react'
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
  Stack,
  Collapse,
  Avatar
} from '@chakra-ui/core'

import {
  TiHome,
  TiUser,
  TiCog,
  TiBell,
  TiGlobe,
  TiThMenu,
  TiGroup,
  TiContacts,
  TiEdit
} from 'react-icons/ti'
import { FiLogOut } from 'react-icons/fi'

import AuthContext from '../../context/auth/authContext'
import LinkButton from '../LinkButton'
import { useCookies } from 'react-cookie'
// import useKarma from '../hooks/useKarma'

const Nav: FC = () => {
  const authContext = useContext(AuthContext)
  const [cookies] = useCookies(['token', 'user'])

  const { colorMode, toggleColorMode } = useColorMode()
  const isDarkMode = colorMode === 'dark'

  const btnRef = useRef()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [showStations, setshowStations] = useState(false)
  const bg = isDarkMode ? 'gray.700' : 'gray.100'

  const { authenticated, user } = authContext
  const [hasImage, setHasImage] = useState(user && user.image.length > 0)

  useEffect(() => {
    setHasImage(user && user.image.length > 0)
  }, [cookies])

  return (
    <Box bg={bg} id='nav'>
      <div id='nav-header'>
        <IconButton
          aria-label='Open navbar'
          icon={TiThMenu}
          ref={btnRef}
          variantColor='blue'
          onClick={onOpen}
        />

        <p>Gossipy</p>
      </div>

      <Drawer isOpen={isOpen} placement='left' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Gossipy</DrawerHeader>

          <DrawerBody className='nav-drawer-body'>
            {authenticated ? (
              <Stack spacing='2'>
                <Avatar
                  alignSelf='center'
                  size='2xl'
                  src={
                    hasImage
                      ? `${process.env.REACT_APP_S3}/${user?.image}`
                      : undefined
                  }
                />

                <LinkButton
                  variantColor='blue'
                  to={`/u/${user?.identifier}`}
                  leftIcon={TiUser}>
                  {user?.name}
                </LinkButton>

                <LinkButton to='/' leftIcon={TiHome}>
                  Home
                </LinkButton>
                <LinkButton to='/explore' leftIcon={TiGlobe}>
                  Explore
                </LinkButton>
                <LinkButton to='/submit' leftIcon={TiEdit}>
                  Gossip
                </LinkButton>
                <Button
                  onClick={() => setshowStations(!showStations)}
                  leftIcon={TiGroup}>
                  Stations
                </Button>
                <Collapse isOpen={showStations}>
                  <Stack spacing='2'>
                    <LinkButton
                      to='/s/create'
                      variantColor='blue'
                      variant='outline'
                      leftIcon='add'>
                      Create
                    </LinkButton>
                    <LinkButton
                      to='/s'
                      variantColor='blue'
                      variant='outline'
                      leftIcon={TiContacts}>
                      Subscriptions
                    </LinkButton>
                  </Stack>
                </Collapse>
                <LinkButton to='/notifications' leftIcon={TiBell}>
                  Notifications
                </LinkButton>
                <LinkButton
                  to={`/u/${user?.identifier}/settings`}
                  leftIcon={TiCog}>
                  Settings
                </LinkButton>
              </Stack>
            ) : (
              <Stack spacing='2'>
                <LinkButton to='/sign-up'>Sign up</LinkButton>
                <LinkButton to='/sign-in'>Sign in</LinkButton>
              </Stack>
            )}
          </DrawerBody>

          <DrawerFooter>
            <Stack isInline spacing='2'>
              <Button
                variant='outline'
                onClick={toggleColorMode}
                leftIcon={isDarkMode ? 'sun' : 'moon'}>
                Theme
              </Button>
              {authenticated && (
                <Button
                  variant='outline'
                  variantColor='red'
                  leftIcon={FiLogOut}
                  onClick={() => authContext.removeUser()}>
                  Logout
                </Button>
              )}
            </Stack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}

export default Nav
