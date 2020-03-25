import React from 'react'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/core'
import { useQueryParam } from 'use-query-params'
import MembersTab from './MembersTab'
import { Role, MembershipState } from '../interfaces/Membership'

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
      <TabList>
        <Tab>All</Tab>
        <Tab>Admins</Tab>
        <Tab>Pending</Tab>
        <Tab>Banned</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <MembersTab state='ACTIVE' />
        </TabPanel>
        <TabPanel>
          <MembersTab roles={['FOUNDER', 'ADMIN', 'MODERATOR']} />
        </TabPanel>
        <TabPanel>
          <MembersTab state='PENDING' />
        </TabPanel>
        <TabPanel>
          <MembersTab state='BANNED' />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default MembersTabs
