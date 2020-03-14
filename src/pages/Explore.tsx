import React, { useState } from 'react'
import {
  Stack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon
} from '@chakra-ui/core'
import Topics from '../components/Topics'
import { SortType, DateRange } from '../interfaces/Topic'

const Explore = () => {
  const [sortType, setSortType] = useState<SortType>('HOT')
  const [dateRange, setDateRange] = useState<DateRange>('TODAY')

  return (
    <div id='explore'>
      <Stack isInline>
        <Menu>
          <MenuButton as={Button}>{sortType}</MenuButton>
          <MenuList>
            <MenuItem onClick={() => setSortType('HOT')}>Hot</MenuItem>
            <MenuItem onClick={() => setSortType('TOP')}>Top</MenuItem>
            <MenuItem onClick={() => setSortType('NEW')}>New</MenuItem>
          </MenuList>
        </Menu>

        <Menu>
          <MenuButton as={Button}>{dateRange}</MenuButton>
          <MenuList>
            <MenuItem onClick={() => setDateRange('TODAY')}>Today</MenuItem>
            <MenuItem onClick={() => setDateRange('THREE_DAYS')}>
              3 Days
            </MenuItem>
            <MenuItem onClick={() => setDateRange('WEEK')}>7 Days</MenuItem>
            <MenuItem onClick={() => setDateRange('MONTH')}>Month</MenuItem>
            <MenuItem onClick={() => setDateRange('THREE_MONTH')}>
              3 Months
            </MenuItem>
            <MenuItem onClick={() => setDateRange('SIX_MONTH')}>
              6 Months
            </MenuItem>
            <MenuItem onClick={() => setDateRange('YEAR')}>Year</MenuItem>
            <MenuItem onClick={() => setDateRange('EVER')}>
              All The Time
            </MenuItem>
          </MenuList>
        </Menu>
      </Stack>

      <Topics sort={sortType} dateRange={dateRange} />
    </div>
  )
}

export default Explore
