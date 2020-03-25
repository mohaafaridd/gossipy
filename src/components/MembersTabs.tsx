import React from 'react'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/core'
import MembersTab from './MembersTab'

const MembersTabs = () => {
  return (
    <Tabs>
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
          <MembersTab role='FOUNDER' />
        </TabPanel>
        <TabPanel>
          <MembersTab state='PENDING' />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default MembersTabs
