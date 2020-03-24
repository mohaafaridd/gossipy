import React from 'react'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/core'
import ManageStationMembers from './ManageStationMembers'

const MembersTab = () => {
  return (
    <Tabs>
      <TabList>
        <Tab>All</Tab>
        <Tab>Admins</Tab>
        <Tab>Pending</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <ManageStationMembers state='ACTIVE' />
        </TabPanel>
        <TabPanel>
          <ManageStationMembers role='FOUNDER' />
        </TabPanel>
        <TabPanel>
          <ManageStationMembers state='PENDING' />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default MembersTab
