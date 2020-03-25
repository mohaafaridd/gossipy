import React from 'react'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/core'
import { useQueryParam } from 'use-query-params'
import MembersTab from './MembersTab'
import { Role, MembershipState } from '../interfaces/Membership'

const MembersTabs = () => {
  const [queryRole, setQueryRole] = useQueryParam<Role | undefined>('role')
  const [queryState, setQueryState] = useQueryParam<
    MembershipState | undefined
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
            setQueryRole('ADMIN')
            setQueryState(undefined)
            break

          case 2:
            setQueryRole(undefined)
            setQueryState('PENDING')
            break

          default:
            break
        }
      }}
      defaultIndex={
        queryState === 'ACTIVE'
          ? 0
          : queryRole === 'ADMIN'
          ? 1
          : queryState === 'PENDING'
          ? 2
          : 0
      }>
      <TabList>
        <Tab>All</Tab>
        <Tab>Admins</Tab>
        <Tab>Pending</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <MembersTab state='ACTIVE' />
        </TabPanel>
        <TabPanel>
          <MembersTab role='ADMIN' />
        </TabPanel>
        <TabPanel>
          <MembersTab state='PENDING' />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default MembersTabs
