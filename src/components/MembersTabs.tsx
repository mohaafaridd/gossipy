import React from 'react'
import { Tabs, TabList, Tab, TabPanels, TabPanel, Box } from '@chakra-ui/core'
import { useQueryParam } from 'use-query-params'
import MembersTab from './MembersTab'
import { Role, MembershipState } from '../interfaces/Membership'
import { TiGroup, TiCancel } from 'react-icons/ti'
import { GoShield } from 'react-icons/go'
import { FaHourglass } from 'react-icons/fa'

const MembersTabs = () => {
  const [queryRole, setQueryRole] = useQueryParam<Role | Role[] | undefined>(
    'role'
  )
  const [queryState, setQueryState] = useQueryParam<
    MembershipState | MembershipState[] | undefined
  >('state')

  if (!queryState && !queryRole) setQueryState('ACTIVE')

  return (
    <Tabs
      variant='soft-rounded'
      className='tabs'
      onChange={index => {
        switch (index) {
          case 0:
            setQueryRole(undefined)
            setQueryState('ACTIVE')
            break

          case 1:
            setQueryRole(['ADMIN', 'FOUNDER', 'MODERATOR'])
            setQueryState(undefined)
            break

          case 2:
            setQueryRole(undefined)
            setQueryState('PENDING')
            break

          case 3:
            setQueryRole(undefined)
            setQueryState('BANNED')
            break

          default:
            break
        }
      }}
      defaultIndex={
        queryState === 'ACTIVE'
          ? 0
          : queryRole === ['ADMIN', 'FOUNDER', 'MODERATOR']
          ? 1
          : queryState === 'PENDING'
          ? 2
          : queryState === 'BANNED'
          ? 3
          : 0
      }>
      <TabList className='p-2 members-tabs'>
        <Tab className='tab'>
          <Box as={TiGroup} className='mr-2' />
          All
        </Tab>
        <Tab className='tab'>
          <Box as={GoShield} className='mr-2' />
          Admins
        </Tab>
        <Tab className='tab'>
          <Box as={FaHourglass} className='mr-2' />
          Pending
        </Tab>
        <Tab className='tab'>
          <Box as={TiCancel} className='mr-2' />
          Banned
        </Tab>
      </TabList>
      <TabPanels className='tab-panels'>
        <TabPanel className='tab-panel'>
          <MembersTab state='ACTIVE' />
        </TabPanel>
        <TabPanel className='tab-panel'>
          <MembersTab roles={['FOUNDER', 'ADMIN', 'MODERATOR']} />
        </TabPanel>
        <TabPanel className='tab-panel'>
          <MembersTab state='PENDING' />
        </TabPanel>
        <TabPanel className='tab-panel'>
          <MembersTab state='BANNED' />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default MembersTabs
